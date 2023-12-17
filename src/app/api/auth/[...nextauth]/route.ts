import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { connectDB } from '@/config/database';

import Users from '@/models/users';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session }: { session: any }) {
            const sessionUser = await Users.findOne({
                email_address: session.user.email,
            });

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn(data) {
            try {
                await connectDB();

                const user = await Users.findOne({
                    email_address: data.profile?.email,
                });

                if (!user) {
                    await Users.create({
                        email_address: data.profile?.email,
                        username: data.profile?.name
                            ?.replace(' ', '')
                            .toLowerCase(),
                    });
                }

                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };

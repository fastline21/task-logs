import { Session } from 'next-auth';
import './globals.css';

import Provider from '@/utils/provider';

import Header from '@/components/Header';

export const metadata = {
	title: `Home - ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
};

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session;
}) {
	return (
		<html lang='en'>
			<body>
				<Provider session={session}>
					<Header />
					<main>{children}</main>
				</Provider>
			</body>
		</html>
	);
}

export const metadata = {
	title: `Services - ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}

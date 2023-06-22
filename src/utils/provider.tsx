'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
interface ProviderInterface {
	children: React.ReactNode;
	session: Session;
}

const Provider = ({ children, session }: ProviderInterface) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<CacheProvider>
					<ChakraProvider>{children}</ChakraProvider>
				</CacheProvider>
			</SessionProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Provider;

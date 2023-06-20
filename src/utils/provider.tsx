'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

interface ProviderInterface {
	children: React.ReactNode;
}

const Provider = ({ children }: ProviderInterface) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<CacheProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</CacheProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Provider;

'use client';

import { Box, Button, Container } from '@chakra-ui/react';
import NextLink from 'next/link';

const DashboardPage = () => {
	return (
		<Container maxW='container.md' my='5'>
			<Box>
				<Button as={NextLink} href='/dashboard/tasks'>
					Tasks
				</Button>
			</Box>
		</Container>
	);
};

export default DashboardPage;

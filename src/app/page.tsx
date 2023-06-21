'use client';

import { Box, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

const HomePage = () => {
	return (
		<Box>
			<Text>Home Page</Text>
			<Button as={NextLink} href='/tasks'>
				Tasks
			</Button>
		</Box>
	);
};

export default HomePage;

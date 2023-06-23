'use client';

import { Box, Button, Container, Wrap, WrapItem } from '@chakra-ui/react';
import NextLink from 'next/link';

const DashboardPage = () => {
	return (
		<Container maxW='container.md' my='5'>
			<Wrap spacing='10px'>
				<WrapItem>
					<Box>
						<Button as={NextLink} href='/dashboard/tasks'>
							Tasks
						</Button>
					</Box>
				</WrapItem>
				<WrapItem>
					<Box>
						<Button as={NextLink} href='/dashboard/settings'>
							Settings
						</Button>
					</Box>
				</WrapItem>
			</Wrap>
		</Container>
	);
};

export default DashboardPage;

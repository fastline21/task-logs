'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import NextLink from 'next/link';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	Text,
	Flex,
	Box,
	Button,
	Spacer,
	HStack,
} from '@chakra-ui/react';

const TasksPage = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ['tasksData'],
		queryFn: async () => {
			const res = await axios({
				method: 'get',
				url: '/api/tasks',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			return res.data;
		},
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>An error has occurred: ${JSON.stringify(error)}</p>;
	}
	return (
		<div>
			<h1>Tasks Page</h1>
			<Button color='teal.500' href='/tasks/create' as={NextLink}>
				Create New Task
			</Button>
			{data.data.map((datum: any, key: any) => (
				<Card key={key}>
					<CardBody>
						<Heading size='lg'>
							{format(new Date(datum.task_date_start), 'MMMM dd, yyyy')}
						</Heading>
						<Box>
							<Text>
								{format(new Date(datum.task_date_start), 'HH:mm b')} -{' '}
								{format(new Date(datum.task_date_end), 'HH:mm b')}
							</Text>
						</Box>
						<Box>
							<Text>{datum.description}</Text>
						</Box>
						<Box>
							<HStack spacing='12px'>
								<Box p='2' bg='teal.50' color='teal.400' borderRadius='xl'>
									<Text fontWeight='bold'>{datum.source.name}</Text>
								</Box>

								<Box p='2' bg='blue.50' color='blue.400' borderRadius='xl'>
									<Text fontWeight='bold'>{datum.service.name}</Text>
								</Box>
							</HStack>
						</Box>
					</CardBody>
				</Card>
			))}
		</div>
	);
};

export default TasksPage;

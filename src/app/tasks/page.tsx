'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import NextLink from 'next/link';
import {
	Card,
	CardBody,
	Heading,
	Text,
	Box,
	Button,
	HStack,
} from '@chakra-ui/react';

import { getAllTasksBySearchDate } from '@/controllers/tasks.controller';

import { getDateFormat } from '@/utils/date-helper';

const TasksPage = () => {
	const TaskQuery = useQuery({
		queryKey: ['TaskData'],
		queryFn: async () =>
			getAllTasksBySearchDate({
				payload: {
					task_date: getDateFormat({
						date: new Date(),
					}),
				},
			}),
	});

	if (TaskQuery.isLoading) {
		return <p>Loading...</p>;
	}

	if (TaskQuery.error) {
		return <p>An error has occurred: {JSON.stringify(TaskQuery.error)}</p>;
	}
	return (
		<div>
			<h1>Tasks Page</h1>
			<Button color='teal.500' href='/tasks/create' as={NextLink}>
				Create New Task
			</Button>
			{TaskQuery.data.map((datum: any, key: any) => (
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

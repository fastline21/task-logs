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
	FormControl,
	FormLabel,
	Input,
	Container,
	Wrap,
	WrapItem,
	Flex,
	Spacer,
} from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { getAllTasksBySearchDate } from '@/controllers/tasks.controller';

import { getDateFormat } from '@/utils/date-helper';

const TasksPage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [currentDate, setCurrentDate] = useState(
		getDateFormat({
			date: new Date(searchParams.get('date') || new Date()),
		})
	);

	const TaskQuery = useQuery({
		queryKey: ['TaskData', currentDate],
		queryFn: async () =>
			getAllTasksBySearchDate({
				payload: {
					task_date: currentDate,
				},
			}),
	});

	if (TaskQuery.isLoading) {
		return <p>Loading...</p>;
	}

	if (TaskQuery.error) {
		return <p>An error has occurred: {JSON.stringify(TaskQuery.error)}</p>;
	}

	const handleCurrentDateChange = (event: any) => {
		const { value } = event.target;
		setCurrentDate(value);

		if (value !== getDateFormat({ date: new Date() })) {
			router.push(`/tasks/?date=${value}`);
		} else {
			router.push('/tasks');
		}
	};

	return (
		<Container maxW='container.md'>
			<Text fontSize='5xl'>Tasks Page</Text>
			<Box my='3'>
				<FormControl>
					<FormLabel>Task Date</FormLabel>
					<Input
						type='date'
						value={currentDate}
						onChange={handleCurrentDateChange}
					/>
				</FormControl>
			</Box>
			<Box my='3'>
				<Flex minWidth='max-content' alignItems='center' gap='2'>
					<Box>
						<Button color='teal.500' href='/tasks/create' as={NextLink}>
							Create New Task
						</Button>
					</Box>
					<Spacer />
					<Box>
						<Button as={NextLink} href='/'>
							Back to Home
						</Button>
					</Box>
				</Flex>
			</Box>

			<Box>
				<Wrap spacing='10px'>
					{TaskQuery.data.map((datum: any, key: any) => (
						<WrapItem key={key}>
							<Card width='238px'>
								<CardBody>
									<Heading size='md'>
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
											<Box
												p='2'
												bg='teal.50'
												color='teal.400'
												borderRadius='xl'
											>
												<Text fontWeight='bold'>{datum.source.name}</Text>
											</Box>

											<Box
												p='2'
												bg='blue.50'
												color='blue.400'
												borderRadius='xl'
											>
												<Text fontWeight='bold'>{datum.service.name}</Text>
											</Box>
										</HStack>
									</Box>
								</CardBody>
							</Card>
						</WrapItem>
					))}
				</Wrap>
			</Box>
		</Container>
	);
};

export default TasksPage;

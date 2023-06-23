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
import ProgressBar from '@/components/Loading/ProgressBar';
import ProgressText from '@/components/Loading/ProgressText';

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

	if (TaskQuery.error) {
		return <p>An error has occurred: {JSON.stringify(TaskQuery.error)}</p>;
	}

	const handleCurrentDateChange = (event: any) => {
		const { value } = event.target;
		setCurrentDate(value);

		if (value !== getDateFormat({ date: new Date() })) {
			router.push(`/dashboard/tasks/?date=${value}`);
		} else {
			router.push('/dashboard/tasks');
		}
	};

	return (
		<>
			<ProgressBar isLoading={TaskQuery.isLoading} />
			<Container maxW='container.md'>
				<Box>
					<Text fontSize='5xl'>Tasks Page</Text>
				</Box>
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
					<Button color='teal.500' href='/dashboard/tasks/create' as={NextLink}>
						Create New Task
					</Button>
				</Box>
				<Box>
					{TaskQuery.isLoading ? (
						<ProgressText />
					) : (
						<Wrap spacing='10px'>
							{TaskQuery.data?.map((datum: any, key: any) => (
								<WrapItem key={key}>
									<Card width='238px'>
										<CardBody>
											<Heading size='md'>
												{format(
													new Date(datum.task_date_start),
													'MMMM dd, yyyy'
												)}
											</Heading>
											<Box>
												<Text>
													{format(new Date(datum.task_date_start), 'hh:mm b')} -{' '}
													{format(new Date(datum.task_date_end), 'hh:mm b')}
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
					)}
				</Box>
			</Container>
		</>
	);
};

export default TasksPage;

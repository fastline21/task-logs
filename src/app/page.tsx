'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';

const HomePage = () => {
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
			<h1>Home Page</h1>
			{data.data.map((datum: any, key: any) => (
				<li key={key}>
					<p>
						Date: {format(new Date(datum.task_date_start), 'MMMM dd, yyyy')}
					</p>
					<p>Start: {format(new Date(datum.task_date_start), 'HH:mm b')}</p>
					<p>End: {format(new Date(datum.task_date_end), 'HH:mm b')}</p>
					<p>Description: {datum.description}</p>
					<p>Source: {datum.source.name}</p>
					<p>Service: {datum.service.name}</p>
				</li>
			))}
		</div>
	);
};

export default HomePage;

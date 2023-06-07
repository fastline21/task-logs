'use client';

import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Select,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const CreateTaskPage = () => {
	return (
		<div>
			<h1>Create Task Page</h1>
			<form>
				<FormControl>
					<FormLabel>Task Date</FormLabel>
					<Input type='text' />
				</FormControl>
				<FormControl>
					<FormLabel>Task Start Time</FormLabel>
					<Input type='text' />
				</FormControl>
				<FormControl>
					<FormLabel>Task End Time</FormLabel>
					<Input type='text' />
				</FormControl>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Input type='text' />
				</FormControl>
				<FormControl>
					<FormLabel>Source</FormLabel>
					<Select placeholder='Select source'>
						<option>ERNI PH</option>
						<option>Singlife</option>
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Service</FormLabel>
					<Select placeholder='Select service'>
						<option>Work</option>
						<option>Non-Work</option>
					</Select>
				</FormControl>
			</form>
			<Button as={NextLink} href='/tasks'>
				Back
			</Button>
		</div>
	);
};

export default CreateTaskPage;

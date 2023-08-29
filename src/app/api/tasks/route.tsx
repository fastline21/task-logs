import { NextResponse, NextRequest } from 'next/server';

import { connectDB } from '@/config/database';

import Tasks from '@/models/tasks';

import { getDateFormat } from '@/utils/date-helper';

export const GET = async () => {
	await connectDB();

	try {
		const tasks = await Tasks.find({})
			.populate('source', 'name')
			.populate('service', 'name');

		return NextResponse.json(
			{
				data: tasks,
				message: 'Success Tasks data found',
				statusCode: 200,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		return NextResponse.json(
			{ data: {}, message: error.message, statusCode: error.status },
			{ status: error.status }
		);
	}
};

export const POST = async (req: NextRequest) => {
	const { task_date_start, task_date_end, description, source_id, service_id } =
		await req.json();

	try {
		await connectDB();

		// console.log('task_date_start:', task_date_start);
		// console.log(
		// 	getDateFormat({ date: task_date_start, formatDate: 'yyyy-MM-dd HH:mm' })
		// );
		// console.log(new Date(task_date_start));

		const newTask = new Tasks({
			task_date_start: new Date(task_date_start),
			task_date_end,
			description,
			source_id,
			service_id,
		});
		await newTask.save();

		return NextResponse.json({
			data: newTask,
			message: 'Success add new task',
			statusCode: 200,
		});
	} catch (error: any) {
		return NextResponse.json(
			{ data: {}, message: error.message, statusCode: 500 },
			{ status: 500 }
		);
	}
};

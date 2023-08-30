import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/config/database';

import Tasks from '@/models/tasks';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	try {
		const { id } = params;

		await connectDB();

		const task = await Tasks.findById(id)
			.populate('source', 'name')
			.populate('service', 'name');

		return NextResponse.json(
			{ data: task, message: 'Success Get Single Task', status: 200 },
			{ status: 200 }
		);
	} catch (error: any) {
		const {
			data = {},
			message = 'An unknown error has occured',
			status = 500,
		} = error;

		return NextResponse.json({ data, message, status }, { status });
	}
};

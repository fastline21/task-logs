import { NextResponse, NextRequest } from 'next/server';

import { connectDB } from '@/config/database';

import Services from '@/models/services';

export const GET = async () => {
	await connectDB();

	try {
		const services = await Services.find({});

		return NextResponse.json(
			{
				data: services,
				message: 'Success Services data found',
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
	const { name, description } = await req.json();

	try {
		await connectDB();

		const newService = new Services({
			name,
			description,
		});
		await newService.save();

		return NextResponse.json({
			data: newService,
			message: 'Success add new service',
			statusCode: 200,
		});
	} catch (error: any) {
		return NextResponse.json(
			{ data: {}, message: error.message, statusCode: 500 },
			{ status: 500 }
		);
	}
};

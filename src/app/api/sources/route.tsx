import { NextResponse, NextRequest } from 'next/server';

import { connectDB } from '@/config/database';

import Sources from '@/models/sources';

export const GET = async () => {
  await connectDB();

  try {
    const sources = await Sources.find({});

    return NextResponse.json(
      {
        data: sources,
        message: 'Success Sources data found',
        statusCode: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { data: {}, message: error.message, statusCode: error.status },
      { status: error.status },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const { name, description } = await req.json();

  try {
    await connectDB();

    const newSource = new Sources({
      name,
      description,
    });
    await newSource.save();

    return NextResponse.json({
      data: newSource,
      message: 'Success add new source',
      statusCode: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { data: {}, message: error.message, statusCode: 500 },
      { status: 500 },
    );
  }
};

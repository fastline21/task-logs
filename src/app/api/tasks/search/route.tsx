import { NextResponse, NextRequest } from 'next/server';

import { connectDB } from '@/config/database';

import Tasks from '@/models/tasks';

import { startTime, endTime } from '@/constants/task-date';

/**
 * POST /api/tasks/search
 *
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  const { task_date } = await req.json();

  try {
    await connectDB();

    const tasks = await Tasks.find({
      task_date_start: {
        $gte: `${task_date}${startTime}`,
        $lt: `${task_date}${endTime}`,
      },
    })
      .populate('source', 'name')
      .populate('service', 'name')
      .sort({ task_date_start: 1 });

    return NextResponse.json(
      {
        data: tasks,
        message: 'Success Tasks data found',
        statusCode: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { data: {}, message: error.message, statusCode: 500 },
      { status: 500 },
    );
  }
};

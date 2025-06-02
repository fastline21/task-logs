import axios from 'axios';

import { getDateTime } from '@/utils/date-helper';

interface AddTaskInterface {
  task_date: String;
  task_date_start: String;
  task_date_end: String;
  description: String;
  source_id: String;
  service_id: String;
}
export const addTask = async ({ payload }: { payload: AddTaskInterface }) => {
  const {
    task_date,
    task_date_start,
    task_date_end,
    description,
    source_id,
    service_id,
  } = payload;

  const body = {
    task_date_start: `${task_date} ${task_date_start}`,
    task_date_end: `${task_date} ${task_date_end}`,
    description,
    source_id,
    service_id,
  };

  return await axios({
    method: 'post',
    url: '/api/tasks',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
};

export const getAllTasks = async () => {
  const res = await axios({
    method: 'get',
    url: '/api/tasks',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data.data;
};

interface GetAllTasksBySearchDateInterface {
  payload: {
    task_date: String;
  };
}
export const getAllTasksBySearchDate = async ({
  payload,
}: GetAllTasksBySearchDateInterface) => {
  const { task_date } = payload;

  const res = await axios({
    method: 'post',
    url: '/api/tasks/search',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { task_date },
  });

  return res.data.data;
};

interface GetSingleTaskByIDInterface {
  payload: {
    id: String;
  };
}
export const getSingleTaskByID = async ({
  payload,
}: GetSingleTaskByIDInterface) => {
  const { id } = payload;

  const res = await axios({
    method: 'get',
    url: `/api/tasks/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data.data;
};

import axios from 'axios';

export const getAllServices = async () => {
  return await axios({
    method: 'get',
    url: '/api/services',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

interface AddServiceInterface {
  name: String;
  description: String;
}
export const addService = async ({
  payload,
}: {
  payload: AddServiceInterface;
}) => {
  const { name, description } = payload;

  const body = {
    name,
    description,
  };

  return await axios({
    method: 'post',
    url: '/api/services',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
};

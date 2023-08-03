import axios from 'axios';

export const getAllSources = async () => {
	return await axios({
		method: 'get',
		url: '/api/sources',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

interface AddSourceInterface {
	name: String;
	description: String;
}
export const addSource = async ({
	payload,
}: {
	payload: AddSourceInterface;
}) => {
	const { name, description } = payload;

	const body = {
		name,
		description,
	};

	return await axios({
		method: 'post',
		url: '/api/sources',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
	});
};

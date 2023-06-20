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

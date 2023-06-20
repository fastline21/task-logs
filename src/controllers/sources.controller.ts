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

/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';

const TrashCanData = async () => {
	const mapUrl = process.env.REACT_APP_API_URL;
	try {
		const response = await axios.get(`${mapUrl}/api/v1/trash-cans`);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export default TrashCanData;

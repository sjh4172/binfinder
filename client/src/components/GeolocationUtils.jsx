const getCurrentPosition = () => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					resolve({ latitude, longitude });
				},
				(error) => {
					reject(error);
				},
			);
		} else {
			reject(new Error('Geolocation is not supported by this browser.'));
		}
	});
};
export default getCurrentPosition;

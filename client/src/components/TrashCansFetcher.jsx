/* eslint-disable no-console */
import { useEffect, useCallback } from 'react';
import TrashCanData from '../api/mapAPI';

function TrashCansFetcher({
	mapUrl,
	getCurrentPosition,
	setTrashCans,
	setTrashMarkers,
	setIsLoading,
	setData,
}) {
	const fetchTrashCans = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await TrashCanData();
			const { latitude, longitude } = await getCurrentPosition();
			const filteredTrashCans = response.data.filter((trashCan) => {
				const lat = latitude; // 현재위치 경도
				const lng = longitude; // 현재위치 위도
				const distance =
					Math.sqrt(
						(lat - trashCan.Latitude) ** 2 + (lng - trashCan.Longitude) ** 2,
					) * 100000;
				return distance <= 10000; // 700m 반경 내의 쓰레기통만 필터링
			});
			setTrashCans(filteredTrashCans);
			setTrashMarkers([]);
			setIsLoading(false);
			setData(response.data);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}, [
		getCurrentPosition,
		mapUrl,
		setTrashCans,
		setTrashMarkers,
		setIsLoading,
		setData,
	]);

	useEffect(() => {
		fetchTrashCans();
	}, [fetchTrashCans]);

	return null;
}

export default TrashCansFetcher;

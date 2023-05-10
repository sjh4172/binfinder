import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import KAKAO_MAP_API_KEY from '../api/kakaoMap';
import Modal from './Modal';

// 맵사이즈
const MapStyle = styled.div`
	height: 100vh;
	align-items: center;
	justify-content: center;
	margin-top: 5em;
	margin-left: 18.7em;
	margin-right: auto;
	border-width: medium;
	.map {
		height: 100%;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;

function Map() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const loadKakaoMap = useCallback(() => {
		// 카카오맵 스크립트 읽어오기
		const script = document.createElement('script');
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}`;
		script.onload = () => {
			const { kakao } = window;
			kakao.maps.load(() => {
				const mapContainer = document.getElementById('map');
				// 위치 초기 값을 자신에 위치로 설정함
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const lat = position.coords.latitude;
						const lng = position.coords.longitude;
						const options = {
							center: new kakao.maps.LatLng(lat, lng),
							level: 3,
						};
						const map = new kakao.maps.Map(mapContainer, options);
						const markerPosition = new kakao.maps.LatLng(lat, lng);
						const blueMarkerImage = new kakao.maps.MarkerImage(
							`${process.env.PUBLIC_URL}/assets/myLocationIcon.png`,
							new kakao.maps.Size(30),
							{ offset: new kakao.maps.Point(12, 35) },
						);
						const marker = new kakao.maps.Marker({
							position: markerPosition,
							// 마커 디자인!
							image: blueMarkerImage,
						});
						marker.setMap(map);
					},
					(error) => {
						// 위치 정보를 가져오지 못할 경우 처리
						console.error(error);
						setIsModalOpen(true);
					},
				);
			});
		};
		document.head.appendChild(script);
	}, []);

	useEffect(() => {
		loadKakaoMap();
	}, [loadKakaoMap]);

	const handleModalConfirm = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<MapStyle>
				<div id="map" className="map" />
			</MapStyle>
			{isModalOpen && (
				<Modal
					message="현재 위치를 가져올 수 없습니다. 
					<br>GPS기능이 활성화되어 있는지 확인해 주세요.
					<br>GPS기능을 활성화 시킨 후 앱을 다시 다시해주세요."
					handleConfirm={handleModalConfirm}
					handleCancel={handleModalConfirm}
				/>
			)}
		</>
	);
}

export default Map;

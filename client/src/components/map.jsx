import axios from 'axios';
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
	const [trashCans, setTrashCans] = useState([]);

	// 쓰레기통 데이터를 가져오는 함수
	const fetchTrashCans = useCallback(async () => {
		try {
			const response = await axios.get('http://example.com/api/v1/trash-cans');
			setTrashCans(response.data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const loadKakaoMap = useCallback(() => {
		// 카카오맵 스크립트 읽어오기
		const script = document.createElement('script');
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}`;
		script.onload = () => {
			const { kakao } = window;
			kakao.maps.load(() => {
				const mapContainer = document.getElementById('map');
				// 위치 초기 값을 자신에 위치로 설정
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const lat = position.coords.latitude;
						const lng = position.coords.longitude;
						const options = {
							center: new kakao.maps.LatLng(lat, lng),
							level: 3,
						};
						// 지도 객체를 생성
						const map = new kakao.maps.Map(mapContainer, options);
						// 유저 마커
						const userMarkerImage = new kakao.maps.MarkerImage(
							`${process.env.PUBLIC_URL}/assets/myLocationIcon.png`,
							new kakao.maps.Size(30),
							{ offset: new kakao.maps.Point(12, 35) },
						);
						const markerPosition = new kakao.maps.LatLng(lat, lng);
						const marker = new kakao.maps.Marker({
							position: markerPosition,
							image: userMarkerImage,
						});
						marker.setMap(map);
						// 쓰레기통 마커
						trashCans.forEach((trashCan) => {
							const trashMarkerPosition = new kakao.maps.LatLng(
								trashCan.latitude,
								trashCan.longitude,
							);
							const trashCanMarkerImage =
								trashCan.canType === 'recycle'
									? new kakao.maps.MarkerImage(
											`${process.env.PUBLIC_URL}/assets/RecycleIcon.png`,
											new kakao.maps.Size(30),
											{ offset: new kakao.maps.Point(12, 35) },
									  )
									: new kakao.maps.MarkerImage(
											`${process.env.PUBLIC_URL}/assets/TrashCanIcon.png`,
											new kakao.maps.Size(30),
											{ offset: new kakao.maps.Point(12, 35) },
									  );
							const trashMarker = new kakao.maps.Marker({
								position: trashMarkerPosition,
								image: trashCanMarkerImage,
							});
							trashMarker.setMap(map);
						});
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
					message="GPS 기능이 꺼져 있으면 현재 위치를 가져올 수 없습니다. 
					<br>GPS 기능을 켜고 잠시 후에 다시 시도해주세요."
					handleConfirm={handleModalConfirm}
					handleCancel={handleModalConfirm}
				/>
			)}
		</>
	);
}

export default Map;

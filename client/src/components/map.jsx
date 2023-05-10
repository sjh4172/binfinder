import { useEffect } from 'react';
import styled from 'styled-components';
import KAKAO_MAP_API_KEY from '../api/kakaoMap';

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
	// 스크립트 파일 읽어오기
	const newScript = (src) => {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.addEventListener('load', () => {
				resolve();
			});
			script.addEventListener('error', (e) => {
				reject(e);
			});
			document.head.appendChild(script);
		});
	};

	useEffect(() => {
		// 카카오맵 스크립트 읽어오기
		const myScript = newScript(
			`https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}`,
		);

		// 스크립트 읽기 완료 후 카카오맵 설정
		myScript.then(() => {
			const { kakao } = window;
			kakao.maps.load(() => {
				const mapContainer = document.getElementById('map');
				const options = {
					center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), // 좌표설정
					level: 3,
				};
				const map = new kakao.maps.Map(mapContainer, options); // 맵생성
				// 마커설정
				const markerPosition = new kakao.maps.LatLng(
					37.56000302825312,
					126.97540593203321,
				);
				const marker = new kakao.maps.Marker({
					position: markerPosition,
				});
				marker.setMap(map);
			});
		});
	}, []);

	return (
		<MapStyle>
			<div id="map" className="map" />
		</MapStyle>
	);
}

export default Map;

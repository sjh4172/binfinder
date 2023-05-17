import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Buttons';
import KAKAO_MAP_API_KEY from '../api/kakaoMap';

function TrashCanModal({ trashCan, onClose }) {
	const [count, setCount] = useState(0);
	const [currentPosition, setCurrentPosition] = useState(null);
	const { kakao } = window;

	// 모달창 닫기
	const handleCloseModal = () => {
		onClose();
	};
	const handleIncrementCount = (event) => {
		event.preventDefault(); // 새로고침 방지
		setCount(count + 1);

		// POST 요청 보내기
		const data = {
			trashCanId: trashCan.id,
			voteType: 'DISLIKE',
		};
		axios
			.post('http://localhost:4001/vote', data)
			.then((response) => {
				console.log('POST 요청 성공:', response.data);
			})
			.catch((error) => {
				console.error('POST 요청 실패:', error);
			});
	};

	// 로드뷰
	const handleLoadRoadView = (event) => {
		event.preventDefault(); // 새로고침 방지
		// 카카오맵 로드뷰 페이지 URL 주소 설정
		const roadViewUrl = `https://map.kakao.com/link/roadview/${trashCan.Latitude},${trashCan.Longitude}`;
		// 새로운 창 열기
		window.open(roadViewUrl);
	};

	// 현재 위치 정보 가져오기
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCurrentPosition(position.coords);
			},
			(error) => {
				console.error(error);
			},
		);
	}, []);

	// 길찾기
	const handleShowDirections = (event) => {
		event.preventDefault();
		const startLatLng = new kakao.maps.LatLng(
			currentPosition.latitude,
			currentPosition.longitude,
		);
		const endLatLng = new kakao.maps.LatLng(
			trashCan.Latitude,
			trashCan.Longitude,
		);
		const directionsService = new kakao.maps.services.Directions(); // 변경된 부분
		const request = {
			origin: startLatLng,
			destination: endLatLng,
			travelMode: kakao.maps.services.TravelMode.TRANSIT, // 변경된 부분
		};
		directionsService.route(request, (result, status) => {
			if (status === kakao.maps.services.Status.OK) {
				// 변경된 부분
				const { path } = result.routes[0];
				const encodedPath = kakao.maps.util.encodePath(path);

				const directionUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
					trashCan.설치위치,
				)},${endLatLng.getLat()},${endLatLng.getLng()}?via=${encodedPath}`;

				window.open(directionUrl);
			} else {
				console.error('길찾기 요청 실패:', status);
			}
		});
	};

	return (
		<ModalContainer className="modal-container" onClick={handleCloseModal}>
			<Modal>
				<ModalHeader>
					<ModalTitle>{trashCan.설치위치}</ModalTitle>
					<DistanceText>100m</DistanceText>
				</ModalHeader>
				<BtnContent>
					<TrashModalButton onClick={handleLoadRoadView}>
						로드뷰
					</TrashModalButton>
					<TrashModalButton onClick={handleShowDirections}>
						길찾기
					</TrashModalButton>
					<TrashModalButton onClick={handleIncrementCount}>
						좋아요 : {count}
					</TrashModalButton>
					<TrashModalButton onClick={handleIncrementCount}>
						싫어요 : {count}
					</TrashModalButton>
				</BtnContent>
			</Modal>
		</ModalContainer>
	);
}
const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
`;

const Modal = styled.div`
	width: 450px;
	background-color: white;
	padding: 50px;
	border-radius: 10px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
	@media (max-width: 768px) {
		width: 250px;
		padding: 25px;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	font-size: 20px;
	@media (max-width: 768px) {
		width: 250px;
		font-size: 12px;
	}
`;

const ModalTitle = styled.h3`
	margin: 0;
	margin-left: 100px;
	flex-grow: 1;
`;
const DistanceText = styled.h3`
	margin-right: 80px;
`;
const BtnContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const TrashModalButton = styled(Button)`
	width: 85%;
	margin-bottom: 5px;
	height: 50px;
	@media (max-width: 768px) {
		width: 100px;
	}
`;

export default TrashCanModal;

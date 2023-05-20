/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Buttons';

function TrashCanModal({ trashCan }) {
	const [likeCount, setLikeCount] = useState(0);
	const [disLikeCount, setDisLikeCount] = useState(0);
	const [, setCurrentPosition] = useState(null);
	const [TrashCanModalOpen, setTrashCanModalOpen] = useState(true);
	const mapUrl = process.env.REACT_APP_API_URL;

	// 모달창 닫기
	const handleCloseTrashCanModal = () => {
		setTrashCanModalOpen(false);
	};
	// 좋아요
	const handleLikeCount = (event) => {
		event.preventDefault(); // 새로고침 방지
		setLikeCount(likeCount + 1);
		// POST 요청 보내기
		const data = {
			trashCanId: trashCan.id,
			voteType: 'LIKE',
		};
		axios
			.post(`${mapUrl}/vote`, data)
			.then((response) => {
				console.log('POST 요청 성공:', response.data);
			})
			.catch((error) => {
				console.error('POST 요청 실패:', error);
			});
	};
	// 안 좋아요
	const handleDisLikeCount = (event) => {
		event.preventDefault(); // 새로고침 방지
		setDisLikeCount(disLikeCount + 1);
		// POST 요청 보내기
		const data = {
			trashCanId: trashCan.id,
			voteType: 'DISLIKE',
		};
		axios
			.post(`${mapUrl}/vote`, data)
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
	// const handleShowDirections = () => {
	// 	// 출발지와 목적지 좌표
	// 	if (currentPosition && currentPosition.latitude) {
	// 		const startLatLng = new kakao.maps.LatLng(
	// 			currentPosition.latitude,
	// 			currentPosition.longitude,
	// 		);
	// 		const endLatLng = new kakao.maps.LatLng(
	// 			trashCan.Latitude,
	// 			trashCan.Longitude,
	// 		);
	// 		// 길찾기 서비스 생성
	// 		const directionsService = new kakao.maps.services.Directions();
	// 		// 길찾기 요청 설정
	// 		const request = {
	// 			origin: startLatLng,
	// 			destination: endLatLng,
	// 			transportationMode: kakao.maps.Directions.TRAVEL_MODE_TRANSIT,
	// 		};
	// 		// 길찾기 요청 보내기
	// 		directionsService.route(request, (result, status) => {
	// 			if (status === kakao.maps.services.Status.OK) {
	// 				// 성공적으로 경로를 받아왔을 때
	// 				const { path } = result.routes[0];
	// 				const encodedPath = kakao.maps.util.encodePath(path);
	// 				const directionUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
	// 					trashCan.설치위치,
	// 				)},${endLatLng.getLat()},${endLatLng.getLng()}?via=${encodedPath}`;
	// 				// 페이지 열림
	// 				window.open(directionUrl);
	// 			} else {
	// 				console.error('길찾기 요청 실패:', status);
	// 			}
	// 		});
	// 	}
	// };
	// 카카오맵 API
	// useEffect(() => {
	// 	const script = document.createElement('script');
	// 	script.async = true;
	// 	script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}`;
	// 	script.onload = () => {
	// 		kakao.maps.load(() => {
	// 			handleShowDirections();
	// 		});
	// 	};
	// 	document.head.appendChild(script);
	// 	return () => {
	// 		document.head.removeChild(script);
	// 	};
	// }, [currentPosition, trashCan]);
	if (!TrashCanModalOpen) {
		return null;
	}
	return (
		<ModalContainer onClick={handleCloseTrashCanModal}>
			<Modal>
				<ModalHeader>
					<ModalTitle>쓰레기통 위치 : {trashCan.설치위치}</ModalTitle>
				</ModalHeader>
				<BtnContent>
					<TrashModalButton onClick={handleLoadRoadView}>
						로드뷰
					</TrashModalButton>
					<TrashModalButton>길찾기</TrashModalButton>
					<LikeDislikeContainer>
						<LikeButton type="button" onClick={handleLikeCount}>
							좋아요 : {likeCount}
						</LikeButton>
						<DislikeButton onClick={handleDisLikeCount}>
							싫어요 : {disLikeCount}
						</DislikeButton>
					</LikeDislikeContainer>
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

const BtnContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const LikeDislikeContainer = styled.div`
	display: flex;
`;

const TrashModalButton = styled(Button)`
	width: 85%;
	margin-bottom: 5px;
	height: 50px;
	@media (max-width: 768px) {
		width: 100px;
	}
`;
const LikeButton = styled(TrashModalButton)`
	width: 142px;
	@media (max-width: 768px) {
		width: 50px;
	}
`;

const DislikeButton = styled(TrashModalButton)`
	width: 142px;
	margin-left: 10px;
	@media (max-width: 768px) {
		width: 50px;
		margin-left: 2px;
	}
`;

export default TrashCanModal;

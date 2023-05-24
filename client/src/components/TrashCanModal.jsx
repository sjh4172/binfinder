/* eslint-disable no-console */
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../styles/Buttons';

function TrashCanModal({ trashCan }) {
	const [TrashCanModalOpen, setTrashCanModalOpen] = useState(true);
	const mapUrl = process.env.REACT_APP_API_URL;
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const memberId = useSelector((state) => state.auth.memberId);

	const handleLoadDirections = () => {
		const startLat = 37.497942; // 출발지 위도
		const startLng = 127.027621; // 출발지 경도
		const destinationLat = trashCan.Latitude; // 목적지 위도
		const destinationLng = trashCan.Longitude; // 목적지 경도

		// 카카오 맵 API의 길찾기 페이지 열기
		window.open(
			`https://map.kakao.com/link/to/,${trashCan.설치위치},${destinationLat},${destinationLng},${startLat},${startLng}`,
			'_blank',
		);
	};
	// NOTE: 카카오API에선 출발지와 목적지를 각각 지정이 불가능하고 목적지만 지정이 가능합니다.

	// 모달창 닫기
	const handleCloseTrashCanModal = () => {
		setTrashCanModalOpen(false);
	};
	const handleVote = (event, voteType) => {
		event.preventDefault(); // 새로고침 방지
		// POST 요청 보내기
		if (isAuthenticated) {
			const data = {
				memberId,
				trashCanId: trashCan.id,
				voteType,
			};
			axios
				.post(`${mapUrl}/votes`, data)
				.then((response) => {
					console.log('POST 요청 성공:', response.data);
				})
				.catch((error) => {
					console.error('POST 요청 실패:', error);
				});
		}
	};

	// 좋아요
	const handleLikeCount = (event) => {
		handleVote(event, 'LIKE');
	};

	// 싫어요
	const handleDislikeCount = (event) => {
		handleVote(event, 'DISLIKE');
	};

	// 로드뷰
	const handleLoadRoadView = (event) => {
		event.preventDefault(); // 새로고침 방지
		// 카카오맵 로드뷰 페이지 URL 주소 설정
		const roadViewUrl = `https://map.kakao.com/link/roadview/${trashCan.Latitude},${trashCan.Longitude}`;
		// 새로운 창 열기
		window.open(roadViewUrl);
	};

	if (!TrashCanModalOpen) {
		return null;
	}
	return (
		<ModalContainer onClick={handleCloseTrashCanModal}>
			<Modal>
				<ModalHeader>
					<ModalTitle>{trashCan.Address}</ModalTitle>
				</ModalHeader>
				<BtnContent>
					<TrashModalButton onClick={handleLoadRoadView}>
						로드뷰
					</TrashModalButton>
					<TrashModalButton onClick={handleLoadDirections}>
						길찾기
					</TrashModalButton>
					<LikeDislikeContainer>
						<LikeButton type="button" onClick={handleLikeCount}>
							좋아요 : {trashCan.likeCount}
						</LikeButton>
						<DislikeButton type="button" onClick={handleDislikeCount}>
							싫어요 : {trashCan.dislikeCount}
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
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
	font-size: 20px;
	@media (max-width: 768px) {
		width: 180px;
		font-size: 12px;
	}
`;

const ModalTitle = styled.h3`
	margin: 0;
	margin-left: 10%;
	margin-right: auto;
	text-align: center;
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

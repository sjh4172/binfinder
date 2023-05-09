import styled from 'styled-components';
import { Button } from '../styles/Buttons';

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
	margin-left: 50px;
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

function TrashCanModal({ onClose }) {
	const handleBackgroundClick = (event) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<ModalContainer onClick={handleBackgroundClick}>
			<Modal>
				<ModalHeader>
					<ModalTitle>쓰레기통 위치명</ModalTitle>
					<DistanceText>100m</DistanceText>
				</ModalHeader>
				<BtnContent>
					<TrashModalButton>로드뷰</TrashModalButton>
					<TrashModalButton>길찾기</TrashModalButton>
					<TrashModalButton>여기없어요</TrashModalButton>
				</BtnContent>
			</Modal>
		</ModalContainer>
	);
}

export default TrashCanModal;

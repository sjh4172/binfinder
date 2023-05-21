/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import { Button, WarningButton } from '../styles/Buttons';
import MOBILE_MAX_WIDTH from '../mediaQuery';

export default function Modal({
	message,
	handleConfirm,
	handleCancel,
	cancel,
}) {
	const splitMessage = message.split('<br>');

	// const handleConfirm = () => {
	// 	setIsModalOpen(false);
	// 확인 버튼 클릭 시 실행할 로직 추가 (각 페이지에서 props 내려주기)
	// };

	// const handleCancel = () => {
	// 	setIsModalOpen(false);
	// };
	return (
		<ModalWrapper>
			<ModalContent>
				<ModalMessage>
					{splitMessage.map((msg, index) => (
						<p key={index}>{msg}</p>
					))}
				</ModalMessage>
				<ModalButtonWrapper>
					<WarningButton onClick={handleConfirm}>확인</WarningButton>
					{cancel && <Button onClick={handleCancel}>취소</Button>}
				</ModalButtonWrapper>
			</ModalContent>
		</ModalWrapper>
	);
}
const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.div`
	width: 600px;
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		width: 300px;
		height: 150px;
		border-radius: 5px;
	}
`;

const ModalMessage = styled.div`
	margin-top: 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 1.5;

	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		margin-top: 30px;
	}

	> p {
		font-size: var(--large);
		font-weight: 600;

		@media (max-width: ${MOBILE_MAX_WIDTH}px) {
			font-size: var(--base);
		}
	}
`;

const ModalButtonWrapper = styled.div`
	margin-top: 70px;
	display: flex;
	justify-content: center;
	gap: 75px;

	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		margin-top: 25px;
		gap: 20px;
	}
`;

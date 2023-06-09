/* eslint-disable no-undef */
/* eslint-disable no-console */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useModal from '../hooks/useModal';
import { URL_MAP, URL_MYPAGE } from '../routesURL';
import { loginFailure } from '../store/UserSlice';

function EditUserInfo() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [isOpenModal, openModal, closeModal] = useModal(false);
	const { memberId } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
				);
				const userData = response.data;
				setUsername(userData.username);
				setPassword(userData.password);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, [memberId]);

	const handleEditUser = async () => {
		if (!username) {
			setUsernameErrorMessage('닉네임을 입력해주세요.');
		}

		if (!password) {
			setPasswordErrorMessage('비밀번호를 입력해주세요.');
		}

		if (username === userData.username) {
			setUsernameErrorMessage('닉네임이 같습니다.');
		}

		try {
			const response = await axios.patch(
				`${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
				{
					username: username || undefined,
					password: password || undefined,
				},
			);
			if (response.status === 200) {
				navigate(URL_MYPAGE);
			} else {
				console.error('Failed to edit user');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleWithdrawUser = async () => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
			);

			if (response.status === 204) {
				// 회원탈퇴 성공한 경우
				dispatch(loginFailure());
				navigate(URL_MAP);
			} else {
				console.error('Failed to withdraw user');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancel = () => {
		navigate(URL_MYPAGE);
	};

	return (
		<EditMyPageContainer>
			<EditMyPageTitle>회원정보 수정</EditMyPageTitle>
			<EditMyPageForm>
				<Logo>
					<img
						src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${username}&scale=90&size=60&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc&backgroundColor=0a5b83,69d2e7,f1f4dc`}
						alt="Profile"
					/>
				</Logo>
				<InputTitleContainer>
					<InputContainer>
						<InputTitle>닉네임:</InputTitle>
						<Input
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="수정할 닉네임을 입력해주세요."
						/>
					</InputContainer>
					{usernameErrorMessage && (
						<ErrorMessage>{usernameErrorMessage}</ErrorMessage>
					)}
					<InputContainer>
						<InputTitle>비밀번호:</InputTitle>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="수정할 비밀번호를 입력해주세요."
						/>
					</InputContainer>
					{passwordErrorMessage && (
						<ErrorMessage>{passwordErrorMessage}</ErrorMessage>
					)}
				</InputTitleContainer>
				<ButtonForm>
					<WithdrawalButton onClick={openModal}>회원탈퇴</WithdrawalButton>
					<ButtonContainer>
						<Button onClick={handleEditUser}>수정</Button>
						<Button onClick={handleCancel}>취소</Button>
					</ButtonContainer>
				</ButtonForm>
			</EditMyPageForm>
			{isOpenModal && (
				<ModalOverlay>
					<Modal>
						<ModalContent>
							<ModalDesc>정말로 회원탈퇴를 하시겠습니까?</ModalDesc>
							<ModalButtonContainer>
								<ModalButton onClick={handleWithdrawUser}>확인</ModalButton>
								<ModalButton2 onClick={closeModal}>취소</ModalButton2>
							</ModalButtonContainer>
						</ModalContent>
					</Modal>
				</ModalOverlay>
			)}
		</EditMyPageContainer>
	);
}
const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 999;
`;
const Modal = styled.div`
	width: 600px;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 24px;
	background: white;
`;
const ModalContent = styled.div`
	width: 500px;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ModalDesc = styled.div`
	width: 500px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ModalButtonContainer = styled.div`
	width: 300px;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const ModalButton = styled.button`
	width: 100px;
	height: 50px;
	border: none;
	border-radius: 12px;
	background: #2049da;
	color: white;
	font-size: 17px;
`;
const ModalButton2 = styled.button`
	width: 100px;
	height: 50px;
	border: none;
	border-radius: 12px;
	background: #37a0db;
	color: white;
	font-size: 17px;
`;
/* 수정페이지 전체 컨테이너 */
const EditMyPageContainer = styled.div`
	max-width: 1024px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	font-weight: 700;
	margin-left: auto;
	margin-right: auto;
	margin-top: var(--header-hight);
	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 393px;
		height: 782px;
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 수정페이지 타이틀 */
const EditMyPageTitle = styled.div`
	width: 600px;
	height: 108px;
	font-size: 29px;
	font-family: 'Inter';
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		width: 300px;
		height: 40px;
		font-size: 23px;
		font-weight: 700;
	}
`;
/* 수정페이지 전체 폼 */
const EditMyPageForm = styled.div`
	width: 600px;
	height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid #d9d9d9;
	margin-bottom: 40px;
	@media (max-width: 768px) {
		width: 300px;
		height: 500px;
	}
`;
/* 수정페이지 프로필 이미지 */
const Logo = styled.div`
	margin-bottom: 40px;
	> img {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		@media (max-width: 768px) {
			> img {
				width: 80px;
				height: 80px;
			}
		}
	}
`;
/* 수정페이지 인풋 타이틀 컨테이너 */
const InputTitleContainer = styled.div`
	width: 400px;
	height: 90px;
	margin-bottom: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 102px;
		margin-left: 8px;
	}
`;
/* 수정페이지 인풋 컨테이너 */
const InputContainer = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;
`;
/* 수정페이지 인풋 타이틀 */
const InputTitle = styled.div`
	width: 70px;
	height: 45px;
	display: flex;
	align-items: center;
	margin-right: 30px;
	font-size: 16px;
	@media (max-width: 768px) {
		width: 60px;
		height: 34px;
		font-size: 12px;
		margin-right: 0px;
	}
`;
/* 수정페이지 인풋  */
const Input = styled.input`
	width: 220px;
	height: 45px;
	border: none;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	font-size: 15px;
	::placeholder {
		color: #d9d9d9;
	}
	@media (max-width: 768px) {
		width: 190px;
		height: 34px;
		font-size: 12px;
	}
`;
/* 수정페이지 버튼 폼  */
const ButtonForm = styled.div`
	width: 240px;
	height: 140px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 768px) {
		width: 220px;
		height: 140px;
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 수정페이지 회원탈퇴 버튼  */
const WithdrawalButton = styled.button`
	width: 240px;
	height: 50px;
	background-color: #37a0db;
	color: white;
	border-radius: 10px;
	border: none;
	font-size: 17px;
	font-weight: 700;
	&:hover {
		background-color: #d9d9d9;
	}
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 수정페이지 수정/취소 버튼 컨테이너 */
const ButtonContainer = styled.div`
	width: 240px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 수정페이지 수정/취소 버튼  */
const Button = styled.button`
	width: 100px;
	height: 50px;
	background-color: #37a0db;
	color: white;
	border-radius: 10px;
	border: none;
	font-size: 17px;
	font-weight: 700;
	&:hover {
		background-color: #d9d9d9;
	}
	@media (max-width: 768px) {
		width: 100px;
		height: 40px;
		font-size: 14px;
		font-weight: 700;
	}
`;
const ErrorMessage = styled.div`
	width: 150px;
	height: 10px;
	font-size: 14px;
	font-weight: 700;
	color: red;
	float: left;
	margin-left: 28px;
	margin-bottom: 12px;
	@media (max-width: 768px) {
		width: 160px;
		height: 10px;
		font-size: 10px;
	}
`;
export default EditUserInfo;

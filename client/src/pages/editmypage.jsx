import styled from 'styled-components';
import { useState } from 'react';

const EditMyPageContainer = styled.div`
	max-width: 1024px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	font-weight: 700;
	margin-left: auto;
	margin-right: auto;
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
		font-size: 26px;
		font-weight: 700;
	}
`;
const EditMyPageForm = styled.div`
	width: 600px;
	height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid #d9d9d9;
	@media (max-width: 768px) {
		width: 300px;
		height: 500px;
	}
`;
const Logo = styled.div`
	margin-bottom: 40px;
	> img {
		width: 120px;
		height: 120px;
		@media (max-width: 768px) {
			> img {
				width: 80px;
				height: 80px;
			}
		}
	}
`;

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
const InputContainer = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
`;
const InputTitle = styled.div`
	width: 70px;
	height: 45px;
	display: flex;
	align-items: center;
	margin-right: 30px;
	font-size: 17px;
`;
const Input = styled.div`
	width: 220px;
	height: 45px;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	font-size: 17px;
	color: #d9d9d9;
	@media (max-width: 768px) {
		width: 140px;
		height: 34px;
		font-size: 14px;
	}
`;
const ButtonForm = styled.div`
	width: 240px;
	height: 140px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
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
const ButtonContainer = styled.div`
	width: 240px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
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
		width: 220px;
		height: 40px;
		font-size: 14px;
		font-weight: 700;
	}
`;
function EditMyPage() {
	const [isListHover, setIsListHover] = useState(false);
	return (
		<EditMyPageContainer>
			<EditMyPageTitle>회원정보 수정</EditMyPageTitle>
			<EditMyPageForm>
				<Logo
					onMouseOver={() => setIsListHover(true)}
					onMouseOut={() => setIsListHover(false)}
				>
					<img
						src={
							isListHover
								? `${process.env.PUBLIC_URL}/assets/Ellipse 5.png`
								: `${process.env.PUBLIC_URL}/assets/Ellipse.png`
						}
						alt="Ellipse.png"
					/>
				</Logo>
				<InputTitleContainer>
					<InputContainer>
						<InputTitle>닉네임:</InputTitle>
						<Input>수정할 닉네임을 입력해주세요.</Input>
					</InputContainer>
					<InputContainer>
						<InputTitle>비밀번호:</InputTitle>
						<Input>수정할 비밀번호를 입력해주세요.</Input>
					</InputContainer>
				</InputTitleContainer>
				<ButtonForm>
					<WithdrawalButton>회원탈퇴</WithdrawalButton>
					<ButtonContainer>
						<Button>수정</Button>
						<Button>취소</Button>
					</ButtonContainer>
				</ButtonForm>
			</EditMyPageForm>
		</EditMyPageContainer>
	);
}
export default EditMyPage;

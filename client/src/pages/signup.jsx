import styled from 'styled-components';
import HorizontalLine from '../components/HorizonLine';

/* 회원가입 전체 컨테이너 */
const SignupContainer = styled.div`
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
/* 회원가입 타이틀 */
const SignupTitle = styled.div`
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
/* 회원가입 폼 */
const SignupForm = styled.div`
	width: 600px;
	height: 660px;
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

/* 회원가입 인풋 전체 컨테이너 */
const SignupInputContainer = styled.div`
	width: 440px;
	height: 135px;
	margin-bottom: 60px;
	font-size: 17px;
	font-weight: 700;
	@media (max-width: 768px) {
		width: 220px;
		height: 75px;
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 회원가입 인풋 */
const SignupInput = styled.div`
	width: 440px;
	height: 45px;
	border-bottom: 2px solid #d9d9d9;
	color: #d9d9d9;
	font-family: 'Inter';
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 37.5px;
	}
`;
/* 회원가입 버튼 */
const SignupButton = styled.button`
	width: 440px;
	height: 50px;
	background-color: #37a0db;
	color: white;
	border-radius: 10px;
	border: none;
	margin-bottom: 20px;
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

/* 회원가입 구글 회원가입 버튼 */
const SignupGoogleButton = styled.button`
	width: 440px;
	height: 50px;
	background-color: white;
	color: black;
	border-radius: 10px;
	border: 1px solid #d9d9d9;
	margin-bottom: 28px;
	font-size: 17px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: #d9d9d9;
	}
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
		font-size: 13px;
		font-weight: 700;
	}
`;

/* 회원가입 OAuth 로고 */
const Logo = styled.div`
	width: 80px;
	> img {
		width: 30px;
		height: 30px;
	}
	@media (max-width: 768px) {
		width: 60px;
		> img {
			width: 15px;
			height: 24px;
		}
	}
`;
/* 회원가입 OAuth 텍스트 */
const Text = styled.div`
	width: 240px;
	text-align: center;
	display: flex;
`;

/* 회원가입 카카오 회원가입 버튼 */
const SignupKaKaoButton = styled.button`
	width: 440px;
	height: 50px;
	background-color: #f1d100;
	color: black;
	border-radius: 10px;
	border: none;
	margin-bottom: 40px;
	font-size: 17px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: #d9d9d9;
	}
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
		font-size: 13px;
		font-weight: 700;
	}
`;
/* 회원가입 텍스트 전체 컨테이너 */
const SignupTextContainer = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	justify-content: space-between;
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
	}
`;

/* 회원가입 텍스트 */
const SignupText = styled.div`
	width: 300px;
	height: 45px;
	text-align: center;
	@media (max-width: 768px) {
		font-size: 14px;
	}
`;

/* 로그인 회원가입 링크 */
const LoginLink = styled.a`
	width: 140px;
	height: 45px;
	color: #37a0db;
	@media (max-width: 768px) {
		font-size: 14px;
	}
`;
function Signup() {
	return (
		<SignupContainer>
			<SignupTitle>회원가입</SignupTitle>
			<SignupForm>
				<SignupInputContainer>
					<SignupInput>닉네임</SignupInput>
					<SignupInput>이메일</SignupInput>
					<SignupInput>비밀번호</SignupInput>
				</SignupInputContainer>
				<SignupButton>회원가입</SignupButton>
				<HorizontalLine text="또는" />
				<SignupGoogleButton>
					<Logo>
						<img
							src={`${process.env.PUBLIC_URL}/assets/google.png`}
							alt="google.png"
						/>
					</Logo>
					<Text>구글 계정으로 회원가입 하기</Text>
				</SignupGoogleButton>
				<SignupKaKaoButton>
					<Logo>
						<img
							src={`${process.env.PUBLIC_URL}/assets/kakaotalk.png`}
							alt="KaKao.png"
						/>
					</Logo>
					<Text>카카오 계정으로 회원가입 하기</Text>
				</SignupKaKaoButton>
				<SignupTextContainer>
					<SignupText>이미 회원이십니까? </SignupText>
					<LoginLink>로그인</LoginLink>
				</SignupTextContainer>
			</SignupForm>
		</SignupContainer>
	);
}

export default Signup;

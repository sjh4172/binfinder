import styled from 'styled-components';
import HorizontalLine from '../components/HorizonLine';

/* 로그인 전체 컨테이너 */
const LoginContainer = styled.div`
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
/* 로그인 타이틀 */
const LoginTitle = styled.div`
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
/* 로그인 폼 */
const LoginForm = styled.div`
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

/* 로그인 인풋 전체 컨테이너 */
const LoginInputContainer = styled.div`
	width: 440px;
	height: 90px;
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
/* 로그인 인풋 */
const LoginInput = styled.div`
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
/* 로그인 버튼 */
const LoginButton = styled.button`
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

/* 로그인 구글 로그인 버튼 */
const LoginGoogleButton = styled.button`
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
		font-size: 14px;
		font-weight: 700;
	}
`;

/* 로그인 OAuth 로고 */
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
/* 로그인 OAuth 텍스트 */
const Text = styled.div`
	width: 240px;
	text-align: center;
	display: flex;
`;

/* 로그인 카카오 로그인 버튼 */
const LoginKaKaoButton = styled.button`
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
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 로그인 텍스트 전체 컨테이너 */
const LoginTextContainer = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	justify-content: space-between;
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
	}
`;

/* 로그인 텍스트 */
const LoginText = styled.div`
	width: 300px;
	height: 45px;
	text-align: center;
`;

/* 로그인 회원가입 링크 */
const SignupLink = styled.a`
	width: 140px;
	height: 45px;
	color: #37a0db;
`;
function Login() {
	return (
		<LoginContainer>
			<LoginTitle>로그인</LoginTitle>
			<LoginForm>
				<LoginInputContainer>
					<LoginInput>이메일</LoginInput>
					<LoginInput>비밀번호</LoginInput>
				</LoginInputContainer>
				<LoginButton>로그인</LoginButton>
				<HorizontalLine text="또는" />
				<LoginGoogleButton>
					<Logo>
						<img
							src={`${process.env.PUBLIC_URL}/assets/google.png`}
							alt="google.png"
						/>
					</Logo>
					<Text>구글 계정으로 로그인 하기</Text>
				</LoginGoogleButton>
				<LoginKaKaoButton>
					<Logo>
						<img
							src={`${process.env.PUBLIC_URL}/assets/kakaotalk.png`}
							alt="KaKao.png"
						/>
					</Logo>
					<Text>카카오 계정으로 로그인 하기</Text>
				</LoginKaKaoButton>
				<LoginTextContainer>
					<LoginText>아직 회원이 아니십니까?</LoginText>
					<SignupLink>회원가입</SignupLink>
				</LoginTextContainer>
			</LoginForm>
		</LoginContainer>
	);
}

export default Login;

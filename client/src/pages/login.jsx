/* eslint-disable no-console */
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HorizontalLine from '../components/HorizonLine';
import { loginSuccess, loginFailure } from '../store/userSlice';
import login from '../api/authAPI';
import {
	KEY_ACCESS_TOKEN,
	KEY_REFRESH_TOKEN,
	ERROR_VALIDATION_EMAIL,
	ERROR_VALIDATION_REQUIRED_EMAIL,
	ERROR_VALIDATION_PASSWORD,
	ERROR_VALIDATION_REQUIRED_PASSWORD,
} from '../constant';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validateEmail = (email) => {
		return /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
			email,
		);
	};
	const validatePassword = (password) => {
		return /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/.test(
			password,
		);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		login(data.email, data.password)
			.then((res) => {
				const accessToken = res.data.access_token;
				const refreshToken = res.data.refresh_token;

				localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
				localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken);

				axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

				dispatch(loginSuccess({ email: res.data.email }));

				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				dispatch(loginFailure());
			});
	};
	return (
		<LoginContainer>
			<LoginTitle>로그인</LoginTitle>
			<form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
				<LoginInputContainer>
					<input
						className="LoginInput"
						name="email"
						type="text"
						placeholder="이메일"
						{...register('email', {
							required: true,
							validate: validateEmail,
						})}
					/>
					<ErrorMessage>
						{errors.email?.type === 'required' &&
							ERROR_VALIDATION_REQUIRED_EMAIL}
						{errors.email?.type === 'validate' && ERROR_VALIDATION_EMAIL}
					</ErrorMessage>
					<input
						className="LoginInput"
						name="password"
						type="password"
						placeholder="비밀번호"
						{...register('password', {
							required: true,
							validate: validatePassword,
						})}
					/>
					<ErrorMessage>
						{errors.password?.type === 'required' &&
							ERROR_VALIDATION_REQUIRED_PASSWORD}
						{errors.password?.type === 'validate' && ERROR_VALIDATION_PASSWORD}
					</ErrorMessage>
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
					<SignupLink to="/signup">회원가입</SignupLink>
				</LoginTextContainer>
			</form>
		</LoginContainer>
	);
}

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
	.LoginForm {
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
			font-size: 14px;
		}
	}
	.LoginInput {
		width: 440px;
		height: 45px;
		border: none;
		border-bottom: 2px solid #d9d9d9;
		font-family: 'Inter';
		display: flex;
		align-items: center;
		@media (max-width: 768px) {
			width: 220px;
			height: 37.5px;
			font-size: 14px;
		}
		::placeholder {
			color: #d9d9d9;
		}
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

/* 로그인 버튼 */
const LoginButton = styled.button`
	width: 440px;
	height: 50px;
	background-color: #37a0db;
	color: white;
	border-radius: 10px;
	border: none;
	margin-top: 20px;
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
		font-size: 13px;
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
			width: 20px;
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
		font-size: 13px;
		font-weight: 700;
		display: flex;
	}
`;
/* 로그인 텍스트 전체 컨테이너 */
const LoginTextContainer = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	justify-content: space-between;
	@media (max-width: 768px) {
		font-size: 13px;
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
const ErrorMessage = styled.div`
	width: 440px;
	height: 10px;
	font-size: 14px;
	font-weight: 700;
	color: red;
	margin-top: 10px;
	margin-bottom: 10px;
	@media (max-width: 768px) {
		width: 220px;
		height: 10px;
		font-size: 10px;
	}
`;
/* 로그인 회원가입 링크 */
const SignupLink = styled(Link)`
	width: 140px;
	height: 45px;
	color: #37a0db;
`;
export default Login;

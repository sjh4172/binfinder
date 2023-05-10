/* eslint-disable no-console */
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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
	margin-top: 80px;
	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 393px;
		height: 782px;
		font-size: 14px;
		font-weight: 700;
	}
	/* 회원가입 전체 폼 */
	.SignupForm {
		width: 600px;
		height: 600px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px solid #d9d9d9;
		@media (max-width: 768px) {
			width: 300px;
			height: 540px;
		}
	}
	/* 회원가입 인풋 */
	.SignupInput {
		width: 440px;
		height: 45px;
		border: none;
		border-bottom: 2px solid #d9d9d9;
		font-family: 'Inter';
		display: flex;
		align-items: center;
		::placeholder {
			color: #d9d9d9;
		}
		@media (max-width: 768px) {
			width: 220px;
			height: 30px;
			font-size: 14px;
		}
	}
	/* 회원가입 버튼 */
	.SignupButton {
		width: 440px;
		height: 50px;
		background-color: #37a0db;
		color: white;
		border-radius: 10px;
		border: none;
		margin-top: 40px;
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
			margin-top: 50px;
		}
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
const LoginLink = styled(Link)`
	width: 140px;
	height: 45px;
	color: #37a0db;
	@media (max-width: 768px) {
		font-size: 14px;
	}
`;

function Signup() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/members`, {
				username: data.username,
				email: data.email,
				password: data.password,
			})
			.then(() => {
				navigate('/login');
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<SignupContainer>
			<SignupTitle>회원가입</SignupTitle>
			<form className="SignupForm" onSubmit={handleSubmit(onSubmit)}>
				<SignupInputContainer>
					<input
						className="SignupInput"
						name="username"
						type="text"
						placeholder="username"
						{...register('username', {
							required: true,
							minLength: {
								value: 5,
								message: '5글자 이상 입력해주세요',
							},
						})}
					/>
					<ErrorMessage>
						{errors.username?.type === 'required' && '닉네임을 입력해주세요'}
						{errors.username?.type === 'minLength' && errors.username.message}
					</ErrorMessage>
					<input
						className="SignupInput"
						name="email"
						type="text"
						placeholder="email"
						{...register('email', {
							required: true,
							pattern: {
								value:
									/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
								message: '이메일 양식에 맞춰서 사용하세요 ',
							},
						})}
					/>
					<ErrorMessage>
						{errors.email?.type === 'required' && '이메일을 입력해주세요'}
						{errors.email?.type === 'pattern' && errors.email.message}
					</ErrorMessage>
					<input
						className="SignupInput"
						name="password"
						type="password"
						placeholder="password"
						{...register('password', {
							required: true,
							pattern: {
								value:
									/(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
								message:
									'비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요. ',
							},
						})}
					/>
					<ErrorMessage>
						{errors.password?.type === 'required' && '비밀번호를 입력해주세요'}
						{errors.password?.type === 'pattern' && errors.password.message}
					</ErrorMessage>
				</SignupInputContainer>
				<button className="SignupButton" type="submit">
					회원가입
				</button>
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
					<LoginLink to="/login">로그인</LoginLink>
				</SignupTextContainer>
			</form>
		</SignupContainer>
	);
}

export default Signup;

import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '../hooks/useMediaQuery';
import { HeaderButton } from '../styles/Buttons';
import { Z_INDEX_STYLED_HEADER } from '../zIndex';
import MOBILE_MAX_WIDTH from '../mediaQuery';
import { URL_LOGIN, URL_MAP, URL_MYPAGE, URL_SIGNUP } from '../routesURL';
import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from '../Constant';
import { loginFailure } from '../store/UserSlice';

export default function Header({
	isSidebarOpen,
	setIsSidebarOpen,
	setIsSidebarOpeFirst,
}) {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery();
	const { isAuthenticated, username } = useSelector((state) => state.auth);
	const handleLogout = () => {
		localStorage.removeItem(KEY_ACCESS_TOKEN);
		localStorage.removeItem(KEY_REFRESH_TOKEN);
		axios.defaults.headers.common.Authorization = null;

		dispatch(loginFailure());
	};
	const toggleSideBar = () => {
		setIsSidebarOpen(!isSidebarOpen);
		setIsSidebarOpeFirst(false);
	};
	useEffect(() => {
		const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);
		const refreshToken = localStorage.getItem(KEY_REFRESH_TOKEN);

		if (accessToken && refreshToken) {
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		}
	}, []);

	return (
		<StyledHeader>
			<HeaderWrapper>
				<Menu>
					<MenuIcon onClick={toggleSideBar} />
				</Menu>
				<LogoWrapper to={URL_MAP}>
					<LogoImage
						src={`${process.env.PUBLIC_URL}/assets/logo.png`}
						alt="로고 이미지"
					/>
					{!isMobile && <LogoText>BINFINDER</LogoText>}
				</LogoWrapper>
				{!isAuthenticated ? (
					<ButtonWrapper>
						<HeaderButton type="button">
							<Link to={URL_SIGNUP}>Sign up</Link>
						</HeaderButton>
						<HeaderButton type="button">
							<Link to={URL_LOGIN}>Log in</Link>
						</HeaderButton>
					</ButtonWrapper>
				) : (
					<ButtonWrapper>
						<Link to={URL_MYPAGE}>
							<Profile
								src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${username}&scale=90&size=60&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc&backgroundColor=0a5b83,69d2e7,f1f4dc`}
								alt="Profile"
							/>
						</Link>
						<HeaderButton type="button" onClick={handleLogout}>
							<Link to={URL_MAP}>Log out</Link>
						</HeaderButton>
					</ButtonWrapper>
				)}
			</HeaderWrapper>
		</StyledHeader>
	);
}
const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80px;
	width: 100%;
	padding: 0 20px;
	background-color: var(--bg-color);
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${Z_INDEX_STYLED_HEADER};

	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		height: 70px;
	}
`;

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	max-width: 100%;
	width: 100%;
	height: 100%;
`;

const Menu = styled.button`
	display: flex;
	flex: 1;
	justify-content: flex-start;
	border: none;
	background-color: transparent;
	outline: none;
`;

const MenuIcon = styled(FiMenu)`
	cursor: pointer;
	font-size: var(--title);
`;

const LogoWrapper = styled(Link)`
	display: flex;
	flex: 2;
	text-align: center;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

const LogoImage = styled.img`
	width: 60px;
	height: 60px;
`;

const LogoText = styled.div`
	font-size: 35px;
	font-weight: 800;
	/* letter-spacing: 0.1em; */
	color: var(--footer-color);
	font-family: 'GFS Neohellenic', sans-serif;
`;

const ButtonWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	> * {
		margin-left: 10px;
	}
`;

const Profile = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50px;
	cursor: pointer;

	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		width: 40px;
		height: 40px;
	}
`;

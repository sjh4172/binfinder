import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BsRecycle, BsKeyboard } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { GrMapLocation } from 'react-icons/gr';
import { VscLocation } from 'react-icons/vsc';
import useMediaQuery from '../hooks/useMediaQuery';
import { HeaderButton } from '../styles/Buttons';
import { Z_INDEX_STYLED_HEADER } from '../zIndex';
import MOBILE_MAX_WIDTH from '../mediaQuery';
import {
	URL_LOGIN,
	URL_MAP,
	URL_MYPAGE,
	URL_SIGNUP,
	URL_POST,
	URL_PLOGGING,
	URL_INTRODUCTION,
} from '../routesURL';
import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from '../Constant';
import { loginFailure } from '../store/UserSlice';

export default function Header() {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery();
	const [activeMenu, setActiveMenu] = useState(null);
	const { isAuthenticated, username } = useSelector((state) => state.auth);
	const handleMenuClick = (menuName) => {
		setActiveMenu(menuName);
	};
	const handleLogout = () => {
		localStorage.removeItem(KEY_ACCESS_TOKEN);
		localStorage.removeItem(KEY_REFRESH_TOKEN);
		axios.defaults.headers.common.Authorization = null;

		dispatch(loginFailure());
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
				<LogoWrapper to={URL_MAP}>
					{!isMobile && <LogoText>BINFINDER</LogoText>}
					{isMobile && (
						<LogoImage
							src={`${process.env.PUBLIC_URL}/assets/HeaderLogo.png`}
							alt="로고 이미지"
						/>
					)}
				</LogoWrapper>
				<MenuWrapper>
					{!isMobile && (
						<Menu
							to={URL_INTRODUCTION}
							className={activeMenu === URL_INTRODUCTION ? 'active' : ''}
							onClick={() => handleMenuClick(URL_INTRODUCTION)}
						>
							ABOUT
						</Menu>
					)}
					{isMobile && (
						<Menu
							to={URL_INTRODUCTION}
							className={activeMenu === URL_INTRODUCTION ? 'active' : ''}
							onClick={() => handleMenuClick(URL_INTRODUCTION)}
						>
							<HiOutlineInformationCircle size="30" />
						</Menu>
					)}
					{!isMobile && (
						<Menu
							to={URL_MAP}
							className={activeMenu === URL_MAP ? 'active' : ''}
							onClick={() => handleMenuClick(URL_MAP)}
						>
							TRASHCAN
						</Menu>
					)}
					{isMobile && (
						<Menu
							to={URL_MAP}
							className={activeMenu === URL_MAP ? 'active' : ''}
							onClick={() => handleMenuClick(URL_MAP)}
						>
							<VscLocation size="30" />
						</Menu>
					)}
					{!isMobile && (
						<Menu
							to={URL_PLOGGING}
							className={activeMenu === URL_PLOGGING ? 'active' : ''}
							onClick={() => handleMenuClick(URL_PLOGGING)}
						>
							PLOGGING
						</Menu>
					)}
					{isMobile && (
						<Menu
							to={URL_PLOGGING}
							className={activeMenu === URL_PLOGGING ? 'active' : ''}
							onClick={() => handleMenuClick(URL_PLOGGING)}
						>
							<img
								src={`${process.env.PUBLIC_URL}/assets/Plogging.png`}
								alt="로고 이미지"
							/>
						</Menu>
					)}
					{!isMobile && <Menu>HOW 2 RECYCLE</Menu>}
					{isMobile && (
						<Menu>
							<BsRecycle size="30" />
						</Menu>
					)}
					{!isMobile && (
						<Menu
							to={URL_POST}
							className={activeMenu === URL_POST ? 'active' : ''}
							onClick={() => handleMenuClick(URL_POST)}
						>
							COMMUNITY
						</Menu>
					)}
					{isMobile && (
						<Menu
							to={URL_POST}
							className={activeMenu === URL_POST ? 'active' : ''}
							onClick={() => handleMenuClick(URL_POST)}
						>
							<BsKeyboard size="30" />
						</Menu>
					)}
					{!isMobile && (
						<Menu
							to={URL_MYPAGE}
							className={activeMenu === URL_MYPAGE ? 'active' : ''}
							onClick={() => handleMenuClick(URL_MYPAGE)}
						>
							MYPAGE
						</Menu>
					)}
					{isMobile && (
						<Menu
							to={URL_MYPAGE}
							className={activeMenu === URL_MYPAGE ? 'active' : ''}
							onClick={() => handleMenuClick(URL_MYPAGE)}
						>
							<BiUserCircle size="30" />
						</Menu>
					)}
				</MenuWrapper>
				{!isAuthenticated ? (
					<ButtonWrapper>
						<HeaderButton
							type="button"
							className={activeMenu === URL_SIGNUP ? 'active' : ''}
							onClick={() => handleMenuClick(URL_SIGNUP)}
						>
							<Link to={URL_SIGNUP}>
								<div>
									<span>S</span>
									<span>i</span>
									<span>g</span>
									<span>n</span>
									<span>U</span>
									<span>p</span>
								</div>
							</Link>
						</HeaderButton>
						<HeaderButton
							type="button"
							className={activeMenu === URL_LOGIN ? 'active' : ''}
							onClick={() => handleMenuClick(URL_LOGIN)}
						>
							<Link to={URL_LOGIN}>
								<div>
									<span>L</span>
									<span>o</span>
									<span>g</span>
									<span>I</span>
									<span>n</span>
								</div>
							</Link>
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

const LogoImage = styled.img`
	width: 40px;
	height: 40px;
`;

const LogoWrapper = styled(Link)`
	display: flex;
	flex: 2;
	justify-content: center;
	align-items: center;
`;

const LogoText = styled.div`
	font-size: 20px;
	font-weight: 800;
	/* letter-spacing: 0.1em; */
	color: var(--footer-color);
	font-family: 'GFS Neohellenic', sans-serif;
`;

const MenuWrapper = styled.div`
	display: flex;
	flex: 4;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
`;
const Menu = styled(Link)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: 'Cormorant Unicase';
	color: gray;
	:hover {
		color: black;
	}
	&.active {
		color: #37a0db;
	}
	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		width: 20px;
		height: 20px;
		img {
			width: 20px;
			height: 20px;
		}
	}
`;
const ButtonWrapper = styled.div`
	display: flex;
	flex: 2;
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

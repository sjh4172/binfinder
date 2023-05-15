import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { HeaderButton } from '../styles/Buttons';
import { Z_INDEX_STYLED_HEADER } from '../zIndex';
import MOBILE_MAX_WIDTH from '../mediaQuery';
import { URL_LOGIN, URL_MAP, URL_SIGNUP } from '../routesURL';

export default function Header({
	isLogin,
	setIsLogin,
	isSidebarOpen,
	setIsSidebarOpen,
	setIsSidebarOpeFirst,
}) {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	const handleLogout = () => {
		setIsLogin(false);
	};
	const toggleSideBar = () => {
		setIsSidebarOpen(!isSidebarOpen);
		setIsSidebarOpeFirst(false);
	};
	return (
		<StyledHeader>
			<HeaderWrapper>
				<Menu>
					<MenuIcon onClick={toggleSideBar} />
				</Menu>
				<LogoWrapper>
					<LogoImage
						src={`${process.env.PUBLIC_URL}/assets/logo.png`}
						alt="로고 이미지"
					/>
					{!isMobile && <LogoText>어디에버려</LogoText>}
				</LogoWrapper>
				{!isLogin ? (
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
						<Profile
							// 마이페이지로 링크
							src={`${process.env.PUBLIC_URL}/assets/exprofile.png`}
							alt="프로필"
						/>
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

const LogoWrapper = styled.div`
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
	font-size: var(--sub-title);
	font-weight: 700;
	letter-spacing: 0.2em;
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

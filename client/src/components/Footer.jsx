import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BsRecycle, BsKeyboard } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { VscLocation } from 'react-icons/vsc';
import { FaRunning } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import MOBILE_MAX_WIDTH from '../mediaQuery';
import useMediaQuery from '../hooks/useMediaQuery';
import {
	URL_INTRODUCTION,
	URL_LOGIN,
	URL_MAP,
	URL_RECYCLE,
	URL_PLOGGING,
	URL_POST,
	URL_SIGNUP,
	URL_MYPAGE,
} from '../routesURL';

export default function Footer() {
	const mediaQuery = useMediaQuery('(min-width: 1090px)');
	const isMobile = useMediaQuery('(max-width: 767px)');
	const [activeMenu, setActiveMenu] = useState(null);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const handleMenuClick = (menuName) => {
		if (isMobile && activeMenu !== menuName) {
			setActiveMenu(menuName);
		}
	};
	const { pathname } = useLocation();
	if (pathname === URL_SIGNUP) return null;
	if (pathname === URL_LOGIN) return null;
	if (pathname === URL_INTRODUCTION) return null;

	const memberList = [
		{
			name: '최승원',
			href: 'https://github.com/RomaneeChoiti',
			gitId: 'RomaneeChoiti',
		},
		{
			name: '유슬기',
			href: 'https://github.com/Seulgi-Yoo',
			gitId: 'Seulgi-Yoo',
		},
		{
			name: '전형호',
			href: 'https://github.com/JHH0906',
			gitId: 'JHH0906',
		},
		{
			name: '원영은',
			href: 'https://github.com/lulu242',
			gitId: 'lulu242',
		},
		{
			name: '손정훈',
			href: 'https://github.com/sjh4172',
			gitId: 'sjh4172',
		},
		{
			name: '백서연',
			href: 'https://github.com/yeri134',
			gitId: 'yeri134',
		},
		{
			name: '김나연',
			href: 'https://github.com/0324skdus',
			gitId: '0324skdus',
		},
		{
			name: '이난영',
			href: 'https://github.com/NYinJP',
			gitId: 'NYinJP',
		},
	];
	return (
		<FooterWrapper>
			{isMobile && (
				<MenuWrapper>
					<Menu
						to={URL_INTRODUCTION}
						className={activeMenu === URL_INTRODUCTION ? 'active' : ''}
						onClick={() => handleMenuClick(URL_INTRODUCTION)}
					>
						<HiOutlineInformationCircle size="30" />
						about
					</Menu>
					<Menu
						to={URL_MAP}
						className={activeMenu === URL_MAP ? 'active' : ''}
						onClick={() => handleMenuClick(URL_MAP)}
					>
						<VscLocation size="30" />
						map
					</Menu>
					<Menu
						to={URL_PLOGGING}
						className={activeMenu === URL_PLOGGING ? 'active' : ''}
						onClick={() => handleMenuClick(URL_PLOGGING)}
					>
						<FaRunning size="20" />
						plogging
					</Menu>
					<Menu
						to={URL_RECYCLE}
						className={activeMenu === URL_RECYCLE ? 'active' : ''}
						onClick={() => handleMenuClick(URL_RECYCLE)}
					>
						<BsRecycle size="30" />
						recycle
					</Menu>
					<Menu
						to={URL_POST}
						className={activeMenu === URL_POST ? 'active' : ''}
						onClick={() => handleMenuClick(URL_POST)}
					>
						<BsKeyboard size="30" />
						community
					</Menu>
					{isAuthenticated && (
						<Menu
							to={URL_MYPAGE}
							className={activeMenu === URL_MYPAGE ? 'active' : ''}
							onClick={() => handleMenuClick(URL_MYPAGE)}
						>
							<BiUserCircle size="30" />
							mypage
						</Menu>
					)}
				</MenuWrapper>
			)}
			{!isMobile && (
				<SectionWrapper className="wrapper1">
					<SectionTitle>[팀 정보]</SectionTitle>
					<SectionList>
						<li>팀명: 에배레스트</li>
						<li>
							<a
								href="https://github.com/codestates-seb/seb43_main_018"
								target="_blank"
								rel="noreferrer"
							>
								GitHub: codestates-seb/seb43_main_018
							</a>
						</li>
					</SectionList>
					<Line />
					<p>Copyright © 2023 by 에배레스트</p>
				</SectionWrapper>
			)}
			{mediaQuery && !isMobile && (
				<SectionWrapper className="wrapper2">
					<SectionTitle>[서비스 목적과 가치]</SectionTitle>
					<SectionList>
						<li>
							<p>쓰레기통 위치 정보를 제공하여 환경 보호에 기여합니다.</p>
						</li>
						<li>
							<p>
								사용자들이 더욱 효율적으로 쓰레기 처리를 할 수 있도록 돕습니다.
							</p>
						</li>
					</SectionList>
				</SectionWrapper>
			)}
			{!isMobile && (
				<SectionWrapper className="wrapper3">
					<SectionTitle>[Site map]</SectionTitle>
					<SectionList>
						<Link to={URL_MAP}>Map</Link>
						<Link to={URL_POST}>Community</Link>
						<Link to={URL_PLOGGING}>Plogging</Link>
						<Link to={URL_RECYCLE}>Recycle</Link>
					</SectionList>
				</SectionWrapper>
			)}
			{!isMobile && (
				<SectionWrapper className="wrapper4">
					<SectionTitle>[개발자 정보 (GitHub)]</SectionTitle>
					<SectionList className="member">
						<div>
							{memberList.slice(0, 4).map((el) => (
								<li key={el.name}>
									{`${el.name}   `}
									<a href={el.href} target="_blank" rel="noreferrer">
										{`(${el.gitId})`}
									</a>
								</li>
							))}
						</div>
						<div>
							{memberList.slice(4, 8).map((el) => (
								<li key={el.name}>
									{`${el.name}   `}
									<a href={el.href} target="_blank" rel="noreferrer">
										{`(${el.gitId})`}
									</a>
								</li>
							))}
						</div>
					</SectionList>
				</SectionWrapper>
			)}
		</FooterWrapper>
	);
}

const FooterWrapper = styled.footer`
	position: relative;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 228px;
	display: flex;
	justify-content: space-around;
	gap: 20px;
	background-color: var(--footer-color);
	padding: 40px 10px;
	margin-top: 80px;
	.wrapper1 {
		flex: 0 250px auto;
	}
	.wrapper2 {
		flex: 0 100px auto;
		line-height: 1.5;
	}
	.wrapper3 {
		flex: 0 50px auto;
		a {
			margin-bottom: 15px;
		}
	}
	.wrapper4 {
		flex: 0 225px auto;
		.member {
			display: flex;
			flex-direction: row;
		}
		div > * {
			margin-bottom: 10px;
			margin-right: 20px;
		}
	}
	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		background: white;
		position: fixed;
	}
`;
const MenuWrapper = styled.div`
	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 80px;
	}
`;
const Menu = styled(Link)`
	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90px;
		height: 100px;
		color: gray;
		font-size: 12px;
		position: fiexd;
		:hover {
			color: black;
		}
		&.active {
			color: #37a0db;
			background: #d9d9d9;
		}
	}
`;
const SectionWrapper = styled.section`
	color: var(--text-white-color);
`;

const SectionTitle = styled.h4`
	font-size: var(--small);
	margin-bottom: 20px;
`;

const SectionList = styled.ul`
	padding-left: 0;
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	> * {
		font-size: var(--small);
		margin-bottom: 5px;
	}
`;

const Line = styled.hr`
	border: none;
	border-top: 0.5px solid #ccc;
	margin-bottom: 20px;
`;

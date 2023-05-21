import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { URL_LOGIN, URL_SIGNUP } from '../routesURL';

export default function Footer() {
	const { pathname } = useLocation();
	if (pathname === URL_SIGNUP) return null;
	if (pathname === URL_LOGIN) return null;
	return (
		<FooterWrapper>
			<SectionWrapper>
				<SectionTitle>[팀 정보]</SectionTitle>
				<SectionList>
					<li>팀명: 에배레스트</li>
					<li>이메일: support@garbagebinservice.com</li>
				</SectionList>
				<Line />
				<p>Copyright © 2023 by 에배레스트</p>
			</SectionWrapper>
			<SectionWrapper>
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
			<SectionWrapper>
				<SectionTitle>[Site map]</SectionTitle>
				<SectionList>
					{/* Link로 교체 */}
					<li>Map</li>
					<li>Community</li>
					<li>Plogging</li>
					<li>Notice</li>
				</SectionList>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>[개발자 정보 (GitHub)]</SectionTitle>
				<SectionList>
					<li>
						김개발 <a href="github.com">(kimcoding)</a>
					</li>
					<li>내용</li>
				</SectionList>
			</SectionWrapper>
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
	padding: 40px 0;
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

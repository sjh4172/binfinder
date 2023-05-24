import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { URL_INTRODUCTION } from '../routesURL';

function MainPage() {
	return (
		<MainContainer>
			<Section
				color="rgb(255,255,255)"
				linear="180deg, rgba(255,255,255,1) 21%, rgba(210,255,242,1) 100%"
			>
				<img
					className="pattern1"
					src={`${process.env.PUBLIC_URL}/assets/pattern.png`}
					alt="무늬"
				/>
				<img
					className="pattern2"
					src={`${process.env.PUBLIC_URL}/assets/pattern.png`}
					alt="무늬"
				/>
				<div className="section1">
					<div>
						<h1>🔎BINFINDER</h1>
						<h2>쓰레기 없는 친환경적인 도시를 생각합니다.</h2>
						<p>
							<span>BinFinder</span>는 사용자 위치 기반 내 최대{' '}
							<span>10km</span> 이내의 쓰레기 통 위치를 제공함으로써 도시의
							환경보호와 사용자의 쓰레기 처리를 도울 수 있습니다. 쓰레기 없는
							길거리를 위해 <span>BinFinder</span>를 이용해 가까운 쓰레기통을
							찾아보세요
						</p>
						<Link to={URL_INTRODUCTION} className="linkButton">
							About Us
						</Link>
					</div>
					<img
						src={`${process.env.PUBLIC_URL}/assets/viewcapture.png`}
						alt="실제화면모습"
					/>
				</div>
			</Section>
			<Section>기능소개</Section>
			<Section>팀원 소개</Section>
		</MainContainer>
	);
}

export default MainPage;

const MainContainer = styled.section`
	position: relative;
	top: 80px;
	@media (max-width: 768px) {
		top: 70px;
	}
`;
const Section = styled.section`
	width: 100vw;
	height: 90vh;
	background: ${(props) => props.color};
	background: ${(props) => `linear-gradient(${props.linear})`};
	padding: 150px 100px;
	.pattern1 {
		position: absolute;
		left: -140px;
		top: 60px;
	}
	.pattern2 {
		position: absolute;
		left: -220px;
		top: 150px;
	}
	.section1 {
		max-width: 1400px;
		display: flex;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 20px;
		gap: 100px;
	}
	h1 {
		font-size: 50px;
		font-weight: 800;
		color: var(--footer-color);
		font-family: 'GFS Neohellenic', sans-serif;
		margin-bottom: 30px;
		margin-top: 80px;
	}
	h2 {
		font-size: 22px;
		font-weight: 800;
		padding-bottom: 40px;
		line-height: 1.5;
	}
	p {
		line-height: 1.8;
		font-size: 16px;
		margin-bottom: 50px;
	}
	span {
		font-size: 18px;
		font-weight: 800;
	}
	.linkButton {
		padding: 10px 50px;
		background-color: #58dfb9;
		color: white;
		border-radius: 20px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	.linkButton:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	}
`;

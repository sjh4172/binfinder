import styled, { keyframes } from 'styled-components';
import mapImage from '../../image/map_capture.png';
import mapMobileImage from '../../image/Mmap_capture.png';

function AboutComponent1() {
	return (
		<AboutComponentContainer>
			<div className="contentWrapper">
				<h2>BINFINDER</h2>
				<h3>
					<span>BINFINDER</span>는 쓰레기 없는 친환경적인 도시를 생각합니다.
				</h3>
				<p>
					<span>BINFINDER</span>는 사용자 위치 기반 내 주변 쓰레기통, 재활용
					쓰레기통 위치를 제공함으로써 도시의 환경 보호와 사용자의 쓰레기 처리를
					도울 수 있습니다. 쓰레기 없는 깨끗한 길거리를 위해{' '}
					<span>BINFINDER</span>를 이용해 가까운 쓰레기통을 찾아보세요!
				</p>
			</div>
			<div className="imgWrapper">
				<div className="mobileImg" />
				<div className="desktopImg" />
			</div>
		</AboutComponentContainer>
	);
}
const imgUp = keyframes`
  from {
    transform: translateY(50%);
		opacity: 0;
  }
  to {
    transform: translateY(0);
		opacity: 1;
  }
`;

const AboutComponentContainer = styled.section`
	height: 100vh;
	max-width: 1300px;
	padding: 250px 30px 100px 50px;
	display: flex;
	justify-content: space-between;
	.imgWrapper {
		width: 500px;
		height: 600px;
		overflow: hidden;
		animation: ${imgUp} 1s cubic-bezier(0, 0, 0.2, 1) forwards;
	}
	.desktopImg {
		background-image: url(${mapImage});
		width: 90%;
		height: 40%;
		border-radius: 10px;
		background-repeat: no-repeat;
		background-size: 100%;
		box-shadow: 5px 5px 10px #3260a2, -1px -1px 1px #e9eef5;
		position: absolute;
		top: 250px;
		left: 50px;
	}
	.mobileImg {
		background-image: url(${mapMobileImage});
		width: 50%;
		height: 70%;
		border-radius: 10px;
		background-repeat: no-repeat;
		background-size: 100%;
		box-shadow: 5px 5px 10px #3260a2, -2px -2px 5px #4a90f2;
		position: absolute;
	}
	.contentWrapper {
		flex: 2;
		margin-right: 50px;
	}
	h2 {
		font-size: 45px;
		font-weight: 800;
		color: white;
		font-family: 'GFS Neohellenic', sans-serif;
		margin-bottom: 30px;
	}
	p,
	h3 {
		line-height: 1.8;
		margin-bottom: 15px;
		color: white;
		font-size: var(--large);
		word-break: break-all;
	}
	h3 {
		font-size: 22px;
		font-weight: 800;
	}
	span {
		font-family: 'GFS Neohellenic', sans-serif;
		font-weight: 800;
		font-size: var(--sub-title);
	}
	@media (max-width: 910px) {
		flex-direction: column;
		padding: 100px 30px 100px 50px;
		.imgWrapper {
			width: 100%;
			height: 50%;
			overflow: hidden;
			animation: ${imgUp} 1s cubic-bezier(0, 0, 0.2, 1) forwards;
		}
		.desktopImg {
			background-image: url(${mapImage});
			width: 70%;
			height: 63%;
			border-radius: 10px;
			background-repeat: no-repeat;
			background-size: 100%;
			box-shadow: 5px 5px 10px #3260a2, -1px -1px 1px #e9eef5;
			position: absolute;
			top: 100px;
			left: 50px;
		}
		.mobileImg {
			background-image: url(${mapMobileImage});
			width: 50%;
			height: 70%;
			border-radius: 10px;
			background-repeat: no-repeat;
			background-size: 100%;
			box-shadow: 5px 5px 10px #3260a2, -2px -2px 5px #4a90f2;
			position: absolute;
		}
	}
`;

export default AboutComponent1;

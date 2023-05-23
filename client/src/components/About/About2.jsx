import styled from 'styled-components';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

function AboutComponent2() {
	const element = useScrollFadeIn('up', 1, 0);
	return (
		<AboutComponentContainer>
			<div className="contentWrapper">
				<h2>Project Overview</h2>
				<h3>
					서울시 전체 쓰레기통 위치를 기반으로 무단 투기를 방지하고 깨끗한
					길거리를 만들 수 있습니다.
				</h3>
				<p>
					정부와 지자체가 도시 미관과 미화 인력 부족, 쓰레기 종량제 제도의 안착
					등 다양한 이유로 인해 거리의 쓰레기통을 줄여나가고 있습니다. 길거리를
					돌아다니면서 손안의 쓰레기를 처리하기 위해 곤란했던 경험이 있으신가요?
					아니면 주변의 쓰레기통이나 무단 투기된 쓰레기들로 거리가 지저분해서
					불쾌했던 경험이 있으신가요?
				</p>
				<p>
					그런 곤란한 순간에 <span>BINFINDER</span>를 이용해{' '}
					<span>
						내 주변 가까운 쓰레기통을 찾아보고 간단하게 손안의 쓰레기를
						처리하세요!
					</span>{' '}
					또한 사용자는 쓰레기통에 대해 좋아요, 싫어요 기능으로 쓰레기통에 대한
					현재 상황을 공유할 수 있습니다.
				</p>
			</div>
			<div className="imgWrapper" {...element}>
				<div
					className="img"
					src="https://ai.esmplus.com/gded/h/e/20180522/19/152698487825160a4aba.jpg"
					alt="지도에 쓰레기통 위치가 표시된 이미지"
				/>
			</div>
		</AboutComponentContainer>
	);
}

const AboutComponentContainer = styled.section`
	height: 100vh;
	max-width: 1300px;
	padding: 250px 50px 100px 50px;
	display: flex;
	justify-content: space-between;
	.imgWrapper {
		width: 450px;
		height: 450px;
		overflow: hidden;
		flex: 0 450px auto;
		display: flex;
		justify-content: center;
		align-items: end;
		position: relative;
		top: 70px;
	}
	.img {
		background-image: url('https://www.ujeil.com/news/photo/201907/236000_87237_5310.jpg');
		border-radius: 50%;
		width: 100%;
		height: 100%;
		box-shadow: 5px 5px 10px #3260a2, -2px -2px 5px #4a90f2;
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
		word-break: keep-all;
	}
	span {
		font-family: 'GFS Neohellenic', sans-serif;
		font-weight: 800;
		font-size: var(--sub-title);
	}
	@media (max-width: 910px) {
		flex-direction: column;
		padding: 100px 30px 100px 50px;
		justify-content: center;
		align-items: center;
		.img {
			width: 300px;
			height: 300px;
			background-position: center;
		}
		.imgWrapper {
			height: 500px;
			top: 0px;
		}
		@media (max-width: 775px) {
			.img {
				display: none;
			}
		}
		.contentWrapper {
			margin-right: 20px;
		}
	}
`;

export default AboutComponent2;

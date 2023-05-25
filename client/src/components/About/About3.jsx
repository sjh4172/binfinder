import styled from 'styled-components';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';
import likeImg from '../../image/like.png';

function AboutComponent3() {
	const element = useScrollFadeIn('up', 1, 0);
	return (
		<AboutComponentContainer>
			<div className="contentWrapper">
				<h2>Application Topic</h2>
				<h3>
					나의 실시간 위치를 조회해 내 주변 쓰레기통 위치를 검색해 줍니다!
				</h3>
				<ul>
					<li>
						<h4>쓰레기통 좋아요</h4>
						<p>투표를 통해 쓰레기통 위치 정보의 정확도를 높힐 수 있습니다.</p>
					</li>
					<li>
						<h4>Community</h4>
						<p>
							플로깅,제로웨이스트 등 다양한 환경주제로 커뮤니티를 조성해봐요.
							<br />
							(개발예정)쓰레기통의 위치를 이용해 플로깅 모임을 만들어보세요
						</p>
					</li>
					<li>
						<h4>쓰레기통 등록 (개발 예정)</h4>
						<p>
							지도 상에 없는 새로운 쓰레기통 위치를 직접 추가할 수 있습니다.
						</p>
					</li>
				</ul>
			</div>
			<div className="imgWrapper" {...element}>
				<div className="img" />
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
		background-image: url(${likeImg});
		border-radius: 50%;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: 150%;
		background-position: center;
		box-shadow: 5px 5px 10px #3260a2, -2px -2px 5px #4a90f2;
	}
	.contentWrapper {
		flex: 2;
	}
	h2 {
		font-size: 45px;
		font-weight: 800;
		color: white;
		font-family: 'GFS Neohellenic', sans-serif;
		margin-bottom: 30px;
	}
	p,
	h3,
	ul {
		line-height: 1.8;
		margin-bottom: 30px;
		color: white;
		font-size: var(--large);
		word-break: break-all;
		font-weight: 400;
	}
	h3 {
		font-size: 22px;
		font-weight: 800;
		word-break: keep-all;
	}
	h4 {
		font-size: 19px;
	}
	ul {
		font-weight: 800;
	}
	span {
		font-family: 'GFS Neohellenic', sans-serif;
		font-weight: 800;
	}
	@media (max-width: 910px) {
		flex-direction: column;
		padding: 150px 50px 150px 50px;
		justify-content: center;
		align-items: center;
		.img {
			width: 300px;
			height: 300px;
			background-position: center;
		}
		.imgWrapper {
			display: none;
		}
		p,
		h3,
		ul {
			margin-bottom: 20px;
		}
		@media (max-width: 440px) {
			padding: 100px 50px 100px 50px;

			h2 {
				font-size: var(--title);
			}
			h3 {
				font-size: var(--large);
			}
		}
	}
`;

export default AboutComponent3;

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { URL_INTRODUCTION, URL_MAP, URL_POST, URL_RECYCLE } from '../routesURL';

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
			<Section>
				<div>
					<p2>Application Topic</p2>
					<h2>
						나의 실시간 위치를 조회해 내 주변 쓰레기통 위치를 검색해 줍니다!
					</h2>
					<div className="section2">
						<div>
							<img
								src={`${process.env.PUBLIC_URL}/assets/main2-1.png`}
								alt="쓰레기통이미지"
							/>
							<h3>TrashCan</h3>
							<p>
								나와 가까운 쓰레기통 위치를 확인해 보세요. 상세 정보에는 해당
								쓰레기통의 종류(재활용/일반쓰러기)와 로드뷰, 마지막으로
								좋아요/싫어요 기능을 제공합니다.
							</p>
							<Link to={URL_MAP} className="ViewButton">
								View details {'>'}
							</Link>
						</div>
						<div>
							<img
								src={`${process.env.PUBLIC_URL}/assets/main2-2.png`}
								alt="화합이미지"
							/>
							<h3>Board</h3>
							<p>
								일반 커뮤니티 게시판입니다. 다른 사용자들과 제로웨이스트 등의
								의견을 나눠보세요! 쓰레기통 위치를 이용한 플로깅 멤버를 모집하고
								해당 루트를 등록하는 블로깅 게시만도 있으니 참고해보세요.
							</p>
							<Link to={URL_POST} className="ViewButton">
								View details {'>'}
							</Link>
						</div>
						<div>
							<img
								src={`${process.env.PUBLIC_URL}/assets/main2-3.png`}
								alt="재활용쓰레기통이미지"
							/>
							<h3>How To Recycle</h3>
							<p>
								쓰레기를 버리는 것에 가장 중효한 기능인 재활용과 일반쓰레기를
								분류하는 방법이 담겨있는 페이지입니다! 해당 정보를 확인해
								환경보호를 실천해보세요.
							</p>
							<Link to={URL_RECYCLE} className="ViewButton">
								View details {'>'}
							</Link>
						</div>
					</div>
				</div>
			</Section>
			<Section color="#daf6ff">
				<div className="section3">
					<p3>Meet our team</p3>
					<h4>에배레스트 팀원들을 소개합니다.</h4>
					<p2>Frontend developer</p2>
					<div className="section3-1">
						<div className="gitID">
							<a href="https://github.com/RomaneeChoiti">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg1.png`}
									alt="깃허브이미지"
									href="http://www.naver.com"
								/>
							</a>

							<p4>최승원</p4>
						</div>
						<div className="gitID">
							<a href="https://github.com/lulu242">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg2.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>원영은</p4>
						</div>
						<div className="gitID">
							<a href="https://github.com/JHH0906">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg3.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>전형호</p4>
						</div>
						<div className="gitID">
							<a href="https://github.com/Seulgi-Yoo">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg4.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>유슬기</p4>
						</div>
					</div>
					<p2>Backend developer</p2>
					<div className="section3-1">
						<div className="gitID">
							<a href="https://github.com/sjh4172">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg5.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>손정훈</p4>
						</div>
						<div className="gitID">
							<a href="https://github.com/yeri134">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg6.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>백서연</p4>
						</div>
						<div className="gitID">
							<a href="https://github.com/NYinJP">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg7.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>이난연</p4>
						</div>
						<div className="gitID">
							<a href="https://github.com/0324skdus">
								<img
									className="gitIDimg"
									src={`${process.env.PUBLIC_URL}/assets/gitIDimg8.png`}
									alt="깃허브이미지"
								/>
							</a>
							<p4>김나연</p4>
						</div>
					</div>
				</div>
			</Section>
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
	.section2 {
		max-width: 1400px;
		display: flex;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 20px;
		gap: 100px;
		text-align: center;
	}
	.section3 {
		max-width: 1400px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.section3-1 {
		display: flex;
		gap: 50px;
		margin-bottom: 70px;
	}
	.gitID {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
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
	h3 {
		font-size: 20px;
		font-weight: 900;
		padding-top: 20px;
		padding-bottom: 20px;
		line-height: 1.5;
		color: #58dfb9;
	}
	h4 {
		font-size: 15px;
		font-weight: 900;
		padding-top: 15px;
		padding-bottom: 50px;
		line-height: 1.5;
	}
	p {
		line-height: 1.8;
		font-size: 16px;
		margin-bottom: 50px;
	}
	p2 {
		line-height: 1.8;
		font-size: 16px;
		margin-bottom: 20px;
		color: #b1b1b1;
	}
	p3 {
		line-height: 1.8;
		font-size: 16px;
		color: #b1b1b1;
		text-align: center;
	}
	p4 {
		line-height: 1.8;
		font-size: 16px;
		text-align: center;
		padding-top: 15px;
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
	.ViewButton {
		color: #b1b1b1;
	}
	.gitIDimg {
		border-radius: 50%;
		width: 150px;
		height: 150px;
	}
`;

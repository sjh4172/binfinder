import styled from 'styled-components';
import { BsGithub } from 'react-icons/bs';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

function AboutComponent4() {
	const element1 = useScrollFadeIn('up', 1, 0);
	const element2 = useScrollFadeIn('up', 1, 0.2);

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
		<AboutComponentContainer>
			<h2>Developer</h2>
			<h3>
				<a
					href="https://github.com/codestates-seb/seb43_main_018"
					target="_blank"
					rel="noreferrer"
				>
					Team 에배레스트
				</a>
			</h3>
			<h4>Frontend</h4>
			<ul {...element1}>
				{memberList.slice(0, 4).map((el) => (
					<a href={el.href} target="_blank" rel="noreferrer" key={el.name}>
						<li>
							<BsGithub className="github" />
							<p>{el.gitId}</p>
							<p>{el.name}</p>
						</li>
					</a>
				))}
			</ul>
			<h4>Backend</h4>
			<ul {...element2}>
				{memberList.slice(4, 8).map((el) => (
					<a href={el.href} target="_blank" rel="noreferrer" key={el.name}>
						<li>
							<BsGithub className="github" />
							<p>{el.gitId}</p>
							<p>{el.name}</p>
						</li>
					</a>
				))}
			</ul>
		</AboutComponentContainer>
	);
}

const AboutComponentContainer = styled.section`
	height: 100vh;
	max-width: 1300px;
	padding: 150px 50px 100px 50px;
	display: flex;
	flex-direction: column;

	h2 {
		font-size: 45px;
		font-weight: 800;
		color: white;
		font-family: 'GFS Neohellenic', sans-serif;
		margin-bottom: 30px;
	}
	p,
	h4,
	h3 {
		line-height: 1.8;
		color: white;
		font-size: var(--large);
		word-break: break-all;
		font-weight: 800;
	}
	h4 {
		font-size: 22px;
		margin-bottom: 20px;
	}
	h3 {
		font-size: 25px;
	}
	.github {
		width: 100px;
		height: 100px;
		color: white;
	}
	ul {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	li {
		width: 130px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}
	ul > a {
		margin: 30px 50px;
	}
`;

export default AboutComponent4;

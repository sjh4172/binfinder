import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Title from '../styles/Title';
import CommunityPost from '../components/CommunityPost';
import CommunityComment from '../components/CommunityComment';
import { Button, WarningButton } from '../styles/Buttons';
import MyProfile from '../components/MyProfile';

const DetailPage = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: var(--header-hight);
	max-width: 1024px;
	padding: 50px 0px 100px 0px;
	width: 80vw;
	.title {
		margin-bottom: 20px;
	}
	.bt {
		margin: 30px 30px 30px 0px;
		font-size: var(--base);
		height: 35px;
	}

	textarea {
		font-size: var(--base);
		border-color: var(--line-color);
		width: 100%;
		height: 80px;
		background-color: var(--bg-color);
		resize: none;
		outline: none;
		border-radius: 5px;
		padding: 5px;
	}

	.wbt {
		margin: 10px 0px 20px calc(100% - 100px);
	}
	@media (max-width: 768px) {
		padding-top: 30px;
		.wbt {
			margin: 10px 0px 20px calc(100% - 60px);
		}
		.list {
			width: 80px;
		}
	}
`;

function CommunityDetail() {
	const navigate = useNavigate();
	return (
		<DetailPage>
			<Title className="title">게시글 상세 제목</Title>
			<MyProfile />
			<CommunityPost />
			<Button className="bt list" onClick={() => navigate('/post/read')}>
				목록 보기
			</Button>
			<Button className="bt">♥ 10</Button>
			<Title className="title">1개의 댓글</Title>
			<textarea placeholder="댓글을 입력하세요" />
			<WarningButton className="wbt bt">작성</WarningButton>
			{[1, 1, 1].map((el) => (
				<CommunityComment key={el} />
			))}
		</DetailPage>
	);
}

export default CommunityDetail;

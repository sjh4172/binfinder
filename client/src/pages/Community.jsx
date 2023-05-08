import styled from 'styled-components';
import Title from '../styles/Title';
import { Button } from '../styles/Buttons';
import CommunityList from '../components/CommunityList';
import Pagination from '../components/Pagination';

const CommunityPage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: auto;
	margin-right: auto;
	width: 80vw;
	max-width: 1000px;
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
`;

function Community() {
	return (
		<CommunityPage>
			<div className="flex">
				<Title>게시판</Title>
				<Button>글 작성</Button>
			</div>
			<CommunityList />
			<Pagination />
		</CommunityPage>
	);
}

export default Community;

import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
	margin-top: var(--header-hight);
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
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(19);
	const navigate = useNavigate();
	return (
		<CommunityPage>
			<div className="flex">
				<Title>게시판</Title>
				<Button onClick={() => navigate('/post/write')}>글 작성</Button>
			</div>
			<CommunityList totalPage={totalPage} />
			{totalPage >= 0 ? (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPage={totalPage}
					setSearchParams={setSearchParams}
				/>
			) : null}
		</CommunityPage>
	);
}

export default Community;

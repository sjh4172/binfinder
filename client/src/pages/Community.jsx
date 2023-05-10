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
	padding-top: 50px;
	width: 80vw;
	max-width: 1000px;
	.flex {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		align-items: end;
	}
	@media (max-width: 768px) {
		padding-top: 30px;
	}
`;
const WriteBt = styled(Button)`
	height: 30px;
	font-size: var(--base);
	display: flex;
	justify-content: center;
	@media (max-width: 786px) {
		width: 80px;
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
				<WriteBt onClick={() => navigate('/post/write')}>글 작성</WriteBt>
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

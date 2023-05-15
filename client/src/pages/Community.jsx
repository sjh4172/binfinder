import styled from 'styled-components';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Title from '../styles/Title';
import CommunityList from '../components/CommunityList';
import Pagination from '../components/Pagination';
import { URL_WRITEPOST } from '../routesURL';

function Community() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(19);
	return (
		<CommunityPage>
			<div className="flex">
				<Title>게시판</Title>
				<Link to={URL_WRITEPOST} className="postWrite">
					글 작성
				</Link>
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
	.postWrite {
		height: 30px;
		width: 100px;
		padding: 3px;
		background-color: var(--main-color);
		color: var(--text-white-color);
		box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25),
			inset 0px 2px 0px rgba(255, 255, 255, 0.25);
		border-radius: 5px;
		font-size: var(--base);
		font-weight: 700;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.postWrite:hover {
		background-color: var(--sub3-color);
		color: var(--text-black-color);
		box-shadow: 0px 2px 0px rgba(255, 255, 255, 0.25),
			inset 0px 2px 0px rgba(0, 0, 0, 0.25);
	}
	@media (max-width: 768px) {
		padding-top: 30px;
		.postWrite {
			width: 80px;
			height: 30px;
			font-size: var(--base);
		}
	}
`;

export default Community;

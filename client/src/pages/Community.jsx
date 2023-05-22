import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Title from '../styles/Title';
import CommunityList from '../components/CommunityList';
import Pagination from '../components/Pagination';
import { URL_WRITEPOST } from '../routesURL';
import { getPostList } from '../api/communityAPI';
import Modal from '../components/Modal';
import { Button } from '../styles/Buttons';

function Community() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(19);
	const location = useLocation();
	const [data, setData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (location.search) {
			getPostList(location.search).then((res) => {
				setData(res.data);
				setTotalPage(res.headers.get('X-Total-Pages'));
			});
		}
	}, [searchParams]);

	const handleConfirm = () => {
		setIsModalOpen(false);
	};
	return (
		<CommunityPageContainer>
			<div className="flex">
				<Title>게시판</Title>
				{isAuthenticated && (
					<Link to={URL_WRITEPOST} className="postWrite">
						글 작성
					</Link>
				)}
				{isAuthenticated || (
					<Button
						type="button"
						className="postWrite"
						onClick={() => setIsModalOpen(true)}
					>
						글 작성
					</Button>
				)}
			</div>
			<CommunityList data={data} />
			{totalPage >= 0 && (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPage={totalPage}
					setSearchParams={setSearchParams}
				/>
			)}
			{isModalOpen && (
				<Modal
					message="회원만 작성 가능합니다."
					cancel={false}
					handleConfirm={handleConfirm}
				/>
			)}
		</CommunityPageContainer>
	);
}

const CommunityPageContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: auto;
	margin-right: auto;
	padding-top: calc(var(--header-hight) + 50px);
	width: 80vw;
	max-width: 1000px;
	height: calc(100% - 228px);
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

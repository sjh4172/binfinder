import styled, { keyframes } from 'styled-components';
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
	const [totalPage, setTotalPage] = useState(1);
	const location = useLocation();
	const [data, setData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (location.search) {
			getPostList(location.search).then((res) => {
				setData(res.data.reverse());
				setTotalPage(res.headers.get('X-Total-Pages'));
			});
		}
	}, [searchParams]);

	const handleConfirm = () => {
		setIsModalOpen(false);
	};

	return (
		<CommunityPageContainer>
			<div>
				<div className="flex">
					<Title>Community</Title>
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
	position: relative;
	top: 80px;
	padding: 80px;
	width: 100%;
	max-width: 1750px;
	margin-left: auto;
	margin-right: auto;
	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 5px;
	}
	.postWrite {
		--text: gray;
		--font-size: 16px;
		--duration: 0.44s;
		--move-hover: -4px;
		--font-shadow: var(--font-size);
		padding: 15px 40px;
		margin: 20px 0px 20px auto;
		border: 1px solid var(--main-color);
		color: var(--main-color);
		border-radius: 24px;
		font-size: var(--base);
		font-weight: 700;
		align-items: center;
		display: flex;
		justify-content: center;
		transform: translateY(var(--y)) translateZ(0);
		transition: transform var(--duration) ease, box-shadow var(--duration) ease;
	}
	.postWrite:hover {
		background: #5cabda40;
		--y: var(--move-hover);
		--shadow: var(--shadow-hover);
		span {
			color: black;
			--m: calc(var(--font-size) * -1);
			transform: translateY(calc(var(--font-size) * -1));
		}
	}

	@media (max-width: 768px) {
		top: 70px;
		padding: 10px;
		.postWrite {
			width: 130px;
			height: 30px;
			font-size: var(--base);
			padding: 20px 30px;
		}
		.cummunityTitle {
			margin-top: 30px;
			margin-bottom: 10px;
			font-size: 50px;
		}
		.title {
			margin-right: auto;
		}
	}
`;

export default Community;

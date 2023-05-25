import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Title from '../styles/Title';
import PloggingList from '../components/PloggingList';
import Pagination from '../components/Pagination';
import { URL_WRITEPLOGGING } from '../routesURL';
import { getPostList } from '../api/communityAPI';
import Modal from '../components/Modal';
import { Button } from '../styles/Buttons';
import backgroundImg from '../image/communityBG.png';

function PloggingCommunity() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(1);
	const location = useLocation();
	const [data, setData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (location.search) {
			getPostList(location.search, 'plogs').then((res) => {
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
			<Title className="cummunityTitle">Plogging</Title>
			{isAuthenticated && (
				<Link to={URL_WRITEPLOGGING} className="postWrite">
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
			<div className="flex">
				<PloggingList data={data} />
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
			</div>
		</CommunityPageContainer>
	);
}

const CommunityPageContainer = styled.section`
	position: relative;
	top: 80px;
	padding: 80px;
	width: 100%;
	background-image: url(${backgroundImg});
	background-repeat: no-repeat;
	background-size: cover;
	.flex {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		max-width: 1200px;
		border-radius: 5px;
		margin-left: auto;
		margin-right: auto;
	}
	.postWrite {
		--text: gray;
		--font-size: 16px;
		--duration: 0.44s;
		--move-hover: -4px;
		padding: 15px 40px;
		margin: 0px auto 20px auto;
		width: 200px;
		text-align: center;
		--font-shadow: var(--font-size);
		padding: 16px 32px;
		font-family: 'GFS Neohellenic';
		font-weight: 500;
		line-height: var(--font-size);
		border-radius: 24px;
		display: block;
		outline: none;
		text-decoration: none;
		font-size: var(--font-size);
		letter-spacing: 0.5px;
		border: 1px solid gray;
		background: var(--background);
		color: var(--text);
		box-shadow: var(--shadow);
		transform: translateY(var(--y)) translateZ(0);
		transition: transform var(--duration) ease, box-shadow var(--duration) ease;
	}

	.postWrite:hover {
		background: #e7e7e7;
		--y: var(--move-hover);
		--shadow: var(--shadow-hover);
	}
	.cummunityTitle {
		width: 100%;
		text-align: center;
		font-size: 70px;
		color: white;
		text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.25);
		margin-bottom: 80px;
		margin-bottom: 30px;
	}
	@media (max-width: 768px) {
		top: 70px;
		padding: 10px;

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

export default PloggingCommunity;

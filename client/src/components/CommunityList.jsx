import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { URL_POST } from '../routesURL';
import useDate from '../hooks/useDate';
import Modal from './Modal';

function CommunityList({ data }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [ismodalOpen, setIsModalOpen] = useState(false);
	const handleConfirm = () => {
		setIsModalOpen(false);
	};
	return (
		<Table>
			<thead>
				<tr>
					<th>제목</th>
					<th className="none">작성자</th>
					<th className="none">작성일</th>
					<th className="none">좋아요</th>
				</tr>
			</thead>
			<Line />
			{data && (
				<tbody>
					{data.map((el) => (
						<tr key={el.b_id}>
							<th title={el.b_title} className="title">
								{isAuthenticated && (
									<div className="titleWraper">
										<img
											src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${el.username}&scale=90&size=60&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc&backgroundColor=0a5b83,69d2e7,f1f4dc`}
											alt="Profile"
										/>
										<Link to={`${URL_POST}/${el.b_id}`}>{el.b_title}</Link>
									</div>
								)}
								{isAuthenticated || (
									<button
										type="button"
										className="memberModalOpen"
										onClick={() => setIsModalOpen(true)}
									>
										{el.b_title}
									</button>
								)}
							</th>
							<th className="none">{el.username}</th>
							<th className="none">
								<time>{useDate(el.createdAt)[0]}</time>
							</th>
							<th className="none">
								{el.checkLike ? (
									<p>
										<span>💙</span>
										{el.likes}
									</p>
								) : (
									<p>
										<span>🤍</span>
										{el.likes}
									</p>
								)}
							</th>
							<div className="bottom">
								<th>{el.username}</th>
								<th>
									<time>{useDate(el.createdAt)[0].slice(-8)}</time>
								</th>
								<th>
									{el.checkLike ? (
										<p>
											<span>💙</span>
											{el.likes}
										</p>
									) : (
										<p>
											<span>🤍</span>
											{el.likes}
										</p>
									)}
								</th>
							</div>
						</tr>
					))}
				</tbody>
			)}
			{(!data || data.length === 0) && (
				<p className="empty">게시물이 없습니다.</p>
			)}
			<Line />
			{ismodalOpen && (
				<Modal
					message="회원만 읽을 수 있습니다."
					cancel={false}
					handleConfirm={handleConfirm}
				/>
			)}
		</Table>
	);
}

const Table = styled.table`
	width: 100%;
	max-width: 1024px;
	font-size: var(--large);
	table-layout: fixed;
	min-height: 371px;
	// 테이블 항목
	thead {
		font-size: 19px;
		font-weight: 800;
		color: var(--main-color);
		line-height: 35px;
	}

	// 기본뷰 테이블 열 비율
	tr {
		display: flex;
		padding: 15px 10px;
		align-items: center;
	}

	tr th:nth-child(1) {
		flex: 7;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	tr th:nth-child(2) {
		flex: 3;
	}
	tr th:nth-child(3) {
		flex: 2;
	}
	tr th:nth-child(4) {
		flex: 2;
	}

	//하트랑 댓글 색상
	span {
		color: var(--main-color);
		font-weight: 800;
		font-size: 30px;
	}

	.memberModalOpen {
		border: 0;
		outline: 0;
		background-color: transparent;
	}
	// 게시글 없는 경우
	.empty {
		text-align: center;
		color: #b3b3b3;
		padding: 154px 0px;
	}

	// 반응형
	.bottom {
		display: none;
	}

	.titleWraper {
		display: flex;
		font-size: var(--sub-title);
		font-weight: 800;
		align-items: center;
		> * {
			margin: 10px 0px 10px 40px;
		}
	}
	.titleWraper:hover {
		transform: translateY(-5px);
		color: var(--main-color);
	}

	img {
		border-radius: 50%;
	}
	@media (max-width: 768px) {
		.none {
			display: none;
		}
		tr {
			flex-direction: column;
		}
		.title {
			text-align: left;
		}
		.bottom {
			color: #b3b3b3;
			margin-top: 10px;
			display: flex;
			justify-content: right;
			margin-left: auto;
			margin-right: 20px;
		}
		.bottom th {
			flex: 0 1 auto !important;
			margin-left: 15px;
		}
		.titleWraper {
			> * {
				margin: 10px 0px 10px 20px;
			}
		}
	}
`;

const Line = styled.div`
	height: 1px;
	width: 95%;
	background-color: #d9d9d9;
	margin-left: auto;
	margin-right: auto;
`;

export default CommunityList;

import styled from 'styled-components';

function CommunityList({ totalPage }) {
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
			{totalPage < 0 ? (
				<div className="empty">게시물이 없습니다.</div>
			) : (
				<tbody>
					{Array(20)
						.fill(1)
						.map((el) => (
							<tr key={el}>
								<th
									title="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa [5]"
									className="title"
								>
									aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
									<span>[5]</span>
								</th>
								<th className="none">김땡땡</th>
								<th className="none">2023.05.05</th>
								<th className="none">1000</th>
								<div className="bottom">
									<th>김땡땡</th>
									<th>23.05.05</th>
									<th>
										<span>♥</span> 1000
									</th>
								</div>
							</tr>
						))}
				</tbody>
			)}
		</Table>
	);
}

const Table = styled.table`
	width: 100%;
	max-width: 1024px;
	font-size: var(--base);
	table-layout: fixed;

	// 테이블 항목
	thead {
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		font-weight: 800;
	}

	// 기본뷰 테이블 열 비율
	tr {
		display: flex;
		padding: 15px 0px;
	}

	tr th:nth-child(1) {
		flex: 7;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	tr th:nth-child(2) {
		flex: 2;
	}
	tr th:nth-child(3) {
		flex: 2;
	}
	tr th:nth-child(4) {
		flex: 1;
	}

	// 데이블 행 커서 및 밑줄
	tbody tr {
		border-bottom: 1px solid #d9d9d9;
		cursor: pointer;
	}

	// 테이블 행 hover
	tbody tr:hover {
		color: #575757;
	}

	//하트랑 댓글 색상
	span {
		color: var(--main-color);
	}

	// 게시글 없는 경우
	.empty {
		text-align: center;
		color: #b3b3b3;
		padding: 70px;
		border-bottom: 1px solid #d9d9d9;
	}

	// 반응형
	.bottom {
		display: none;
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
		}
		.bottom th {
			flex: 0 1 auto !important;
			margin-left: 15px;
		}
	}
`;

export default CommunityList;

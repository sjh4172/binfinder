import styled from 'styled-components';
import { useState } from 'react';

const Table = styled.table`
	width: 100%;
	max-width: 1024px;
	font-size: var(--base);
	table-layout: fixed;
	thead {
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		font-weight: 800;
	}
	tr {
		display: flex;
		padding: 8px 0px;
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

	tbody tr {
		border-bottom: 1px solid #d9d9d9;
		cursor: pointer;
	}

	tbody tr:hover {
		color: #575757;
	}

	span {
		color: var(--main-color);
	}
	div {
		text-align: center;
		color: #b3b3b3;
		padding: 70px;
		border-bottom: 1px solid #d9d9d9;
	}
`;

function CommunityList() {
	const [totlaPage, setTotlaPage] = useState(1);
	return (
		<Table>
			<thead>
				<tr>
					<th>제목</th>
					<th>작성자</th>
					<th>작성일</th>
					<th>좋아요</th>
				</tr>
			</thead>
			{totlaPage < 1 ? (
				<div>게시물이 없습니다.</div>
			) : (
				<tbody>
					{Array(10)
						.fill(1)
						.map((el) => (
							<tr key={el}>
								<th title="게시글 목록 제목게시글 목록 제목게시글 목록 제목[5]">
									게시글 목록 제목게시글 목록 제목게시글 목록 제목
									<span>[5]</span>
								</th>
								<th>김땡땡</th>
								<th>2023.05.05</th>
								<th>1000</th>
							</tr>
						))}
				</tbody>
			)}
		</Table>
	);
}

export default CommunityList;

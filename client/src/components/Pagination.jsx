import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import styled from 'styled-components';
import { useEffect } from 'react';

function Pagination({
	currentPage,
	setCurrentPage,
	totalPage,
	setSearchParams,
}) {
	// 페이지 표시할 첫 숫자
	const startPage = currentPage - (currentPage % 10);
	// 표시할 페이지의 수(기본10개이나 마지막은 남은 페이지만큼만)
	const endPage = startPage + 10 > totalPage ? totalPage % 10 : 10;
	// 표시할 페이지들
	const pages = Array.from({ length: endPage }, (_, i) => startPage + i);

	// 현재페이지 쿼리 변경
	useEffect(() => {
		setSearchParams({ page: currentPage });
	}, [currentPage]);

	return (
		<PagesContainer>
			<Button
				disabled={currentPage === 0}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				{currentPage !== 0 && <MdNavigateBefore className="icon" />}
			</Button>
			{pages.map((el) => (
				<Button
					key={el}
					active={el === currentPage}
					onClick={() => setCurrentPage(el)}
				>
					{el + 1}
				</Button>
			))}
			<Button
				disabled={currentPage === totalPage - 1}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				{currentPage !== totalPage - 1 && <MdNavigateNext className="icon" />}
			</Button>
		</PagesContainer>
	);
}

const PagesContainer = styled.div`
	display: flex;
	margin: 30px 0px 20px 0px;
	justify-content: center;
`;

const Button = styled.button`
	background-color: ${(props) => (props.active ? '#37A0DB' : 'white')};
	border: none;
	font-size: var(--base);
	width: 30px;
	height: 30px;
	color: ${(props) => (props.active ? 'white' : 'black')};
	border-radius: 50%;

	:hover {
		color: ${(props) => (props.active ? 'white' : '#37A0DB')};
	}

	.icon {
		width: 30px;
		height: 30px;
		padding: 5px 0px;
	}
	@media (max-width: 400px) {
		font-size: var(--small);
		width: 20px;
		height: 20px;
	}
`;

export default Pagination;

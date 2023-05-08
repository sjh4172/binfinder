import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	margin: 60px 0px;
	justify-content: center;
`;

const Button = styled.button`
	background-color: ${(props) => (props.active ? '#37A0DB' : 'white')};
	border: none;
	font-size: var(--base);
	width: 30px;
	height: 30px;
	color: ${(props) => (props.active ? 'white' : 'black')};

	:hover {
		color: ${(props) => (props.active ? 'white' : '#37A0DB')};
	}

	.icon {
		width: 30px;
		height: 30px;
		padding: 5px 0px;
	}
`;

function Pagination({ currentPage, setCurrentPage, totalPage }) {
	const startPage = currentPage - (currentPage % 10);
	const endPage = startPage + 10 > totalPage ? totalPage % 10 : 10;
	const pages = Array.from({ length: endPage }, (_, i) => startPage + i);

	return (
		<Container>
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
		</Container>
	);
}

export default Pagination;

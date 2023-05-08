import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import styled from 'styled-components';
import { useState } from 'react';

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

function Pagination() {
	// 임시 기능 구현 시 page에서 데이터 받아서 내려주기
	const [currentPage, setCurrentPage] = useState(1);
	const totalPage = 10;

	return (
		<Container>
			<Button
				disabled={currentPage === 1}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				{currentPage === 1 ? null : <MdNavigateBefore className="icon" />}
			</Button>
			{Array.from({ length: 10 }, (v, i) => i + 1).map((el) => (
				<Button
					key={el}
					active={el === currentPage}
					onClick={() => setCurrentPage(el)}
				>
					{el}
				</Button>
			))}
			<Button
				disabled={currentPage === totalPage}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				{currentPage === totalPage ? null : <MdNavigateNext className="icon" />}
			</Button>
		</Container>
	);
}

export default Pagination;

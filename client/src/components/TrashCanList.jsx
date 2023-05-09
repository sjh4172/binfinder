import { useState } from 'react';
import styled from 'styled-components';
import TrashCanModal from './TrashCanModal';

const ListWapper = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 80px;
	left: 0;
	bottom: 0;
	width: 300px;
	background-color: #ffffff;
	.distanceText {
		border-bottom: 0.5px solid gray;
		height: 2.7em;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 20px;
	}
	@media (max-width: 768px) {
		top: calc(100% - 300px);
	}
`;
const List = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ListItem = styled.li`
	height: 40px;
	width: 240px;
	padding: 10px 0;
	margin: 10px 0;
	font-size: var(--base);
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 0.5px solid gray;
`;
const Rank = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: skyblue;
	color: white;
	border-radius: 50%;
`;
const Name = styled.div`
	margin-left: 10px;
	flex-grow: 2;
`;
const Distance = styled.div`
	flex-grow: 1;
	color: skyblue;
`;

function NearbyTrashCanList() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	return (
		<ListWapper>
			<div className="distanceText">
				<button type="button" onClick={handleOpenModal}>
					ex)쓰레기상세페이지
				</button>
				거리순
			</div>
			<List>
				<ListItem>
					<Rank>1</Rank>
					<Name>휘경동 쓰레기통</Name>
					<Distance>100m</Distance>
				</ListItem>
				<ListItem>
					<Rank>2</Rank>
					<Name>자양동 쓰레기통</Name>
					<Distance>150m</Distance>
				</ListItem>
				<ListItem>
					<Rank>3</Rank>
					<Name>용두동 쓰레기통</Name>
					<Distance>200m</Distance>
				</ListItem>
			</List>
			{isModalOpen && <TrashCanModal onClose={handleCloseModal} />}
		</ListWapper>
	);
}
export default NearbyTrashCanList;

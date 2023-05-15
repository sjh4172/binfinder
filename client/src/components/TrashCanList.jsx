import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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
	const [trashCans, setTrashCans] = useState([]);
	const [currentPosition, setCurrentPosition] = useState(null);
	// 현재 위치 정보 가져오기
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCurrentPosition(position.coords);
			},
			(error) => {
				console.error(error);
			},
		);
	}, []);

	// 쓰레기통 데이터를 가져오는 함수
	const fetchTrashCans = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:4001/trashCan');
			const sortedTrashCans = response.data
				.map((trashCan) => {
					if (!currentPosition) return { ...trashCan, distance: null };
					// 현재 위치와 쓰레기통의 거리 계산
					const distance =
						Math.sqrt(
							(currentPosition.latitude - trashCan.Latitude) ** 2 +
								(currentPosition.longitude - trashCan.Longitude) ** 2,
						) * 100000;
					return { ...trashCan, distance };
				})
				.sort((a, b) => {
					// 거리순으로 정렬
					return a.distance - b.distance;
				});
			setTrashCans(sortedTrashCans);
		} catch (error) {
			console.error(error);
		}
	}, [currentPosition]);

	useEffect(() => {
		if (currentPosition) {
			fetchTrashCans();
		}
	}, [currentPosition, fetchTrashCans]);

	return (
		<ListWapper>
			<List>
				{trashCans.map((trashCan, index) => (
					<ListItem key={trashCan.id}>
						<Rank>{index + 1}</Rank>
						<Name>{trashCan.설치위치}</Name>
						<Distance>
							{trashCan.distance ? `${trashCan.distance.toFixed(0)}m` : '-'}
						</Distance>
					</ListItem>
				))}
			</List>
		</ListWapper>
	);
}
export default NearbyTrashCanList;

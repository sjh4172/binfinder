/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
// import { useEffect, useState } from 'react';
// import { useGesture } from 'react-use-gesture';
import Map from '../components/map';
import NearbyTrashCanList from '../components/TrashCanList';

function MapPage() {
	return (
		<MapPageWrapper>
			<ScrollableTrashCanList>
				<NearbyTrashCanList />
			</ScrollableTrashCanList>
			<Map />
		</MapPageWrapper>
	);
}

const MapPageWrapper = styled.div`
	margin-top: var(--header-hight);
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column-reverse;
		margin-top: var(--Mheader-hight);
	}
`;

const ScrollableTrashCanList = styled.div`
	@media (max-width: 768px) {
		overflow-y: scroll;
		max-height: 30vh; /* 원하는 높이 설정 */
	}
`;
export default MapPage;

// import styled from 'styled-components';
import styled from 'styled-components';
import Map from '../components/Map';
import NearbyTrashCanList from '../components/TrashCanList';

function MapPage() {
	return (
		<MapPageWrapper>
			<NearbyTrashCanList />
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

export default MapPage;

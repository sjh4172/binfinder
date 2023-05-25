import React from 'react';
import styled from 'styled-components';
import Slider from '../components/Recycleslider';

function Recycle() {
	return (
		<BackgroundColor>
			<Slider />
		</BackgroundColor>
	);
}
const BackgroundColor = styled.div`
	margin-bottom: 30px;
`;

export default Recycle;

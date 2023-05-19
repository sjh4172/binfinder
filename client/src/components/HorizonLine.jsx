import React from 'react';
import styled from 'styled-components';

function HorizontalLine({ text }) {
	return (
		<HorizonLineContainer>
			<Horizontal />
			<Line>{text}</Line>
			<Horizontal />
		</HorizonLineContainer>
	);
}

const HorizonLineContainer = styled.div`
	width: 440px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	@media (max-width: 768px) {
		width: 220px;
		height: 40px;
	}
`;
const Horizontal = styled.div`
	width: 200px;
	border-bottom: 1px solid #d9d9d9;
	line-height: 0.1em;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 87.5px;
	}
`;
const Line = styled.div`
	width: 100px;
	padding: 0 20px;
	font-size: 17px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #d9d9d9;
	@media (max-width: 768px) {
		font-size: 14px;
	}
`;
export default HorizontalLine;

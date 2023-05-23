import React from 'react';
import styled from 'styled-components';
import AboutComponent1 from '../components/About/About1';
import AboutComponent2 from '../components/About/About2';
import AboutComponent3 from '../components/About/About3';
import AboutComponent4 from '../components/About/About4';

function About() {
	return (
		<StyledBox>
			<div className="container">
				<div>
					<AboutComponent1 />
				</div>
				<div>
					<AboutComponent2 />
				</div>
				<div>
					<AboutComponent3 />
				</div>
				<div>
					<AboutComponent4 />
				</div>
			</div>
		</StyledBox>
	);
}

const StyledBox = styled.div`
	background-image: linear-gradient(
		-225deg,
		#22e1ff 0%,
		#1d8fe1 48%,
		#625eb1 100%
	);
	.container {
		scroll-behavior: smooth;
		height: 100vh;
		scroll-snap-type: y mandatory;
		scroll-padding-top: 10px;
		overflow-y: scroll;
	}
	.container::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
	.container > div {
		scroll-snap-align: start;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
export default About;

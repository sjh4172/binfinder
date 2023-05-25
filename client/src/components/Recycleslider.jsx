/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

export default function Slider() {
	return (
		<SlideContainer>
			<Carousel swipeable dynamicHeight={false}>
				<Slide>
					<img
						src={`${process.env.PUBLIC_URL}/assets/RecycleGuide1.png`}
						alt="Slide 1"
					/>
				</Slide>
				<Slide>
					<img
						src={`${process.env.PUBLIC_URL}/assets/RecycleGuide2.png`}
						alt="Slide 2"
					/>
				</Slide>
				<Slide>
					<img
						src={`${process.env.PUBLIC_URL}/assets/RecycleGuide3.png`}
						alt="Slide 3"
					/>
				</Slide>
				<Slide>
					<img
						src={`${process.env.PUBLIC_URL}/assets/RecycleGuide4.png`}
						alt="Slide 4"
					/>
				</Slide>
				<Slide>
					<img
						src={`${process.env.PUBLIC_URL}/assets/RecycleGuide5.png`}
						alt="Slide 5"
					/>
				</Slide>
			</Carousel>
		</SlideContainer>
	);
}

const SlideContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70vh;
	margin: 10% 25% 40% 25%;
	@media (max-width: 768px) {
		margin: 100px 50px;
		height: 60vh;
		max-width: 100%;
	}
`;

const Slide = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 100%;
	height: auto;
	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

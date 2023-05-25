/* eslint-disable no-undef */
import styled, { keyframes } from 'styled-components';
import MOBILE_MAX_WIDTH from '../mediaQuery';

const moveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(var(--font-size) * -1));
  }
`;
const Button = styled.div`
	--text: gray;
	--font-size: 16px;
	--duration: 0.44s;
	--move-hover: -4px;
	--font-shadow: var(--font-size);
	padding: 16px 32px;
	font-family: 'GFS Neohellenic';
	font-weight: 500;
	line-height: var(--font-size);
	border-radius: 24px;
	display: block;
	outline: none;
	text-decoration: none;
	font-size: var(--font-size);
	letter-spacing: 0.5px;
	border: 1px solid gray;
	background: var(--background);
	color: var(--text);
	box-shadow: var(--shadow);
	transform: translateY(var(--y)) translateZ(0);
	transition: transform var(--duration) ease, box-shadow var(--duration) ease;

	div {
		display: flex;
		overflow: hidden;
		text-shadow: 0 var(--font-shadow) 0 var(--text);
		span {
			display: block;
			backface-visibility: hidden;
			font-style: normal;
			transition: transform var(--duration) ease;
			transform: translateY(var(--m)) translateZ(0);
			$i: 1;
			${Array.from(
				{ length: 12 },
				(_, i) => `
        &:nth-child(${i + 1}) {
          transition-delay: ${i / 20}s;
        }
      `,
			)}
			animation: ${moveAnimation} var(--duration) ease;
		}
	}

	&:hover {
		background: #e7e7e7;
		--y: var(--move-hover);
		--shadow: var(--shadow-hover);
		span {
			color: black;
			--m: calc(var(--font-size) * -1);
			transform: translateY(calc(var(--font-size) * -1));
		}
	}

	&.reverse {
		color: black;
		--font-shadow: calc(var(--font-size) * -1);
		&:hover {
			span {
				color: black;
				--m: calc(var(--font-size));
			}
		}
	}
	&.active {
		color: #37a0db;
	}
`;

const WarningButton = styled(Button)`
	color: var(--sub1-color);
	border-color: var(--sub1-color);
	&:hover {
		background-color: #2048da68;
	}
`;

const HeaderButton = styled(Button)`
	@media (max-width: ${MOBILE_MAX_WIDTH}px) {
		width: 10px;
		height: 10px;
		div {
			span {
				font-size: 10px; /* 모바일에서 작은 글씨 크기로 설정 */
			}
		}
	}
`;

export { Button, WarningButton, HeaderButton };

import styled from 'styled-components';

const Button = styled.button`
	border: none;
	width: 100px;
	height: 50px;
	padding: 3px;
	background-color: var(--main-color);
	color: var(--text-white-color);
	box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25),
		inset 0px 2px 0px rgba(255, 255, 255, 0.25);
	border-radius: 10px;
	font-size: var(--sub-title);
	font-weight: 700;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: var(--sub3-color);
		color: var(--text-black-color);
		box-shadow: 0px 2px 0px rgba(255, 255, 255, 0.25),
			inset 0px 2px 0px rgba(0, 0, 0, 0.25);
	}
`;

const WarningButton = styled(Button)`
	background-color: var(--sub1-color);
	&:hover {
		background-color: var(--sub2-color);
	}
`;

const MButton = styled(Button)`
	width: 60px;
	height: 30px;
	font-size: var(--base);
	border-radius: 5px;
`;

const MWarningButton = styled(WarningButton)`
	width: 60px;
	height: 30px;
	font-size: var(--base);
	border-radius: 5px;
`;

const MHeaderButton = styled(MButton)`
	width: 40px;
	height: 40px;
`;

export { Button, MButton, WarningButton, MWarningButton, MHeaderButton };

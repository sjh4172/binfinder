import styled from 'styled-components';

export default function Prepare() {
	return (
		<StyledMain>
			<StyledP>서비스 준비중입니다. 😅</StyledP>
		</StyledMain>
	);
}
const StyledMain = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;
const StyledP = styled.p`
	font-size: var(--title);
	font-weight: 600;
`;

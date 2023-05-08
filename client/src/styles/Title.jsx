import styled from 'styled-components';

const Title = styled.h1`
	font-size: var(--title);
	color: var(--main-color);
	font-weight: 800;
	@media (max-width: 768px) {
		font-size: var(--sub-title);
	}
`;

export default Title;

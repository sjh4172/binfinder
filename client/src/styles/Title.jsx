import styled from 'styled-components';

const Title = styled.h1`
	font-size: 40px;
	color: var(--main-color);
	font-weight: 800;
	margin-bottom: 50px;
	font-family: 'GFS Neohellenic', sans-serif;

	@media (max-width: 768px) {
		font-size: 30px;
		margin-bottom: 20px;
	}
`;

export default Title;

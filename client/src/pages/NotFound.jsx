import styled from 'styled-components';
import Title from '../styles/Title';

export default function NotFound() {
	return (
		<StyledMain>
			<ErrorTitle>404</ErrorTitle>
			<StyledP>Page Not Found🥲</StyledP>
			<StyledP fontSize="25px">요청한 페이지를 찾을 수 없습니다.</StyledP>
		</StyledMain>
	);
}
const StyledMain = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;
const StyledP = styled.p`
	font-size: ${(props) => (props.fontSize ? props.fontSize : '30px')};
	padding: 10px;
	font-weight: 600;
`;

const ErrorTitle = styled(Title)`
	font-size: 100px;
	padding: 20px;
`;

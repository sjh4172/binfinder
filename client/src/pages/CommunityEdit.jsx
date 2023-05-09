import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CommunityEditor from '../components/CommunityEditor';
import { Button, WarningButton } from '../styles/Buttons';

const EditPage = styled.div`
	max-width: 1024px;
	width: 80vw;
	margin-left: auto;
	margin-right: auto;

	.flex {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	@media (max-width: 768px) {
		.bt {
			width: 80px;
		}
	}
`;

function CommunityEdit() {
	const navigate = useNavigate();
	return (
		<EditPage>
			<CommunityEditor />
			<div className="flex">
				<Button className="bt" onClick={() => navigate(-1)}>
					작성 취소
				</Button>
				<WarningButton className="bt">작성 완료</WarningButton>
			</div>
		</EditPage>
	);
}

export default CommunityEdit;

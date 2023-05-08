import styled from 'styled-components';
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
`;

function CommunityEdit() {
	return (
		<EditPage>
			<CommunityEditor />
			<div className="flex">
				<Button>작성 취소</Button>
				<WarningButton>작성 완료</WarningButton>
			</div>
		</EditPage>
	);
}

export default CommunityEdit;

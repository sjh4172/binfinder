import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CommunityEditor from '../components/CommunityEditor';
import { Button, WarningButton } from '../styles/Buttons';
import { postCommunity } from '../api/CommunityAPI';
import useInput from '../hooks/useInput';

const EditPage = styled.div`
	max-width: 1024px;
	width: 80vw;
	margin-left: auto;
	margin-right: auto;
	margin-top: var(--header-hight);
	padding: 50px 0px 100px 0px;

	.flex {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.bt {
		font-size: var(--base);
		height: 35px;
	}

	@media (max-width: 768px) {
		padding-top: 30px;
		.bt {
			width: 80px;
		}
	}
`;

function CommunityEdit() {
	const navigate = useNavigate();
	const [titleBind] = useInput();
	const [contentBind] = useInput();

	// json서버 테스트용 실제서버는 url이랑 data 변경해야함
	function writePost(method) {
		if (method === 'post') {
			postCommunity('/write', {
				p_title: titleBind.value,
				P_content: contentBind.value,
				m_id: '작성자아이디',
			});
		}
		if (method === 'patch') {
			postCommunity(
				'/write/1',
				{
					p_title: titleBind.value,
					P_content: contentBind.value,
				},
				method,
			);
		}
		// 작성, 수정한 게시글로 이동
		// navigate('/post/read/{postid})
	}
	return (
		<EditPage>
			<CommunityEditor contentBind={contentBind} titleBind={titleBind} />
			<div className="flex">
				<Button className="bt" onClick={() => navigate(-1)}>
					작성 취소
				</Button>
				<WarningButton className="bt" onClick={() => writePost('patch')}>
					작성 완료
				</WarningButton>
			</div>
		</EditPage>
	);
}

export default CommunityEdit;

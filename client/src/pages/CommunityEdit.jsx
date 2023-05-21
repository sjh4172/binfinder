import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommunityEditor from '../components/CommunityEditor';
import { Button, WarningButton } from '../styles/Buttons';
import { postCommunity } from '../api/communityAPI';
import useInput from '../hooks/useInput';
import { URL_POST } from '../routesURL';
import Modal from '../components/Modal';

function CommunityEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const [titleBind] = useInput(location.state && location.state.b_title);
	const [contentBind] = useInput(location.state && location.state.b_content);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [message, setMessage] = useState('');
	const writePost = () => {
		if (!titleBind.value) {
			setMessage('제목을 작성해주세요.');
			setIsModalOpen(true);
		} else if (!contentBind.value) {
			setMessage('내용을 작성해주세요.');
			setIsModalOpen(true);
		} else if (location.state) {
			postCommunity(
				`/boards/${location.state.id}`,
				{
					b_title: titleBind.value,
					b_content: contentBind.value,
				},
				'patch',
			);
			navigate(`${URL_POST}/${location.state.id}`);
		} else {
			postCommunity('/boards', {
				b_title: titleBind.value,
				b_content: contentBind.value,
			});
			navigate(URL_POST);
			// TODO: 응답에서 postid 받으면 navigate 작성글로 변경
		}
	};
	const handleConfirm = () => {
		setIsModalOpen(false);
	};

	return (
		<EditPageContainer>
			<CommunityEditor contentBind={contentBind} titleBind={titleBind} />
			<div className="flex">
				<Button type="button" className="bt" onClick={() => navigate(-1)}>
					작성 취소
				</Button>
				<WarningButton className="bt" onClick={() => writePost()}>
					작성 완료
				</WarningButton>
			</div>
			{isModalOpen && (
				<Modal message={message} handleConfirm={handleConfirm} cancel={false} />
			)}
		</EditPageContainer>
	);
}

const EditPageContainer = styled.section`
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

export default CommunityEdit;
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PloggingEditor from '../components/PloggingEditor';
import { Button, WarningButton } from '../styles/Buttons';
import { postCommunity } from '../api/communityAPI';
import useInput from '../hooks/useInput';
import { URL_PLOGGING } from '../routesURL';
import Modal from '../components/Modal';
import Title from '../styles/Title';
import backgroundImg from '../image/communityBG.png';

function PloggingEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const [titleBind] = useInput(location.state && location.state.p_title);
	const [contentBind] = useInput(
		location.state && location.state.p_content,
		true,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [message, setMessage] = useState('');

	const writePost = () => {
		if (!titleBind.value) {
			setMessage('제목을 작성해주세요.');
			setIsModalOpen(true);
		} else if (!contentBind.value || contentBind.value === '<p><br></p>') {
			setMessage('내용을 작성해주세요.');
			setIsModalOpen(true);
		} else if (location.state) {
			postCommunity(
				`/plogs/${location.state.p_id}`,
				{
					p_title: titleBind.value,
					p_content: contentBind.value,
				},
				'patch',
			);
			navigate(`${URL_PLOGGING}/${location.state.p_id}`);
			navigate(0);
		} else {
			postCommunity('/plogs', {
				p_title: titleBind.value,
				p_content: contentBind.value,
			});
			navigate(URL_PLOGGING);
			navigate(0);
			// TODO: 응답에서 postid 받으면 navigate 작성글로 변경
		}
	};
	const handleConfirm = () => {
		setIsModalOpen(false);
	};

	return (
		<EditPageContainer>
			<Title className="cummunityTitle">Plogging</Title>
			<div className="backGround">
				<PloggingEditor contentBind={contentBind} titleBind={titleBind} />
				<div className="flex">
					<Button type="button" className="bt" onClick={() => navigate(-1)}>
						작성 취소
					</Button>
					<WarningButton className="bt" onClick={() => writePost()}>
						작성 완료
					</WarningButton>
				</div>
				{isModalOpen && (
					<Modal
						message={message}
						handleConfirm={handleConfirm}
						cancel={false}
					/>
				)}
			</div>
		</EditPageContainer>
	);
}

const EditPageContainer = styled.section`
	position: relative;
	top: 80px;
	width: 100%;
	padding: 80px;
	margin-bottom: 80px;
	background-image: url(${backgroundImg});
	background-repeat: no-repeat;
	background-size: cover;
	.backGround {
		background-color: white;
		border-radius: 5px;
		max-width: 1000px;
		margin-left: auto;
		margin-right: auto;
		padding: 30px 40px;
	}
	.flex {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.bt {
		font-size: var(--base);
		padding: 15px 30px;
	}

	.cummunityTitle {
		width: 100%;
		text-align: center;
		font-size: 70px;
		color: white;
		text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.25);
		margin-bottom: 80px;
	}

	@media (max-width: 768px) {
		padding: 10px;
		top: 70px;
		.cummunityTitle {
			margin-top: 30px;
			margin-bottom: 10px;
			font-size: 50px;
		}
		.backGround {
			padding: 20px;
		}
		.bt {
			width: 140px;
			text-align: center;
		}
	}
`;

export default PloggingEdit;

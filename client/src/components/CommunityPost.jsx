import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { URL_WRITEPOST } from '../routesURL';
import useDate from '../hooks/useDate';

function CommunityPost({ setIsPModalOpen, data }) {
	const navigate = useNavigate();
	const memberId = useSelector((state) => state.auth.email);

	return (
		<>
			<Detail>
				<div>
					<span>
						{data &&
							`${useDate(data.createdAt)} ${data.createdAt.split('T')[1]}`}
					</span>
					<span>
						댓글 <span className="comment">{data && data.length}</span>
					</span>
				</div>
				{memberId === (data && data.memberId) && (
					<div className="buttonWrapper">
						<button
							type="button"
							onClick={() => navigate(URL_WRITEPOST, { state: { ...data } })}
						>
							수정
						</button>
						<button type="button" onClick={() => setIsPModalOpen(true)}>
							삭제
						</button>
					</div>
				)}
			</Detail>
			<Content>{data && data.b_content}</Content>
		</>
	);
}

const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	color: var(--line-color);
	font-size: var(--small);
	margin-top: 15px;
	span {
		margin-right: 15px;
	}
	.comment,
	.buttonWrapper {
		color: var(--main-color);
		cursor: pointer;
	}
	.buttonWraper :last-child {
		margin-right: 0px;
	}
	button {
		cursor: pointer;
		margin-left: 15px;
		border: 0;
		outline: 0;
		background-color: #fffffff0;
		font-size: var(--small);
		color: var(--main-color);
	}
`;

const Content = styled.p`
	font-size: var(--base);
	padding: 10px 0px;
	text-align: justify;
	line-height: 1.5;
`;

export default CommunityPost;

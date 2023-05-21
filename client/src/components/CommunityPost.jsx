import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { URL_WRITEPOST } from '../routesURL';
import useDate from '../hooks/useDate';

function CommunityPost({ setIsPModalOpen, data }) {
	const navigate = useNavigate();
	const memberId = useSelector((state) => state.auth.memberId);

	return (
		<>
			<PostDetail>
				<div>
					<time>{data && useDate(data.createdAt)[1]}</time>
					<span>
						댓글 <span className="comment">{data && data.comments.length}</span>
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
			</PostDetail>
			{data && (
				<PostContent dangerouslySetInnerHTML={{ __html: data.b_content }} />
			)}
		</>
	);
}

const PostDetail = styled.div`
	display: flex;
	justify-content: space-between;
	color: var(--line-color);
	font-size: var(--small);
	margin-top: 15px;
	span,
	time {
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

const PostContent = styled.p`
	font-size: var(--base);
	padding: 10px 0px;
	text-align: justify;
	line-height: 1.5;
	strong {
		font-weight: 800;
	}
	em {
		font-style: italic;
	}
`;

export default CommunityPost;

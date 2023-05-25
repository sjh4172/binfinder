import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import MyProfile from './MyProfile';
import { postCommunity } from '../api/communityAPI';
import useDate from '../hooks/useDate';

function CommunityComment({ setIsCModalOpen, commentData, setCommentId }) {
	const [textareaBind] = useInput(commentData.plogComment);
	const [isEdit, setIsEdit] = useState(false);
	const textareaRef = useRef(null);
	const memberId = useSelector((state) => state.auth.memberId);
	// TODO: 댓글 구현되면 댓글 작성자 아이디와 memberId 같을 시 수정.삭제 렌더링하기

	// 수정 시 ContentInput에 포커스
	const handleFocus = () => {
		if (textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(
				textareaBind.value.length,
				textareaBind.value.length,
			);
		}
	};

	useEffect(() => {
		if (isEdit) {
			handleFocus();
		}
	}, [isEdit]);

	const editComment = () => {
		postCommunity(
			`/pcomments/${commentData.plogCommentId}`,
			{
				plogComment: textareaBind.value,
			},
			'patch',
		);
		setIsEdit(false);
	};
	return (
		<>
			<MyProfile
				className="porfile"
				username={commentData.username}
				marginNone
			/>
			{isEdit && (
				<ContentTextarea {...textareaBind} ref={textareaRef} autoFocus />
			)}
			{isEdit || <Content>{textareaBind.value}</Content>}
			<CommentDitail>
				<time dateTime={commentData.createdAt}>
					{useDate(commentData.createdAt)[1]}
				</time>
				{memberId === commentData.memberId && (
					<ButtonWrapper>
						{isEdit && (
							<button onClick={() => editComment()} type="button">
								수정 완료
							</button>
						)}
						{isEdit || (
							<button onClick={() => setIsEdit(true)} type="button">
								수정
							</button>
						)}
						<button
							type="button"
							onClick={() => {
								setIsCModalOpen(true);
								setCommentId(commentData.plogCommentId);
							}}
						>
							삭제
						</button>
					</ButtonWrapper>
				)}
			</CommentDitail>
			<Line />
		</>
	);
}

const Content = styled.p`
	font-size: var(--base);
	padding: 15px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
`;

const ContentTextarea = styled.textarea`
	font-size: var(--base);
	padding: 10px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
	margin: 15px 0px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: right;
	color: var(--main-color);
	font-size: var(--small);

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

const Line = styled.div`
	height: 1px;
	background-color: var(--line-color);
	margin: 15px 0px;
`;

const CommentDitail = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: var(--small);
	color: var(--line-color);
`;

export default CommunityComment;

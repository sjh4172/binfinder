import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import useInput from '../hooks/useInput';
import MyProfile from './MyProfile';

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

function CommunityComment({ setIsCModalOpen }) {
	// 초기 값 props로 받으면 useInput에 넣기
	const [textareaBind] = useInput('555');
	const [isEdit, setIsEdit] = useState(false);
	const textareaRef = useRef(null);

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

	// 댓글 수정, 삭제 함수 작성해야함
	return (
		<>
			<MyProfile className="porfile" />
			{isEdit ? (
				<ContentTextarea {...textareaBind} ref={textareaRef} autofocus />
			) : (
				<Content>{textareaBind.value}</Content>
			)}
			<ButtonWrapper>
				{isEdit ? (
					<button onClick={() => setIsEdit(false)} type="button">
						수정 완료
					</button>
				) : (
					<button onClick={() => setIsEdit(true)} type="button">
						수정
					</button>
				)}
				<button type="button" onClick={() => setIsCModalOpen(true)}>
					삭제
				</button>
			</ButtonWrapper>
			<Line />
		</>
	);
}

export default CommunityComment;

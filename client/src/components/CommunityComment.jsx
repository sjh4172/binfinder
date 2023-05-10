import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import useInput from '../hooks/useInput';
import MyProfile from './MyProfile';

const Content = styled.div`
	font-size: var(--base);
	padding: 15px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
`;

const ContentInput = styled.textarea`
	font-size: var(--base);
	padding: 10px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
	margin: 15px 0px;
`;

const Edit = styled.div`
	display: flex;
	justify-content: right;
	color: var(--main-color);
	font-size: var(--small);

	span {
		cursor: pointer;
		margin-left: 15px;
	}
`;

const Line = styled.div`
	height: 1px;
	background-color: var(--line-color);
	margin: 15px 0px;
`;

function CommunityComment() {
	const [bind] = useInput('');
	const [edit, setEdit] = useState(false);
	const ref = useRef(null);

	// 수정 시 ContentInput에 포커스
	const handleFocus = () => {
		if (ref.current) {
			ref.current.focus();
			ref.current.setSelectionRange(bind.value.length, bind.value.length);
		}
	};

	useEffect(() => {
		if (edit) {
			handleFocus();
		}
	}, [edit]);

	return (
		<>
			<MyProfile className="porfile" />
			{edit ? (
				<ContentInput {...bind} ref={ref} autofocus />
			) : (
				<Content>{bind.value}</Content>
			)}
			<Edit>
				{edit ? (
					<span onClick={() => setEdit(false)} role="none">
						수정 완료
					</span>
				) : (
					<span onClick={() => setEdit(true)} role="none">
						수정
					</span>
				)}
				<span>삭제</span>
			</Edit>
			<Line />
		</>
	);
}

export default CommunityComment;

import styled from 'styled-components';

const Content = styled.div`
	font-size: var(--base);
	padding: 10px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
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
	margin: 10px 0px;
`;

function CommunityComment() {
	return (
		<>
			<div>프로필</div>
			<Content>
				댓글 내용내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^*
			</Content>
			<Edit>
				<span>수정</span>
				<span>삭제</span>
			</Edit>
			<Line />
		</>
	);
}

export default CommunityComment;

import styled from 'styled-components';

function CommunityEditor({ contentBind, titleBind }) {
	return (
		<Editor>
			<label htmlFor="title">
				제목 입력
				<input
					id="title"
					placeholder="제목을 입력하세요"
					type="text"
					{...titleBind}
				/>
			</label>
			<label htmlFor="content">
				내용입력
				<textarea
					id="content"
					placeholder="내용을 입력하세요"
					{...contentBind}
				/>
			</label>
		</Editor>
	);
}

const Editor = styled.div`
	display: flex;
	flex-direction: column;
	label {
		font-size: 0px;
	}
	input {
		outline: none;
		border: none;
		margin-bottom: 20px;
		color: var(--main-color);
		font-weight: 800;
		font-size: var(--title);
	}

	input::placeholder {
		color: var(--line-color);
	}
	textarea {
		font-size: var(--large);
		border-color: var(--line-color);
		height: 50vh;
		width: 100%;
		background-color: var(--bg-color);
		resize: none;
		outline: none;
		border-radius: 5px;
		padding: 5px;
	}
	@media (max-width: 768px) {
		input {
			font-size: var(--sub-title);
		}
	}
`;

export default CommunityEditor;

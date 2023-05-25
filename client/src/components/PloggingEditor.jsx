import styled from 'styled-components';
import Editor from './Editor';

function PloggingEditor({ contentBind, titleBind }) {
	return (
		<EditorContainer>
			<label htmlFor="title">
				제목 입력
				<input
					id="title"
					placeholder="제목을 입력하세요"
					type="text"
					{...titleBind}
				/>
			</label>
			<Editor value={contentBind} placeholder="내용을 입력해주세요" />
		</EditorContainer>
	);
}

const EditorContainer = styled.div`
	display: flex;
	flex-direction: column;
	label {
		font-size: 0px;
	}
	input {
		outline: none;
		border: none;
		color: var(--main-color);
		font-weight: 800;
		font-size: var(--title);
		border-bottom: 1px solid var(--line-color);
		margin-bottom: 30px;
		padding-bottom: 15px;
		width: 100%;
	}

	input::placeholder {
		color: var(--line-color);
	}
	@media (max-width: 768px) {
		input {
			font-size: var(--sub-title);
		}
	}
`;

export default PloggingEditor;

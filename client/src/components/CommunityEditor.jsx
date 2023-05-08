import styled from 'styled-components';

const Editor = styled.div`
	display: flex;
	flex-direction: column;

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

function CommunityEditor() {
	return (
		<Editor>
			<input placeholder="제목을 입력하세요" type="text" />
			<textarea placeholder="내용을 입력하세요" />
		</Editor>
	);
}

export default CommunityEditor;

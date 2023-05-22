import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root {
    /* 기본 색상 */
    --main-color: #37A0DB;
    --sub1-color: #2049DA;
    --sub2-color: #79DCF2;
    --sub3-color: #C3EDFF;
    --line-color: #D9D9D9;
    --bg-color:#F1F2F3;
    --text-white-color: #FFFFFF;
    --text-black-color: #000000;
    --footer-color: #383838;
    /* 기본 글자 크기 */
    --title: 29px;
    --sub-title: 19px;
    --large: 17px;
    --base: 15px;
    --small: 13px;
    /* 헤더 높이 */
    --header-hight: 80px;
    --Mheader-hight: 70px;
    }

     *{
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 17px;
        vertical-align: baseline;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    ol, ul{
        list-style: none;
    }
    
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		border: 0;
		padding: 0;

		white-space: nowrap;
		clip-path: inset(100%);
		clip: rect(0 0 0 0);
		overflow: hidden;
	}

    // react-quill
    .ql-snow {
    border-color: var(--line-color) !important;
    }
    .ql-toolbar {
    border-radius: 0.2rem 0.2rem 0 0;
    border-bottom: none !important;
    }
    .ql-container {
    border-radius: 0 0 0.2rem 0.2rem;
    }
    .ql-editor {
    height: 30vh !important;
    min-height: 210px;
    }
    .ql-editor,
    input {
    font-size: var(--base);
    }
    .quill {
        strong {
            font-weight: 800;
        }
        em {
            font-style: italic;
        }
    }
`;

export default GlobalStyles;

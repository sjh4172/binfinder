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

`;

export default GlobalStyles;

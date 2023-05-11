import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	URL_MAP,
	URL_MYPAGE,
	URL_POST,
	URL_PLOGGING,
	URL_NOTICE,
	URL_INTRODUCTION,
} from '../routesURL';

const List = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ListItem = styled.li`
	height: 40px;
	width: 240px;
	padding: 10px 0;
	margin: 10px 0;
	font-size: var(--base);
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	cursor: pointer;
	&:hover {
		border-radius: 10px;
		color: var(--text-white-color);
		background-color: var(--main-color);
	}
`;

const LinkItem = styled.a`
	height: 40px;
	width: 230px;
	text-align: center;
	line-height: 40px;
`;

export default function SidebarList() {
	return (
		<List>
			<ListItem>
				<LinkItem href={URL_INTRODUCTION}>Introduction</LinkItem>
			</ListItem>
			<ListItem>
				<LinkItem href={URL_MAP}>Map</LinkItem>
			</ListItem>
			<ListItem>
				<LinkItem href={URL_POST}>Community</LinkItem>
			</ListItem>
			<ListItem>
				<LinkItem href={URL_PLOGGING}>Plogging</LinkItem>
			</ListItem>
			<ListItem>
				<LinkItem href={URL_NOTICE}>Notice</LinkItem>
			</ListItem>
			<ListItem>
				<LinkItem href={URL_MYPAGE}>My page</LinkItem>
			</ListItem>
		</List>
	);
}

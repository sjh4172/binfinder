import styled from 'styled-components';

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

export default function SidebarList() {
	return (
		<List>
			{/* 각 메뉴에 페이지 링크 연결 */}
			<ListItem>Introduction</ListItem>
			<ListItem>Map</ListItem>
			<ListItem>Community</ListItem>
			<ListItem>Plogging</ListItem>
			<ListItem>Notice</ListItem>
			<ListItem>My page</ListItem>
		</List>
	);
}

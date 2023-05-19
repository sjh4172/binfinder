import styled from 'styled-components';

export default function MyProfile() {
	return (
		// 마이페이지로 링크
		<ProfileWrapper>
			<ProfileImage
				src={`${process.env.PUBLIC_URL}/assets/exprofile.png`}
				alt="Profile"
			/>
			<UserInfoWrapper>
				<UserName>username</UserName>
				<UserEmail>user@example.com</UserEmail>
			</UserInfoWrapper>
		</ProfileWrapper>
	);
}

const ProfileWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-left: 20px;
	gap: 20px;
	cursor: pointer;
`;

const ProfileImage = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
`;

const UserInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const UserName = styled.span`
	font-size: var(--base);
	font-weight: 700;
`;

const UserEmail = styled.span`
	font-size: var(--base);
`;

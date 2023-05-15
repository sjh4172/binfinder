import styled from 'styled-components';

function Mypage() {
	return (
		<MyPageContainer>
			<MyPageTitle>회원정보</MyPageTitle>
			<MyPageForm>
				<ProfileContainer>
					<Logo>
						<img
							src={`${process.env.PUBLIC_URL}/assets/Ellipse.png`}
							alt="Ellipse.png"
						/>
					</Logo>
					<InputContainer>
						<Input>닉네임: </Input>
						<Input>이메일: </Input>
						<Input2>
							프로필 수정
							<Icon>
								<img
									src={`${process.env.PUBLIC_URL}/assets/mdi_pencil.png`}
									alt="pencil.png"
								/>
							</Icon>
						</Input2>
					</InputContainer>
				</ProfileContainer>
				<ListContainer>
					<PostList>내가 작성한 게시글</PostList>
					<List>
						내가 작성한 게시글내가 작성한 게시글내가 작성한 게시글내가 작성한
						게시글
					</List>
					<List>sss</List>
					<List>sss</List>
					<CommentList>내가 작성한 댓글</CommentList>
					<List>sss</List>
					<List>sss</List>
					<List>sss</List>
					<RequestList>내가 요청한 위치 요청</RequestList>
					<List>sss</List>
					<List>sss</List>
					<List>sss</List>
				</ListContainer>
			</MyPageForm>
		</MyPageContainer>
	);
}
/* 마이페이지 전체 컨테이너 */
const MyPageContainer = styled.div`
	max-width: 1024px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	font-weight: 700;
	margin-left: auto;
	margin-right: auto;
	margin-top: var(--header-hight);
	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 393px;
		height: 782px;
		font-size: 14px;
		font-weight: 700;
	}
`;
/* 마이페이지 타이틀 */
const MyPageTitle = styled.div`
	width: 600px;
	height: 100px;
	font-size: 29px;
	font-weight: 700;
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		width: 300px;
		height: 40px;
		font-size: 26px;
		font-weight: 700;
	}
`;
/* 마이페이지 폼 */
const MyPageForm = styled.div`
	width: 600px;
	height: 800px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid #d9d9d9;

	@media (max-width: 768px) {
		width: 300px;
		height: 600px;
	}
`;
/* 마이페이지 프로플 전체 컨테이너 */
const ProfileContainer = styled.div`
	width: 440px;
	height: 135px;
	display: flex;
	float: left;
	@media (max-width: 768px) {
		width: 220px;
		height: 108px;
	}
`;
/* 마이페이지 프로플 로고 */
const Logo = styled.div`
	> img {
		width: 120px;
		height: 120px;
	}
	@media (max-width: 768px) {
		> img {
			width: 80px;
			height: 80px;
		}
	}
`;
/* 마이페이지 프로필 수정 아이콘 */
const Icon = styled.div`
	> img {
		width: 24px;
		height: 24px;
		display: flex;
	}
	@media (max-width: 768px) {
		> img {
			width: 9px;
			height: 9px;
		}
	}
`;
/* 마이페이지 인풋 전체 컨테이너 */
const InputContainer = styled.div`
	width: 220px;
	height: 135px;
	margin-left: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 102px;
		margin-left: 8px;
	}
`;
/* 마이페이지 인풋  */
const Input = styled.div`
	width: 220px;
	height: 45px;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		width: 140px;
		height: 34px;
		font-size: 14px;
	}
`;
/* 마이페이지 인풋2(프로필수정 부분)  */
const Input2 = styled.div`
	width: 220px;
	height: 45px;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 768px) {
		width: 140px;
		height: 34px;
		font-size: 14px;
	}
`;
/* 마이페이지 리스트 전체 컨테이너  */
const ListContainer = styled.div`
	width: 440px;
	height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 400px;
	}
`;
/* 마이페이지 게시글 리스트 */
const PostList = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #d9d9d9;
	@media (max-width: 768px) {
		width: 220px;
		height: 34px;
	}
`;
/* 마이페이지 댓글 리스트 */
const CommentList = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #d9d9d9;
	@media (max-width: 768px) {
		width: 220px;
		height: 34px;
	}
`;
/* 마이페이지 위치 요청 리스트 */
const RequestList = styled.div`
	width: 440px;
	height: 45px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #d9d9d9;
	@media (max-width: 768px) {
		width: 220px;
		height: 34px;
	}
`;
/* 마이페이지 리스트 컨테이너 */
const List = styled.div`
	width: 440px;
	height: 48px;
	word-break: normal;
	@media (max-width: 768px) {
		width: 220px;
		height: 10px;
	}
`;
export default Mypage;

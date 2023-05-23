/* eslint-disable no-console */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { KEY_ACCESS_TOKEN } from '../Constant';

function UserInfo() {
	const [postList, setPostList] = useState([]);
	const [commentList, setCommentList] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	const { memberId } = useSelector((state) => state.auth);
	console.log(memberId);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// 사용자 정보 가져오기
				const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);
				axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
				const userResponse = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/members/${memberId}`,
				);
				setUsername(userResponse.data.username);
				setEmail(userResponse.data.email);

				// 사용자가 작성한 게시글 가져오기
				const postResponse = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/boards?memberId=${memberId}`,
				);
				const sortedPosts = postResponse.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				const latestPosts = sortedPosts.slice(0, 5);
				setPostList(latestPosts);

				// 사용자가 작성한 댓글 가져오기
				const commentResponse = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/comments?memberId=${memberId}`,
				);
				const sortedComments = commentResponse.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				const latestComments = sortedComments.slice(0, 5);
				setCommentList(latestComments);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, [memberId]);

	return (
		<MyPageContainer>
			<MyPageTitle>회원정보</MyPageTitle>
			<MyPageForm>
				<ProfileContainer>
					<Logo>
						<img
							src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${username}&scale=90&size=60&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc&backgroundColor=0a5b83,69d2e7,f1f4dc`}
							alt="Profile"
						/>
					</Logo>
					<DetailContainer>
						<Detail>닉네임: {username}</Detail>
						<Detail>이메일: {email}</Detail>
						<EditUserInfoButton>
							프로필 수정
							<Icon to="/editmypage">
								<img
									src={`${process.env.PUBLIC_URL}/assets/mdi_pencil.png`}
									alt="editprofile button.png"
								/>
							</Icon>
						</EditUserInfoButton>
					</DetailContainer>
				</ProfileContainer>
				<ListContainer>
					<PostListContainer>
						<PostList>내가 최근 작성한 게시글</PostList>
						{postList.map((post) => (
							<List key={post.b_id}>
								<Link to={`/boards/${post.b_id}`}>{post.b_title}</Link>
							</List>
						))}
					</PostListContainer>
					<CommentListContainer>
						<CommentList>내가 최근 작성한 댓글</CommentList>
						{commentList.map((comment) => (
							<List key={comment.c_id}>
								<Link to={`/comments/${comment.c_id}`}>
									{comment.c_content}
								</Link>
							</List>
						))}
					</CommentListContainer>
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
	margin-bottom: 40px;
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
		height: 540px;
	}
`;
/* 마이페이지 프로필 전체 컨테이너 */
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
/* 마이페이지 프로필 로고 */
const Logo = styled.div`
	> img {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}
	@media (max-width: 768px) {
		> img {
			width: 80px;
			height: 80px;
		}
	}
`;
/* 마이페이지 프로필 수정 아이콘 */
const Icon = styled(Link)`
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
const DetailContainer = styled.div`
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
const Detail = styled.div`
	width: 220px;
	height: 45px;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	font-size: 14px;
	@media (max-width: 768px) {
		width: 140px;
		height: 34px;
		font-size: 10px;
	}
`;
/* 마이페이지 인풋2(프로필수정 부분)  */
const EditUserInfoButton = styled.div`
	width: 220px;
	height: 45px;
	border-bottom: 1px solid #d9d9d9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	@media (max-width: 768px) {
		width: 140px;
		height: 34px;
		font-size: 10px;
	}
`;
/* 마이페이지 리스트 전체 컨테이너  */
const ListContainer = styled.div`
	width: 440px;
	height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 400px;
	}
`;
const PostListContainer = styled.div`
	width: 440px;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 220px;
		height: 200px;
	}
`;
/* 마이페이지 게시글 리스트 */
const PostList = styled.div`
	width: 440px;
	height: 25px;
	display: flex;
	border-bottom: 1px solid #d9d9d9;

	@media (max-width: 768px) {
		width: 220px;
		height: 20px;
		font-size: 14px;
	}
`;
const CommentListContainer = styled.div`
	width: 440px;
	height: 200px;
	@media (max-width: 768px) {
		width: 220px;
		height: 200px;
	}
`;
/* 마이페이지 댓글 리스트 */
const CommentList = styled.div`
	width: 440px;
	height: 25px;
	display: flex;
	border-bottom: 1px solid #d9d9d9;
	@media (max-width: 768px) {
		width: 220px;
		height: 20px;
		font-size: 14px;
	}
`;

/* 마이페이지 리스트 컨테이너 */
const List = styled.div`
	width: 440px;
	height: 30px;
	word-break: normal;
	display: flex;
	margin-top: 8px;
	@media (max-width: 768px) {
		width: 220px;
		height: 20px;
		font-size: 11px;
	}
`;
export default UserInfo;

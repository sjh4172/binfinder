import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Title from '../styles/Title';
import CommunityPost from '../components/CommunityPost';
import CommunityComment from '../components/CommunityComment';
import { Button, WarningButton } from '../styles/Buttons';
import MyProfile from '../components/MyProfile';
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';
import { getPost, deleteCommunity, postCommunity } from '../api/communityAPI';
import { URL_POST } from '../routesURL';
import useInput from '../hooks/useInput';

function CommunityDetail() {
	const navigate = useNavigate();
	const [isOpenModalPost, openModalPost, closeModalPost] = useModal(false);
	const [isOpenModalComment, openModalComment, closeModalComment] =
		useModal(false);
	const [data, setData] = useState(null);
	const location = useLocation();
	const postId = location.pathname.split('/')[2];
	const [textareaBind] = useInput();
	const [isLike, setIsLike] = useState(true);
	const [totalLike, setTotalLike] = useState(null);
	const [commentId, setCommentId] = useState(null);
	const memberId = useSelector((state) => state.auth.memberId);

	useEffect(() => {
		getPost(postId).then((res) => {
			setData(res.data);
			setIsLike(res.data.checkLike);
			setTotalLike(res.data.likes);
		});
	}, []);

	const handleDelecteConfirmPost = () => {
		closeModalPost();
		deleteCommunity(`/boards/${data.b_id}`);
		navigate(URL_POST);
		navigate(0);
	};

	const handleDelecteConfirmComment = () => {
		closeModalComment();
		deleteCommunity(`/comments/${commentId}`);
		navigate(0);
	};

	const postComment = (value) => {
		if (value !== '') {
			postCommunity(`/comments`, {
				b_id: data.b_id,
				c_content: value,
			});
			navigate(0);
		}
	};

	const likeUpDown = () => {
		const Authorization = localStorage.getItem('accessToken');
		if (isLike && Authorization) {
			postCommunity(`/boards/unlike/${data.b_id}/${memberId}`, null).then(
				(res) => setTotalLike(res.data.likes),
			);
			setIsLike(!isLike);
		} else if (Authorization) {
			postCommunity(`/boards/like/${data.b_id}/${memberId}`, null).then((res) =>
				setTotalLike(res.data.likes),
			);
			setIsLike(!isLike);
		}
	};
	return (
		<DetailPageContainer>
			<Title className="cummunityTitle">Community</Title>
			<div className="backGround">
				<section>
					<Title className="title">{data && data.b_title}</Title>
					<MyProfile username={data && data.username} marginNone />
					<CommunityPost setIsPModalOpen={openModalPost} data={data} />
					<Button
						type="button"
						className="bt list"
						onClick={() => navigate(URL_POST)}
					>
						목록 보기
					</Button>
					<Button type="button" className="bt" onClick={() => likeUpDown()}>
						{data && isLike && `♥ ${totalLike}`}
						{data && (isLike || `♡ ${totalLike}`)}
					</Button>
				</section>
				<section>
					<h1 className="visually-hidden">댓글</h1>
					{data && (
						<TotalComment>{`${data.comments.length}개의 댓글`}</TotalComment>
					)}
					<label htmlFor="comment">
						댓글을 입력하세요
						<textarea
							name="comment"
							placeholder="댓글을 입력하세요"
							{...textareaBind}
						/>
					</label>
					<WarningButton
						className="wbt bt"
						onClick={() => postComment(textareaBind.value)}
					>
						작성
					</WarningButton>
					{data && (
						<ul>
							{data.comments.map((el) => (
								<li key={el.c_id}>
									<CommunityComment
										setIsCModalOpen={openModalComment}
										commentData={el}
										setCommentId={setCommentId}
									/>
								</li>
							))}
						</ul>
					)}
				</section>
				{isOpenModalPost && (
					<Modal
						message="게시글 및 댓글이 삭제 됩니다.<br>정말 삭제하시겠습니까?"
						handleConfirm={handleDelecteConfirmPost}
						handleCancel={closeModalPost}
					/>
				)}
				{isOpenModalComment && (
					<Modal
						message="댓글이 삭제 됩니다.<br>정말 삭제하시겠습니까?"
						handleConfirm={handleDelecteConfirmComment}
						handleCancel={closeModalComment}
					/>
				)}
			</div>
		</DetailPageContainer>
	);
}

const DetailPageContainer = styled.section`
	position: relative;
	top: 80px;
	width: 100%;
	padding: 80px;
	background-image: url('https://www.tfmedia.co.kr/data/photos/20200728/art_15942253142942_524c96.png');
	background-repeat: no-repeat;
	background-size: cover;
	.backGround {
		background-color: white;
		border-radius: 5px;
		padding: 80px 100px;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
	.cummunityTitle {
		width: 100%;
		text-align: center;
		font-size: 70px;
		color: white;
		text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.25);
		margin-bottom: 80px;
	}
	.title {
		margin-bottom: 20px;
	}
	.bt {
		margin: 30px 30px 30px 0px;
		font-size: var(--base);
		height: 35px;
	}

	label {
		font-size: 0px;
	}
	textarea {
		font-size: var(--base);
		border-color: var(--line-color);
		width: 100%;
		height: 80px;
		background-color: var(--bg-color);
		resize: none;
		outline: none;
		border-radius: 5px;
		padding: 5px;
	}

	.wbt {
		margin: 10px 0px 20px calc(100% - 100px);
	}
	@media (max-width: 768px) {
		padding: 10px;
		top: 70px;
		.wbt {
			margin: 10px 0px 20px calc(100% - 60px);
		}
		.list {
			width: 80px;
		}
		.cummunityTitle {
			margin-top: 30px;
			margin-bottom: 10px;
			font-size: 50px;
		}
		.backGround {
			padding: 20px;
		}
	}
`;
const TotalComment = styled.p`
	margin-bottom: 20px;
	font-size: var(--title);
	color: var(--main-color);
	font-weight: 800;
	@media (max-width: 768px) {
		font-size: var(--sub-title);
	}
`;
export default CommunityDetail;

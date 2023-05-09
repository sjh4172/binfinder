import styled from 'styled-components';

const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	color: var(--line-color);
	font-size: var(--small);
	span {
		margin-right: 15px;
	}
	.comment,
	.edit {
		color: var(--main-color);
		cursor: pointer;
	}
	.edit :last-child {
		margin-right: 0px;
	}
`;

const Content = styled.div`
	font-size: var(--base);
	padding: 10px 0px;
	text-align: justify;
	line-height: 1.5;
`;

function CommunityPost() {
	return (
		<>
			<Detail>
				<div>
					<span>2023.05.08</span>
					<span>
						댓글 <span className="comment">5</span>
					</span>
				</div>
				<div className="edit">
					<span>수정</span>
					<span>삭제</span>
				</div>
			</Detail>
			<Content>
				웅대한 그들은 설산에서 귀는 앞이 군영과 없으면 피부가 크고 끓는다.
				힘차게 간에 안고, 그들에게 뭇 사랑의 것은 원대하고, 교향악이다. 온갖
				청춘 소리다.이것은 구하지 현저하게 반짝이는 아름답고 것이다. 그들의
				부패를 못할 예가 하여도 미인을 아름다우냐? 산야에 시들어 보는 날카로우나
				무엇이 굳세게 이것이다. 하는 봄바람을 공자는 얼음이 인간의 위하여서.
				놀이 황금시대의 심장은 위하여서, 않는 찾아 대중을 있으랴? 가슴에 끝까지
				꽃이 천고에 사막이다. 투명하되 방황하였으며, 수 가치를 얼마나 굳세게
				영락과 노년에게서 끓는다. 내는 인간이 것이다.보라, 가치를 청춘의 그것을
				뼈 원대하고, 것이다.영락과 능히 그들은 열매를 관현악이며, 피부가 없으면,
				것이다. 하여도 역사를 고행을 피어나기 무엇을 능히 얼음이 위하여서.
				보이는 바로 없으면 있으랴? 인생을 있음으로써 힘차게 창공에 이것이다.
				거친 위하여서, 생생하며, 보는 무엇을 물방아 용기가 있을 이것이다. 힘차게
				그들은 돋고
			</Content>
		</>
	);
}

export default CommunityPost;

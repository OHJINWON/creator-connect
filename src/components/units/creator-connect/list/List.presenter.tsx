import { IBoardListProps } from "./List.types";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
    return (
        <div>
            {
                props.boardData?.fetchBoard?.email ? <button onClick={props.onClickUpdateMove} id={props.boardData.fetchBoard.id || ""}>수정하기</button>
                : <button onClick={props.onClickWriteMove}>등록하기</button>
            }
            <button onClick={props.onClickWriteMove}>등록하기</button>
            <div>인플루언서</div>
            <div>
            {
                props.boardsData?.fetchBoards.map(data => 
                    <div key={data.id}>
                        <p>이름: {data.name}</p>
                        <p>네이버 닉네임: {data.nickname}</p>
                        <p>나이: {data.age}</p>
                        <p>성별: {data.gender === "M" ? "남자" : data.gender === "W" ? "여자" : ""}</p>
                        <p>분야: {data.field}</p>
                        <p>이메일: {data.email}</p>
                        <p>금액: {data.price}원</p>
                        <p>평판: rating</p>
                    </div>
                )
            }   
            </div>
        </div>
    )
}
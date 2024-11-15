import { IBoardListProps } from "./List.types";
import  styles  from "./List.module.css"
import Category from "../category/Category.container";

export default function BoardListUI(props: IBoardListProps): JSX.Element {
    return (
        <div className={styles.boardListBox}>
            <div className={styles.listBox_btn}>
                <button onClick={props.onClickWriteMove}>등록하기</button>
                {
                    props.boardData?.fetchBoard?.email ? <button onClick={props.onClickUpdateMove} id={props.boardData.fetchBoard.id || ""}>수정하기</button>
                    : <button onClick={props.onClickWriteMove}>등록하기</button>
                }
            </div>
            <div>
                <select>
                    <option>내림차순</option>
                    <option>올림차순</option>
                </select>
            </div>
            <div className={styles.listBox_title}>
                <div className={styles.title_box}>
                    <span>
                        <p>인플루언서</p>
                    </span>
                    <span>
                        <p>광고주</p>
                    </span>
                </div>
            </div>
            {/* <div>
                <Category/>
            </div> */}
            <div className={styles.listBox_info}>
                {/* <div className={styles.listBox_info_01}>
                {
                    props.boardsData?.fetchBoards.map(data => 
                        <div className={styles.listBox_info_box} key={data.id}>
                            <div>
                                <p>이름: {data.name}</p>
                                <p>네이버 닉네임: {data.nickname}</p>
                                <p>나이: {data.age}</p>
                                <p>성별: {data.gender === "M" ? "남자" : data.gender === "W" ? "여자" : ""}</p>
                                <p>분야: {data.field}</p>
                                <p>이메일: {data.email}</p>
                                <p>금액: {data.price}원</p>
                                <p>평판: rating</p>
                            </div>
                        </div>
                    )
                }   
                
                </div> */}
            </div>
            {/* <div>1,2,3,,4,5,6</div> */}
        </div>
    )
}
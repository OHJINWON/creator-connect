import { IBoardWriteProps } from "./BoardWrite.types";
import { Flex, Input } from 'antd';

export default function BoardWriteUI(props: IBoardWriteProps) {
    // console.log("datasss", props.data?.fetchUser)
    return(
        <div>
            <div>
                <div>
                    <h1>게시물 등록</h1>
                </div>
                {/* <div>
                    <label htmlFor="info">내 정보 자동넣기</label>
                    <input id="info" type="checkbox" checked={props.isChecked} onChange={props.handleChange}/>
                </div> */}
                {/* <div>
                    <label htmlFor="name">이름</label>
                    <input id="name" type="text" defaultValue={props.name}  onChange={props.onChangeName}/>
                    <div>
                        <p>{props.errName}</p>
                    </div>
                </div> */}
                <div>
                    <label htmlFor="nickname">블로그 닉네임</label>
                    <input id="nickname" type="text" defaultValue={props.nickname} onChange={props.onChangeNickName}/>
                    <div>
                        <p>{props.errNickName}</p>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input id="password" type="text" defaultValue={props.password} onChange={props.onChangePassword}/>
                    <div>
                        <p>{props.errPassword}</p>
                    </div>
                </div>
                {/* <div>
                    <label htmlFor="age">나이</label>
                    <input id="age" type="text" defaultValue={props.age} placeholder="예시: 27" onChange={props.onChangeAge}/>
                    <div>
                        <p>{props.errAge}</p>
                    </div>
                </div> */}
                {/* <div>
                    <label htmlFor="gender">성별</label>
                    <select id="gender" onChange={props.onChangeGender} defaultValue={props.gender}>
                        <option value="">선택</option>
                        <option value="M">남자</option>
                        <option value="W">여자</option>
                    </select>
                    <div>
                        <p>{props.errGender}</p>
                    </div>
                </div> */}
                <div>
                    <label htmlFor="filed">분야</label>
                    <input id="filed" defaultValue={props.field} onChange={props.onChangeField}/>
                    <div>
                        <p>{props.errField}</p>
                    </div>
                </div>
                {/* <div>
                    <label htmlFor="email">이메일</label>
                    <input id="email" type="text" defaultValue={props.email} onChange={props.onChangeEmail}/>
                    <div>
                        <p>{props.errEmail}</p>
                    </div>
                </div> */}
                <div>
                    <label htmlFor="price">금액</label>
                    <input id="price" type="text" defaultValue={props.price} onChange={props.onChangePrice}/>원
                    <div>
                        <p>{props.errPrice}</p>
                    </div>
                </div>
                {/* <div>
                    <label htmlFor="blogUri">블로그 주소</label>
                    <input id="blogUri" type="text" />
                </div> */}
                <div>
                    <p>자기소개</p>
                    <Flex vertical gap={32}>
                        <textarea 
                            maxLength={100}
                            placeholder="disable resize"
                            style={{ height: 120, resize: 'none' }}
                            onChange={props.onChangeInfo}
                            defaultValue={props.info}
                        />
                    </Flex>
                    <div>
                        <p>{props.errInfo}</p>
                    </div>
                </div>
                <button onClick={props.onClickSubmit}>등록하기</button>
            </div>
        </div>
    )
}
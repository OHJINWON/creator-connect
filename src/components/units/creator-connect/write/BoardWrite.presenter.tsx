import Category from "../category/Category.container";
import { IBoardWriteProps } from "./BoardWrite.types";
import { Input, Button } from 'antd';
import styles from "./BoardWrite.module.css";

export default function BoardWriteUI(props: IBoardWriteProps) {
    console.log("sadasd",props.categories)
    return (
        <div className={styles.boardWriteBox}>
            <div className={styles.titleBox}>
                <h1>게시물 등록</h1>
            </div>
            <div className={styles.formBox}>
                <div className={styles.formItem}>
                    <label htmlFor="nickname">블로그 닉네임</label>
                    <Input 
                        id="nickname" 
                        placeholder="닉네임을 입력하세요" 
                        defaultValue={props.nickname} 
                        onChange={props.onChangeNickName} 
                    />
                    {props.errNickName && <p className={styles.errorText}>{props.errNickName}</p>}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">비밀번호</label>
                    <Input.Password 
                        id="password" 
                        placeholder="비밀번호를 입력하세요" 
                        defaultValue={props.password} 
                        onChange={props.onChangePassword} 
                    />
                    {props.errPassword && <p className={styles.errorText}>{props.errPassword}</p>}
                </div>
                <div className={styles.formItem}>
                    <p>분야</p>
                    {/* <Category/> */}
                    <ul className={styles.categoryList}>
                        {props.categories.map((category) => (
                            <li
                                key={category}
                                className={
                                props.field.includes(category) ? styles.selected : ""
                                }
                                onClick={() => props.handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                    {props.errField && <p className={styles.errorText}>{props.errField}</p>}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="price">금액</label>
                    <Input 
                        id="price" 
                        placeholder="금액을 입력하세요" 
                        defaultValue={props.price} 
                        addonAfter="원" 
                        onChange={props.onChangePrice} 
                    />
                    {props.errPrice && <p className={styles.errorText}>{props.errPrice}</p>}
                </div>
                <div className={styles.formItem}>
                    <label>자기소개</label>
                    <Input.TextArea 
                        placeholder="자기소개를 입력하세요" 
                        maxLength={100} 
                        style={{ resize: 'none' }} 
                        onChange={props.onChangeInfo} 
                        defaultValue={props.info} 
                    />
                    {props.errInfo && <p className={styles.errorText}>{props.errInfo}</p>}
                </div>
                <Button type="primary" className={styles.submitButton} onClick={props.onClickSubmit}>
                    등록하기
                </Button>
            </div>
        </div>
    );
}

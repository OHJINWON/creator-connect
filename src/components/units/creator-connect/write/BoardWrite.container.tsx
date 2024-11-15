import { useMutation, useQuery } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import { IMutation, IMutationCreateBoardArgs, IMyUser, IQuery, IQueryFetchUserArgs } from "../../../../commons/types/generated/types";
import { CREATE_BOARD, FETCH_USER } from "./BoardWrite.queries";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const categories: string[] = [
    "여행",
    "패션",
    "뷰티",
    "푸드",
    "IT테크",
    "자동차",
    "리빙",
    "육아",
    "생활건강",
    "게임",
    "동물·펫",
    "운동·레저",
    "프로스포츠",
  ];

export default function BoardWrite () {

    const router = useRouter()
    const[ createBoard ] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD)

    const [storedEmail, setStoredEmail] = useState<string | null>(null);
    const [nickname, setNickName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    const [field, setField] = useState<string[]>([])
    const [price, setPrice] = useState<number>(0)
    const [blogUri, setBlogUri] = useState<string>("")
    const [info, setInfo] = useState<string>("")

    const [errNickName, setErrorNickName] = useState<string>("")
    const [errPassword, setErrorPassword] = useState<string>("")
    const [errField, setErrorField] = useState<string>("")
    const [errPrice, setErrorPrice] = useState<string>("")
    const [errInfo, setErrorInfo] = useState<string>("")

    // 한국나이 구하는 로직
    useEffect(() => {
        // 클라이언트 사이드에서 sessionStorage에 접근
        const email = sessionStorage.getItem("email");
        setStoredEmail(email);   
    }, []);

    // console.log("BoardWrite", storedEmail)

    const { data } = useQuery<Pick<IQuery, "fetchUser">, IQueryFetchUserArgs>(FETCH_USER, {
        variables: {
            email: storedEmail || ""
        }
    })
    useEffect (() => {
        if(data?.fetchUser?.birthyear) {
            const ageDate = new Date()
            const yyyy = ageDate.getFullYear()
            const birthyear = Number(data.fetchUser.birthyear);
            setAge(yyyy-birthyear +1)
        }
    }, [data])
    
    // console.log("data", data)
    // console.log("나이",age)
    
    const onChangeNickName = (e: ChangeEvent<HTMLInputElement>): void => {
        setNickName(e.target.value)
        if(nickname !== "") {
            setErrorNickName("")
        }
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
        if(password !== "") {
            setErrorPassword("")
        }
    }

    // 분야 내용 클리하는 이벤트
    const handleCategoryClick = (selectedField: string): void => {
        if (field.includes(selectedField)) {
            setField(field.filter((item) => item !== selectedField)); // 이미 선택된 항목은 배열에서 제거
        } else {
            setField([...field, selectedField]); // 새로운 항목을 배열에 추가
        }
        if (field.length > 0) setErrorField("");
    };

    console.log("field",field)

    const onChangePrice = (e: ChangeEvent<HTMLInputElement>): void => {
        setPrice(Number(e.target.value))
        if(Number(price) !== 0) {
            setErrorPrice("")
        }
    }
    const onChangeInfo = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setInfo(e.target.value)
        if(info !== "") {
            setErrorInfo("")
        }
    }

    const onClickSubmit = () => {
        if(!nickname) {
            setErrorNickName("블로그 닉네임을 적어주세요.")
        }
        if(!password) {
            setErrorPassword("비밀번호를 입력해주세요.")
        }
        if (Number(price) === 0) {
            setErrorPrice("금액을 적어주세요.")
        }
        if(!field) {
            setErrorField("분야를 선택해주세요.")
        }
        if(!info) {
            setErrorInfo("자기소개를 적어주세요.")
        }
        if(nickname && password && price && info && field) {
            try {
                const result = createBoard({
                    variables: {
                        createBoardInput:{
                            name: data?.fetchUser?.name,
                            nickname,
                            password,
                            age,
                            gender: data?.fetchUser?.gender,
                            field,
                            email: data?.fetchUser?.email,
                            price,
                            aboutMe: info,
                            createdAt: new Date().toISOString()
                        }
                    }
                })
                console.log("result",result)
                alert("등록하셨습니다.")
                router.push("/")
            } catch (error) {
                
            }
        }
    }

    return<>
        <BoardWriteUI 
            data={data}
            nickname={nickname}
            password={password}
            field={field}
            price={price}
            blogUri={blogUri}
            info={info}
            categories={categories}
            errNickName={errNickName}
            errPassword={errPassword}
            errField={errField}
            errPrice={errPrice}
            errInfo={errInfo}
            
            onClickSubmit={onClickSubmit}
            handleCategoryClick={handleCategoryClick}
            onChangeNickName={onChangeNickName}
            onChangePassword={onChangePassword}
            // onChangeField={onChangeField}
            onChangePrice={onChangePrice}
            onChangeInfo={onChangeInfo} 
        />
    </>
}
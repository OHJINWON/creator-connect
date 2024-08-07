import { useMutation, useQuery } from "@apollo/client";
import BoardWriteUI from "./BoardWrite.presenter";
import { IMutation, IMutationCreateBoardArgs, IMyUser, IQuery, IQueryFetchUserArgs } from "../../../../commons/types/generated/types";
import { CREATE_BOARD, FETCH_USER } from "./BoardWrite.queries";
import { ChangeEvent, useEffect, useState } from "react";

export default function BoardWrite () {

    const[ createBoard ] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD)

    const [storedEmail, setStoredEmail] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [name, setName] = useState<string>("")
    const [nickname, setNickName] = useState<string>("")
    const [age, setAge] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [filed, setFiled] = useState<any>()
    const [email, setEmail] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [blogUri, setBlogUri] = useState<string>("")
    const [info, setInfo] = useState<string>("")

    const [errName, setErrorName] = useState<string>("")
    const [errNickName, setErrorNickName] = useState<string>("")
    const [errAge, setErrorAge] = useState<string>("")
    const [errGender, setErrorGender] = useState<string>("")
    const [errFiled, setErrorFiled] = useState<string>("")
    const [errEmail, setErrorEmail] = useState<string>("")
    const [errPrice, setErrorPrice] = useState<string>("")
    const [errInfo, setErrorInfo] = useState<string>("")


    // 한국나이 구하는 로직
    const [krAge, setKrAge] = useState<number>()

    

    useEffect(() => {
        // 클라이언트 사이드에서 sessionStorage에 접근
        const email = sessionStorage.getItem("email");
        setStoredEmail(email);
        // 한국나이 구하는 로직 
        if(data?.fetchUser?.birthyear) {
            const ageDate = new Date()
            const yyyy = ageDate.getFullYear()
            const birthyear = Number(data.fetchUser.birthyear);
            setKrAge(yyyy-birthyear +1)
        }
    }, []);

    const { data } = useQuery<Pick<IQuery, "fetchUser">, IQueryFetchUserArgs>(FETCH_USER, {
        variables: {
            email: storedEmail || "dhwlsdnjs55@naver.com"
        }
    })
    const checkedGender = data?.fetchUser?.gender
    console.log("한국나이:",krAge)  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked((prev)=> !prev)
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        console.log("이름:", name)
        if(name !== "" && name === data?.fetchUser?.name) {
            setErrorName("")
        }
    }
    const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value)
        if(nickname !== "") {
            setErrorNickName("")
        }
    }
    const onChangeAge = (e: ChangeEvent<HTMLInputElement>): void => {
        setAge(e.target.value)
        console.log("age:", age)
        if(krAge === Number(age)) {
            console.log("나이가 같다.")
            setErrorAge("")
        }
    }
    const onChangeGender = (e: ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value)
        console.log("성별", e.target.value)
        console.log("checkedGender",checkedGender)
        if(gender !== "" && gender === checkedGender) {
            setErrorGender("")
        }
    }
    const onChangeFiled = (e: ChangeEvent<HTMLInputElement>) => {
        setFiled(e.target.value)
        // if(!name) {
        //     alert("제데로된 이름을 적어주세요")
        // }
    }
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if(email !== "" && email === data?.fetchUser?.email){
            setErrorEmail("")
        }
    }
    const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
        if(Number(price) !== 0) {
            setErrorPrice("")
        }
    }
    const onChangeInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInfo(e.target.value)
        if(info !== "") {
            setErrorInfo("")
        }
    }

    const onClickSubmit = () => {
        console.log("gender:", gender)
        console.log("age:", age)
        if(!name) {
            setErrorName("이름을 적어주세요.")
        }
        if (name && data?.fetchUser?.name !== name) {
            setErrorName("이름이 일치하지 않습니다.")
        }
        if(!nickname) {
            setErrorNickName("블로그 닉네임을 적어주세요.")
        }
        if (!age) {
            setErrorAge("나이를 적어주세요.")
        }
        if(age && Number(age) !== krAge) {
            setErrorAge("나이가 일치하지 않습니다.")
        }
        if(!gender) {
            setErrorGender("성별을 골라주세요.")
        }
        if(gender && data?.fetchUser?.gender !== gender) {
            setErrorGender("성별이 일치하지 않습니다.")
        }
        if(!email) {
            setErrorEmail("이메일을 적어주세요.")
        }
        if(email && data?.fetchUser?.email !== email) {
            setErrorEmail("이메일이 일치하지 않습니다.")
        }
        if (Number(price) === 0) {
            setErrorPrice("금액을 적어주세요.")
        }
        if(!info) {
            setErrorInfo("자기소개를 적어주세요.")
        }

        // try {
        //     const result = createBoard({
        //         variables: {
        //             createBoardInput:{
        //                 name: data?.fetchUser?.name,

        //             }
        //         }
        //     })
        // } catch (error) {
            
        // }
    }

    return<>
        <BoardWriteUI 
            data={data}
            name={name}
            nickname={nickname}
            age={age}
            gender={gender}
            filed={filed}
            email={email}
            price={price}
            blogUri={blogUri}
            info={info}
            errName={errName}
            errNickName={errNickName}
            errAge={errAge}
            errGender={errGender}
            errFiled={errFiled}
            errEmail={errEmail}
            errPrice={errPrice}
            errInfo={errInfo}
            handleChange={handleChange} 
            isChecked={isChecked}
            onClickSubmit={onClickSubmit}
            onChangeName={onChangeName} 
            onChangeNickName={onChangeNickName}
            onChangeAge={onChangeAge}
            onChangeGender={onChangeGender}
            onChangeFiled={onChangeFiled}
            onChangeEmail={onChangeEmail}
            onChangePrice={onChangePrice}
            onChangeInfo={onChangeInfo} 
        />
    </>
}
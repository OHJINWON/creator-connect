import { ChangeEvent } from "react";
import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
    data?: Pick<IQuery, "fetchUser">
    nickname: string
    password: string
    field: string[]
    categories:string[]
    price: number
    blogUri: string
    info: string
    errNickName: string
    errPassword: string
    errField: string
    errPrice: string
    errInfo: string
    onClickSubmit: () => void
    handleCategoryClick: (selectedField: string) => void
    onChangeNickName: (e:ChangeEvent<HTMLInputElement>) => void
    onChangePassword: (e:ChangeEvent<HTMLInputElement>) => void
    // onChangeField: (e:ChangeEvent<HTMLInputElement>) => void
    onChangePrice: (e:ChangeEvent<HTMLInputElement>) => void
    onChangeInfo: (e:ChangeEvent<HTMLTextAreaElement>) => void
}
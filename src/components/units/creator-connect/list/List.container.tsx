import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { IQuery, IQueryFetchBoardArgs } from "../../../../commons/types/generated/types";
import { FETCH_BOARD, FETCH_BOARDS } from "./List.queries";
import BoardListUI from "./List.presenter";

export default function BoardList() {
    
    const router = useRouter()
    const [email, setEmail] = useState<string | null>("")
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        setEmail(storedEmail);
    })

    console.log("BoardList", email)

    const { data:boardData } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
        variables: {
            email: email || ""
        }
    })

    const { data: boardsData } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardArgs>(FETCH_BOARDS) 

    console.log("BoardData",boardData)
    console.log("boardsData", boardsData )

    const onClickWriteMove = () => {
        router.push(`/board/write`)
    }

    const onClickUpdateMove = () => {
        router.push(`/board/${boardData?.fetchBoard?.id}/edit`)
    }

    return <BoardListUI onClickWriteMove={onClickWriteMove} boardData={boardData} boardsData={boardsData} onClickUpdateMove={onClickUpdateMove}/>
}
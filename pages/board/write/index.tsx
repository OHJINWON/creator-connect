import { useRouter } from "next/router";
import BoardWrite from "../../../src/components/units/creator-connect/write/BoardWrite.container";

export default function BoardWritePage() {

    const router = useRouter()

    const onClickMove = () => {
        router.push("/board/write")
    }

    return<>
        <BoardWrite/>
    </>
}
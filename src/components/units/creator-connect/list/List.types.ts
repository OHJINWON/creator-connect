import { IQuery } from "../../../../commons/types/generated/types"

export interface IBoardListProps {
    onClickWriteMove: () => void
    boardData?: Pick<IQuery, "fetchBoard">
    boardsData?: Pick<IQuery, "fetchBoards">
    onClickUpdateMove: () => void
}
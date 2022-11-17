import {useMemo} from "react";
import useBoard from "../../../hooks/useBoard";

const BoardListItem = () => {
    const { boardList, loading, deleteBoard, updateBoard } = useBoard();
    return useMemo(() => (
        <>
            {
                boardList.map(board => {
                    return (
                        <div key={board.seq}>
                            <div>{board.title}</div>
                            <div onClick={() => deleteBoard(board)}>delete</div>
                            <div onClick={() => updateBoard(board)}>update</div>
                        </div>
                    )
                })
            }
        </>
    ), [loading, boardList])
}

export default BoardListItem;
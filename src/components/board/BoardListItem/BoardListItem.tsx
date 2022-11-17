import {useMemo} from "react";
import {useGetBoardListQuery} from "../../../api/board/api";

const BoardListItem = () => {
    const { data, isLoading } = useGetBoardListQuery(null);
    return useMemo(() => (
        <>
            {
                !isLoading && data?.map(board => {
                    return (
                        <div>{board.title}</div>
                    )
                })
            }
        </>
    ), [isLoading, data])
}

export default BoardListItem;
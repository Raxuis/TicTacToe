import {useBoard} from "@/hooks/useBoard.tsx";
import {getCorrespondingBoardType} from "@/utils";

const GameDescription = () => {
    const {boardType} = useBoard();
    return (
        <p className="mb-7">
            {getCorrespondingBoardType(boardType)}
        </p>
    );
};

export default GameDescription;
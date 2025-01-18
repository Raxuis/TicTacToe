import {useBoard} from "@/hooks/useBoard.tsx";
import {getCorrespondingBoardType} from "@/utils";

const GameDescription = () => {
    const {gameMode} = useBoard();
    return (
        <p className="mb-7">
            {getCorrespondingBoardType(gameMode)}
        </p>
    );
};

export default GameDescription;
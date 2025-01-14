import PlayerTurnInfo from "./PlayerTurnInfo";
import {Player} from "../../types";
import BoardIcons from "./BoardIcons";
import ResetButton from "./ResetButton";

type HeaderBoardProps = {
    currentPlayer: Player;
    resetBoard: () => void;
}

const HeaderBoard = ({currentPlayer, resetBoard}: HeaderBoardProps) => {
    return (
        <div className="flex justify-center items-center gap-8 mb-14">
            <BoardIcons/>
            <PlayerTurnInfo currentPlayer={currentPlayer}/>
            <ResetButton resetBoard={resetBoard}/>
        </div>
    );
};

export default HeaderBoard;
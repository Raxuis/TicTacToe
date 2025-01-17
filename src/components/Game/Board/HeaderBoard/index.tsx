import PlayerTurnInfo from "./PlayerTurnInfo";
import BoardIcons from "./BoardIcons";
import ResetButton from "./ResetButton";

const HeaderBoard = () => {
    return (
        <div className="flex justify-center items-center gap-8 mb-7">
            <BoardIcons/>
            <PlayerTurnInfo/>
            <ResetButton/>
        </div>
    );
};

export default HeaderBoard;
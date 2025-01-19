import BoardIcons from "@/components/Game/Board/HeaderBoard/BoardIcons";
import PlayerTurnInfo from "@/components/Game/Board/HeaderBoard/PlayerTurnInfo";
import ResetButton from "@/components/Game/Board/HeaderBoard/ResetButton";

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
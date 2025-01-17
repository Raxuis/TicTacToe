import PlayersInfoCell from "./PlayersInfoCell";
import {useBoard} from "@/hooks/useBoard.tsx";

const PlayersInfo = () => {
    const {gameStats} = useBoard();

    const {
        player1Wins,
        player2Wins,
        ties
    } = gameStats;

    return (
        <div className="grid grid-cols-3 gap-4 pt-6">
            <PlayersInfoCell data={player1Wins} type="Player1Wins"/>
            <PlayersInfoCell data={ties} type="Ties"/>
            <PlayersInfoCell data={player2Wins} type="Player2Wins"/>
        </div>
    );
};

export default PlayersInfo;
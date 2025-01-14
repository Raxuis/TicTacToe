import {GameStats, TicTacToesTypes} from "../types";
import PlayersInfoCell from "./PlayersInfoCell";

const PlayersInfo = ({boardType, gameStats}: { boardType: TicTacToesTypes, gameStats: GameStats }) => {
    const {player1Wins, player2Wins, ties} = gameStats;
    return (
        <div className="grid grid-cols-3 gap-2">
            <PlayersInfoCell data={player1Wins} type="Player1Wins"/>
            <PlayersInfoCell data={ties} type="Ties"/>
            <PlayersInfoCell data={player2Wins} type="Player2Wins"/>
        </div>
    );
};

export default PlayersInfo;
import {TicTacToesTypes} from "../../types";
import PlayersInfoCell from "./PlayersInfoCell";
import {BoardContext} from "../../contexts/BoardContext.tsx";
import {useContext} from "react";

const PlayersInfo = ({boardType}: { boardType: TicTacToesTypes }) => {
    const {gameStats} = useContext(BoardContext);

    const {
        player1Wins,
        player2Wins,
        ties
    } = gameStats;

    return (
        <div className="grid grid-cols-3 gap-4 pt-6">
            <PlayersInfoCell data={player1Wins} type="Player1Wins" boardType={boardType}/>
            <PlayersInfoCell data={ties} type="Ties"/>
            <PlayersInfoCell data={player2Wins} type="Player2Wins" boardType={boardType}/>
        </div>
    );
};

export default PlayersInfo;
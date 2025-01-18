import {useBoard} from "@/hooks/useBoard.tsx";
import {cn} from "@/libs/cn.ts";
import PlayersInfoCell from "./PlayersInfoCell";

const PlayersInfo = () => {
    const {gameStats, gameTypeIsSpecial} = useBoard();
    const isSpecialGame = gameTypeIsSpecial();

    const {player1Wins, player2Wins, ties} = gameStats;

    return (
        <div
            className={cn(
                "pt-6 gap-4",
                isSpecialGame ? "flex items-center justify-between" : "grid grid-cols-3"
            )}
        >
            <PlayersInfoCell data={player1Wins} type="Player1Wins"/>

            {!isSpecialGame && <PlayersInfoCell data={ties} type="Ties"/>}

            <PlayersInfoCell data={player2Wins} type="Player2Wins"/>
        </div>
    );
};

export default PlayersInfo;

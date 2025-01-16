import {PlayersInfoCellTypes} from "../../../types";
import {cn} from "../../../libs/cn.ts";
import {useBoard} from "../../../hooks/useBoard.tsx";
import {useMemo} from "react";

type PlayersInfoCellProps = {
    data: number,
    type: PlayersInfoCellTypes,
}

const PlayersInfoCell = ({data, type}: PlayersInfoCellProps) => {
    const {gameTypeIsSolo} = useBoard();
    const isSoloGame = gameTypeIsSolo();

    const displayText = useMemo(() => {
        let text = type === "Player1Wins"
            ? "X"
            : type === "Ties"
                ? "Ties"
                : "O";

        if (isSoloGame) {
            if (type === "Player1Wins") {
                text += '(You)';
            } else if (type === "Player2Wins") {
                text += '(CPU)';
            }
        }

        return text;
    }, [type, isSoloGame]);

    return (
        <div className={
            cn('h-20 w-24 flex flex-col items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg',
                type === "Player1Wins" ? 'bg-gray-light-dark' : type === "Ties" ? 'bg-gray-light' : 'bg-secondary')
        }>
                <span className="uppercase">
                    {displayText}
                </span>
            {data}
        </div>
    );
};

export default PlayersInfoCell;
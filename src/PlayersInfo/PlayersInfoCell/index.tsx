import {PlayersInfoCellTypes, TicTacToesTypes} from "../../types";
import {cn} from "../../libs/cn.ts";

type PlayersInfoCellProps = {
    data: number,
    type: PlayersInfoCellTypes,
    boardType?: TicTacToesTypes,
}

const PlayersInfoCell = ({data, type, boardType}: PlayersInfoCellProps) => {
    let textToShow: string = type === "Player1Wins"
        ? "X"
        : type === "Ties"
            ? "Ties"
            : "O";

    if (boardType === "solo" && type === "Player1Wins") {
        textToShow += '(You)';
    }
    if (boardType === "solo" && type === "Player2Wins") {
        textToShow += '(CPU)';
    }

    return (
        <div className={
            cn('h-20 w-24 flex flex-col items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg',
                type === "Player1Wins" ? 'bg-gray-light-dark' : type === "Ties" ? 'bg-gray-light' : 'bg-secondary')
        }>
                <span className="uppercase">
                    {textToShow}

                </span>
            {data}
        </div>
    );
};

export default PlayersInfoCell;
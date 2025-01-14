import {PlayersInfoCellTypes} from "../../../types";
import {cn} from "../../../libs/cn.ts";
import {useBoard} from "../../../hooks/useBoard.tsx";

type PlayersInfoCellProps = {
    data: number,
    type: PlayersInfoCellTypes,
}

const PlayersInfoCell = ({data, type}: PlayersInfoCellProps) => {
    const {gameTypeIsSolo} = useBoard();

    let textToShow: string = type === "Player1Wins"
        ? "X"
        : type === "Ties"
            ? "Ties"
            : "O";

    if (gameTypeIsSolo && type === "Player1Wins") {
        textToShow += '(You)';
    }
    if (gameTypeIsSolo && type === "Player2Wins") {
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
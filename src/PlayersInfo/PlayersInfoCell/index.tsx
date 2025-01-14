import {PlayersInfoCellTypes, TicTacToesTypes} from "../../types";

type PlayersInfoCellProps = {
    data: number,
    type: PlayersInfoCellTypes,
    boardType?: TicTacToesTypes,
}

const PlayersInfoCell = ({data, type, boardType}: PlayersInfoCellProps) => {
    return (
        type === "Player1Wins" ? (
            <div
                className="bg-gray-light-dark size-20 flex flex-col items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg">
                <span className="uppercase">
                    X
                    {boardType === "solo" ? "(You)" : null}
                </span>
                {data}
            </div>
        ) : type === "Ties" ? (
                <div
                    className="bg-gray-light size-20 flex flex-col items-center justify-center text-lg font-bold cursor-pointer p-4 rounded-lg">
                    <span className="uppercase">Ties</span>
                    {data}
                </div>
            )
            : (
                <div
                    className="bg-secondary size-20 flex flex-col items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg">
                    <span className="uppercase">
                        O
                        {boardType === "solo" ? "(CPU)" : null}
                    </span>
                    {data}
                </div>
            )
    );
};

export default PlayersInfoCell;
import {PlayersInfoCellTypes} from "../../types";

type PlayersInfoCellProps = {
    data: number,
    type: PlayersInfoCellTypes,
}

const PlayersInfoCell = ({data, type}: PlayersInfoCellProps) => {
    return (
        type === "Player1Wins" ? (
            <div
                className="bg-gray-light-dark size-20 flex items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg">
                {data}
            </div>
        ) : type === "Player2Wins" ? (
            <div
                className="bg-secondary size-20 flex items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg">
                {data}
            </div>
        ) : (
            <div
                className="bg-gray-light size-20 flex items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg">
                {data}
            </div>
        )
    );
};

export default PlayersInfoCell;
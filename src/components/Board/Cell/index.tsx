import cross from "@/assets/cross.svg";
import circle from "@/assets/circle.svg";
import {BoardPlayer} from "@/types";
import {useBoard} from "@/hooks/useBoard.tsx";
import {cn} from "@/libs/cn.ts";

const Cell = ({
                  cellValue,
                  onClick,
                  row,
                  col
              }: {
    cellValue: BoardPlayer,
    onClick: () => void,
    row: number,
    col: number
}) => {
    const {moves, currentPlayer} = useBoard();

    const playerMoves = moves.filter(move => move.player === currentPlayer);

    const willDisappear = playerMoves.length === 3 &&
        playerMoves[0].position[0] === row &&
        playerMoves[0].position[1] === col;

    return (
        <div
            className="bg-gray-medium size-24
            flex items-center justify-center text-xl font-bold cursor-pointer
            p-4 rounded-lg shadow-cellGreyShadow active:shadow-none active:translate-y-1"
            onClick={onClick}
        >
            {cellValue !== "" && (
                <img
                    src={cellValue === "X" ? cross : circle}
                    alt={cellValue}
                    className={cn(
                        'transition-all duration-300',
                        willDisappear && 'animate-pulse'
                    )}
                />
            )}
        </div>
    );
};

export default Cell;
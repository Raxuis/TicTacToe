import cross from "@/assets/cross.svg";
import circle from "@/assets/circle.svg";
import {BoardPlayer} from "@/types";
import {useBoard} from "@/hooks/useBoard.ts";
import {cn} from "@/libs/cn.ts";
import {memo, useMemo} from "react";
import Button from "@/components/Button";

type CellProps = {
    cellValue: BoardPlayer;
    onClick: () => void;
    row: number;
    col: number;
    winningCells: number[][];
}

const Cell = memo(({
                       cellValue,
                       onClick,
                       row,
                       col,
                       winningCells
                   }: CellProps) => {
    const {moves, currentPlayer} = useBoard();

    const playerMoves = moves.filter(
        move => move.player === currentPlayer);

    const willDisappear = playerMoves.length === 3 &&
        playerMoves[0].position[0] === row &&
        playerMoves[0].position[1] === col;

    const isWinningCell = winningCells.some(
        ([winningRow, winningCol]) => winningRow === row && winningCol === col
    );

    const BlackCross = useMemo(() => {
        return (
            <svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink"
                 style={{fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}}>
                <g transform="matrix(1.27895,0,0,1.27895,-6.92671,-6.46265)">
                    <path
                        d="M17.828,22.713L6.001,10.886C5.221,10.105 5.221,8.838 6.001,8.058L8.42,5.639C9.201,4.858 10.468,4.858 11.249,5.639L23.076,17.465C23.686,18.076 24.677,18.076 25.287,17.465L37.114,5.639C37.895,4.858 39.162,4.858 39.942,5.639L42.361,8.058C43.142,8.838 43.142,10.105 42.361,10.886L30.535,22.713C29.924,23.323 29.924,24.314 30.535,24.924L42.361,36.751C43.142,37.532 43.142,38.799 42.361,39.58L39.942,41.999C39.162,42.779 37.895,42.779 37.114,41.999L25.287,30.172C24.677,29.562 23.686,29.562 23.076,30.172L11.249,41.999C10.468,42.779 9.201,42.779 8.42,41.999L6.001,39.58C5.221,38.799 5.221,37.532 6.001,36.751L17.828,24.924C18.438,24.314 18.438,23.323 17.828,22.713Z"
                        style={{fill: "rgb(0,0,0)"}}/>
                </g>
            </svg>
        );
    }, []);

    const BlackCircle = useMemo(() => {
        return (
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlSpace="preserve"
                style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 2,
                }}
            >
                <path
                    d="M24,0C37.246,0 48,10.754 48,24C48,37.246 37.246,48 24,48C10.754,48 0,37.246 0,24C0,10.754 10.754,0 24,0ZM24,9.54C31.981,9.54 38.46,16.019 38.46,24C38.46,31.981 31.981,38.46 24,38.46C16.019,38.46 9.54,31.981 9.54,24C9.54,16.019 16.019,9.54 24,9.54Z"
                    style={{fill: "rgb(0,0,0)"}}
                />
            </svg>
        );
    }, []);

    return (
        <Button
            className={cn('bg-gray-medium size-24 flex items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg shadow-cellGreyShadow active:shadow-none active:translate-y-1'
                , isWinningCell && (cellValue === "X" ? "bg-primary" : "bg-secondary")
            )}
            onClick={onClick}
        >
            {cellValue !== "" && (
                isWinningCell ? (
                    cellValue === "X" ? BlackCross : BlackCircle
                ) : (
                    <img
                        src={cellValue === "X" ? cross : circle}
                        alt={cellValue}
                        className={cn(
                            'transition-all duration-300',
                            willDisappear && 'animate-pulse'
                        )}
                    />
                ))}
        </Button>
    );
});

Cell.displayName = "Cell";

export default Cell;
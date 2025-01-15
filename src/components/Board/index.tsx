import Cell from "./Cell";
import {useBoard} from "../../hooks/useBoard.tsx";

const Board = () => {
    const {
        board,
        currentPlayer,
        winner,
        placeMove,
        gameTypeIsSolo
    } = useBoard();

    const handleClick = (
        row: number, col: number) => {

        if (
            board[row][col] !== "" ||
            (gameTypeIsSolo() && currentPlayer === "O")
            || winner) return;

        placeMove(row, col);
    }

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 place-items-center">
            {
                board.map((row, rowIndex) =>
                    row.map((cellValue, colIndex) => {
                        return (
                            <Cell cellValue={cellValue}
                                  key={`${rowIndex}-${colIndex}`}
                                  onClick={() => handleClick(rowIndex, colIndex)}
                            />
                        )
                    })
                )}
        </div>
    );
};

export default Board;
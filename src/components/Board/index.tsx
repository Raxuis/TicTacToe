import Cell from "./Cell";
import {useContext} from "react";
import {BoardContext} from "../../contexts/BoardContext.tsx";
import {BoardPlayer} from "../../types";

const Board = () => {
    const {
        board,
        currentPlayer,
        winner,
        setBoard,
        setStoredBoard,
        checkWinner,
        switchCurrentPlayer,
        gameTypeIsSolo
    } = useContext(BoardContext);

    const handleClick = (
        row: number, col: number) => {

        if (
            board[row][col] !== "" ||
            (gameTypeIsSolo && currentPlayer === "O")
            || winner) return;

        const newBoard = board.map(
            (rowArray: BoardPlayer[], rowIndex: number) =>
                rowArray.map(
                    (cell: BoardPlayer, colIndex: number) =>
                        rowIndex === row && colIndex === col ? currentPlayer : cell
                )
        )

        setBoard(newBoard);
        setStoredBoard(newBoard);
        checkWinner(newBoard);
        switchCurrentPlayer();
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
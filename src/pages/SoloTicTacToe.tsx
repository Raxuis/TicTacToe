import {useState} from "react";
import {BoardPlayer, initialBoard, Player} from "../constants";
import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg";

const SoloTicTacToe = () => {
    const [board, setBoard] = useState<BoardPlayer[][]>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Player | null>(null);

    const handleClick = (
        row: number, col: number) => {
        if (board[row][col] !== "" || winner) return;
        const newBoard = board.map(
            (rowArray: BoardPlayer[], rowIndex: number) =>
                rowArray.map(
                    (cell: BoardPlayer, colIndex: number) =>
                        rowIndex === row && colIndex === col ? currentPlayer : cell
                )
        )

        setBoard(newBoard);
    }

    return (
        <>
            <p className="text-xl">
                {
                    currentPlayer === "X" ? "Votre tour !" : "Tour du bot !"
                }
            </p>
            <div className="grid grid-cols-3 gap-2">
                {
                    board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="bg-primary-dark size-20 border flex items-center justify-center text-xl font-bold cursor-pointer p-2"
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                >
                                    {cell === "X" ? (
                                        <img src={cross} alt="cross"/>
                                    ) : cell === "O" ? (
                                        <img src={circle} alt="circle"/>
                                    ) : cell}
                                </div>
                            )
                        })
                    )}
            </div>
        </>
    );
};

export default SoloTicTacToe;
import {useEffect, useState} from "react";
import {BoardPlayer, initialBoard, Player} from "../constants";
import Cell from "../Cell";
import CurrentPlayerInfo from "../CurrentPlayerInfo";

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
        setCurrentPlayer("O");
    }

    const playBot = () => {
        if (winner) return;
        console.log("Bot has played.")

        const emptyCells: [number, number][] = [];

        board.forEach((row, rowIndex) =>
            row.forEach((cell, colIndex) => {
                if (cell === "") emptyCells.push([rowIndex, colIndex]);
            })
        );

        if (emptyCells.length === 0 || winner) return;

        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        const newBoard = board.map((rowArray, rowIndex) =>
            rowArray.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? "O" : cell
            )
        );

        setBoard(newBoard);
        setCurrentPlayer("X");
    }

    useEffect(() => {
        if (currentPlayer === "O" && !winner) {
            const timer = setTimeout(playBot, 500);
            return () => clearTimeout(timer);
        }

    }, [board, currentPlayer]);

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <CurrentPlayerInfo currentPlayer={currentPlayer}/>

            <div className="grid grid-cols-3 gap-2">
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
        </div>
    );
};

export default SoloTicTacToe;
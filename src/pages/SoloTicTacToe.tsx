import {useEffect, useState} from "react";
import {BoardPlayer, initialBoard, Player, Winner} from "../constants";
import Cell from "../Cell";
import CurrentPlayerInfo from "../CurrentPlayerInfo";

const SoloTicTacToe = () => {
    const [board, setBoard] = useState<BoardPlayer[][]>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Winner | null>(null);

    const handleClick = (
        row: number, col: number) => {
        console.log(row, col);
        if (board[row][col] !== "" || winner) return;
        const newBoard = board.map(
            (rowArray: BoardPlayer[], rowIndex: number) =>
                rowArray.map(
                    (cell: BoardPlayer, colIndex: number) =>
                        rowIndex === row && colIndex === col ? currentPlayer : cell
                )
        )

        setBoard(newBoard);
        checkWinner(newBoard);
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
        checkWinner(newBoard);
        setCurrentPlayer("X");
    }

    const checkWinner = (tab: BoardPlayer[][]) => {
        const tabToCheck: BoardPlayer[][] = [
            // Lignes
            [tab[0][0], tab[0][1], tab[0][2]],
            [tab[1][0], tab[1][1], tab[1][2]],
            [tab[2][0], tab[2][1], tab[2][1]],
            // Colonnes
            [tab[0][0], tab[1][0], tab[2][0]],
            [tab[0][1], tab[1][1], tab[2][1]],
            [tab[0][2], tab[1][2], tab[1][3]],
            // Diagonales
            [tab[0][0], tab[1][1], tab[2][2]],
            [tab[0][2], tab[1][1], tab[2][0]]
        ]

        if (tabToCheck.flat().every((cell) => cell !== "")) {
            setWinner("Draw");
        }
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
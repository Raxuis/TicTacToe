import {useEffect, useState} from "react";
import {initialBoard} from "../constants";
import CurrentPlayerInfo from "../CurrentPlayerInfo";
import WinnerInfo from "../WinnerInfo";
import {useLocation, useNavigate} from "react-router";
import {BoardPlayer, Player, Winner} from "../types";
import Board from "../Board";

const SoloTicTacToe = () => {
    const [board, setBoard] = useState<BoardPlayer[][]>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [username, setUsername] = useState("");
    const [winner, setWinner] = useState<Winner | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const location = useLocation();

    const handleClick = (
        row: number, col: number) => {

        if (board[row][col] !== "" || currentPlayer === "O" || winner) return;

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
            [tab[2][0], tab[2][1], tab[2][2]],
            // Colonnes
            [tab[0][0], tab[1][0], tab[2][0]],
            [tab[0][1], tab[1][1], tab[2][1]],
            [tab[0][2], tab[1][2], tab[2][2]],
            // Diagonales
            [tab[0][0], tab[1][1], tab[2][2]],
            [tab[0][2], tab[1][1], tab[2][0]]
        ]

        for (const row of tabToCheck) {
            if (row.every(cell => cell === "X")) {
                setWinner("X");
                setShowModal(true);
                return
            }

            if (row.every(cell => cell === "O")) {
                setWinner("O");
                setShowModal(true);
                return
            }
        }

        if (tabToCheck.flat().every((cell) => cell !== "")) {
            setWinner("Draw");
            setShowModal(true);
        }
    }

    const resetBoard = () => {
        setBoard(initialBoard);
        setCurrentPlayer("X");
        setWinner(null);
    }

    useEffect(() => {
        const username = location.state?.username;

        if (!username) {
            navigate("/");
        } else {
            setUsername(username);
        }
    }, []);

    useEffect(() => {
        if (currentPlayer === "O" && !winner) {
            const timer = setTimeout(playBot, 500);
            return () => clearTimeout(timer);
        }

    }, [board, currentPlayer]);


    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <CurrentPlayerInfo
                currentPlayer={currentPlayer}
            />

            <Board board={board} handleClick={handleClick}/>

            <WinnerInfo
                showModal={showModal}
                setShowModal={setShowModal}
                winner={winner}
                resetBoard={resetBoard}
                username={username}
            />
        </div>
    );
};

export default SoloTicTacToe;
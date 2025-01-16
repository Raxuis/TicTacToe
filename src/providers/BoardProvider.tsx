import {ReactNode, useEffect, useState} from "react";
import {BoardContext} from "@/contexts/BoardContext.tsx";
import {BoardPlayer, GameStats, Player, TicTacToesTypes, Winner} from "@/types";
import {initialBoard} from "@/constants";
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";


export const BoardProvider = ({children}: { children: ReactNode }) => {
    const [board, setBoard] = useState<BoardPlayer[][]>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [username, setUsername] = useState("");
    const [winner, setWinner] = useState<Winner | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [boardType, setBoardType] = useState<TicTacToesTypes>("");
    const [gameStats, setGameStats] = useLocalStorage<GameStats>("gameStats", {
        username: "",
        boardType: "",
        player1Wins: 0,
        ties: 0,
        player2Wins: 0,
        playerTurn: "X"
    });
    const [storedBoard, setStoredBoard] = useLocalStorage<BoardPlayer[][]>("board", initialBoard);
    const [moves, setMoves] = useLocalStorage<Array<{
        player: Player,
        position: [number, number]
    }>>("moves", []);


    const gameTypeIsSolo = (gameType: TicTacToesTypes = boardType) => {
        return gameType.includes("solo");
    }

    const gameTypeIsSpecial = (gameType: TicTacToesTypes = boardType) => {
        return gameType.includes("special");
    }


    const switchCurrentPlayer = () => {
        const playerTurn = currentPlayer === "X"
            ? "O"
            : "X";
        setCurrentPlayer(playerTurn);
        setGameStats({
            ...gameStats,
            playerTurn: playerTurn
        })
    }

    const checkPlayerMoves = (moves: { player: Player, position: [number, number] }[]): boolean => {
        const playerMoves = moves.filter(move => move.player === currentPlayer);
        return playerMoves.length > 3;
    }

    const placeMove = (row: number, col: number) => {
        const newBoard = board.map((rowArray, rowIndex) =>
            rowArray.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? currentPlayer : cell
            )
        );
        if (gameTypeIsSpecial()) {
            const newMoves = [...moves, {
                player: currentPlayer,
                position: [row, col] as [number, number]
            }];

            if (
                newMoves.length > 3 && checkPlayerMoves(newMoves)
            ) {
                const oldestMove = newMoves.shift();
                if (oldestMove) {
                    const [oldRow, oldCol] = oldestMove.position;
                    newBoard[oldRow][oldCol] = "";
                }
            }
            setMoves(newMoves);
        }
        setBoard(newBoard);
        setStoredBoard(newBoard);
        checkWinner(newBoard);
        switchCurrentPlayer();
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

        placeMove(row, col);
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
                setStoredBoard(initialBoard);
                return
            }

            if (row.every(cell => cell === "O")) {
                setWinner("O");
                setShowModal(true);
                setStoredBoard(initialBoard);
                return
            }
        }

        if (tabToCheck.flat().every((cell) => cell !== "")) {
            setWinner("Draw");
            setShowModal(true);
            setStoredBoard(initialBoard);
        }
    }

    const resetBoard = () => {
        setBoard(initialBoard);
        setStoredBoard(initialBoard);
        setCurrentPlayer("X");
        setWinner(null);

        if (gameTypeIsSpecial()) {
            setMoves([]);
        }
    }


    const giveUpGame = () => {
        resetBoard();
        setGameStats({
            ...gameStats,
            playerTurn: "X",
            player1Wins: 0,
            ties: 0,
            player2Wins: 0
        });
    }

    const deleteCurrentGame = () => {
        resetBoard();
        setGameStats({
            username: "",
            boardType: "",
            playerTurn: "X",
            player1Wins: 0,
            ties: 0,
            player2Wins: 0
        });
    }

    useEffect(() => {
        if (storedBoard) {
            setBoard(storedBoard);
            checkWinner(storedBoard);
        } else {
            setStoredBoard(initialBoard);
        }
    }, []);

    useEffect(() => {
        if ((gameTypeIsSolo() && currentPlayer === "O") && !winner) {
            const timer = setTimeout(playBot, 500);
            return () => clearTimeout(timer);
        }

    }, [currentPlayer]);

    useEffect(() => {
        if (boardType !== "" && username !== "") {
            setGameStats({
                ...gameStats,
                boardType,
                username,
                playerTurn:
                    gameStats.playerTurn
                        ? gameStats.playerTurn
                        : "X"
            })
        }
    }, [username, boardType]);

    useEffect(() => {
        if (gameStats.playerTurn) {
            setCurrentPlayer(gameStats.playerTurn);
        } else {
            setCurrentPlayer("X");
        }
    }, [gameStats.playerTurn]);


    const contextValue = {
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        winner,
        setWinner,
        checkWinner,
        showModal,
        setShowModal,
        resetBoard,
        playBot,
        username,
        setUsername,
        boardType,
        setBoardType,
        gameStats,
        setGameStats,
        storedBoard,
        setStoredBoard,
        giveUpGame,
        gameTypeIsSolo,
        switchCurrentPlayer,
        deleteCurrentGame,
        placeMove
    }

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    )
}
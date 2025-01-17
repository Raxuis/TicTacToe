import {ReactNode, useEffect, useState} from "react";
import {BoardContext} from "@/contexts/BoardContext.tsx";
import {BoardPlayer, GameStats, Player, TicTacToesTypes, Winner} from "@/types";
import {initialBoard} from "@/constants";
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";


export const BoardProvider = ({children}: { children: ReactNode }) => {
    const [board, setBoard] = useLocalStorage<BoardPlayer[][]>("board", initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [username, setUsername] = useState("");
    const [winner, setWinner] = useState<Winner | null>(null);
    const [winningCells, setWinningCells] = useState<number[][]>([]);
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
        const winningPatterns: [number, number][][] = [
            // Lignes
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Colonnes
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonales
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const pattern of winningPatterns) {
            const [[x1, y1], [x2, y2], [x3, y3]] = pattern;

            if (
                tab[x1][y1] !== "" &&
                tab[x1][y1] === tab[x2][y2] &&
                tab[x1][y1] === tab[x3][y3]
            ) {
                setWinner(tab[x1][y1]);
                setWinningCells(pattern);
                setShowModal(true);
                setTimeout(() => {
                    setBoard(initialBoard);
                    setWinningCells([]);
                }, 2000);
                return;
            }
        }

        if (!winner && tab.flat().every((cell) => cell !== "")) {
            setWinner("Draw");
            setShowModal(true);

            setTimeout(() => setBoard(initialBoard), 2000);
        }
    };


    const resetBoard = () => {
        setBoard(initialBoard);
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
        giveUpGame,
        gameTypeIsSolo,
        switchCurrentPlayer,
        deleteCurrentGame,
        placeMove,
        moves,
        winningCells,
        setWinningCells
    }

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    )
}
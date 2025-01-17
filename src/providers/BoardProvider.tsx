import {ReactNode, useEffect, useState} from "react";
import {BoardContext} from "@/contexts/BoardContext.tsx";
import {BoardPlayer, GameStats, Player, ScoreboardType, TicTacToesTypes, Winner} from "@/types";
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
    const [, setScoreboard] = useLocalStorage<ScoreboardType[]>("scoreboard", []);


    const gameTypeIsSolo = (gameType: TicTacToesTypes = boardType) => {
        return gameType.includes("solo");
    }

    const gameTypeIsSpecial = (gameType: TicTacToesTypes = boardType) => {
        return gameType.includes("special");
    }


    const switchCurrentPlayer = (newBoard: BoardPlayer[][]) => {
        if (getWinnerStatus(newBoard)) return;

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
        switchCurrentPlayer(newBoard);
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

    const getWinnerStatus = (tab: BoardPlayer[][]) => {
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

            const winningCondition =
                tab[x1][y1] !== "" &&
                tab[x1][y1] === tab[x2][y2] &&
                tab[x1][y1] === tab[x3][y3];

            if (!winningCondition) continue;
            return {pattern, symbol: tab[x1][y1]};
        }

        return false;
    };

    const checkWinner = (tab: BoardPlayer[][]) => {
            const currentWinner = getWinnerStatus(tab);

            if (currentWinner) {

                let newGameStats = structuredClone(gameStats);
                newGameStats.playerTurn = "X";

                if ("O" === currentWinner.symbol) {
                    if (gameTypeIsSolo() && username) {
                        newGameStats = {
                            ...newGameStats,
                            player1Wins: 0,
                            ties: 0,
                            player2Wins: 0,
                            playerTurn: "X"
                        };

                        const newScoreboard: ScoreboardType = {
                            username: username,
                            boardType: gameStats.boardType,
                            winStreak: gameStats.player1Wins,
                            timestamp: Date.now(),
                        };
                        if (newScoreboard.winStreak > 0) {
                            setScoreboard((prevScoreBoard: ScoreboardType[]) => [...prevScoreBoard, newScoreboard]);
                        }
                    } else {
                        newGameStats.player2Wins++;
                    }
                } else {
                    newGameStats.player1Wins++;
                }

                setGameStats(newGameStats);

                setWinner(currentWinner?.symbol || null);
                setWinningCells(currentWinner?.pattern);
                setShowModal(true);
                setMoves([]);

                setTimeout(() => {
                    setBoard(initialBoard);
                    setWinningCells([]);
                }, 2000);
                return;
            }

            if (!winner && tab.flat().every((cell) => cell !== "")) {
                setWinner("Draw");
                setShowModal(true);
                setMoves([]);

                setGameStats((prevStats: GameStats) => ({
                    ...prevStats,
                    playerTurn: "X",
                    ties: (prevStats.ties || 0) + 1
                }));

                setTimeout(() => setBoard(initialBoard), 2000);
            }
        }
    ;


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
            setGameStats((prevStats) => ({
                ...prevStats,
                boardType,
                username,
                playerTurn: prevStats.playerTurn || "X"
            }));
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
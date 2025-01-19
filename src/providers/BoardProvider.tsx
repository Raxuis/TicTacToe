import {ReactNode, useEffect, useState} from "react";
import {BoardContext} from "@/contexts/BoardContext.tsx";
import {BoardPlayer, GameModeTypes, GameStats, Player, ScoreboardType, Winner} from "@/types";
import {initialBoard} from "@/constants";
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";


export const BoardProvider = ({children}: { children: ReactNode }) => {
    const [board, setBoard] = useLocalStorage<BoardPlayer[][]>("board", initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [username, setUsername] = useState("");
    const [winner, setWinner] = useState<Winner | null>(null);
    // 👇 Permet de stocker les cellules gagnantes pour les mettre en surbrillance plus tard
    const [winningCells, setWinningCells] = useState<number[][]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [gameMode, setGameMode] = useState<GameModeTypes>("");
    const [gameStats, setGameStats] = useLocalStorage<GameStats>("gameStats", {
        username: "",
        gameMode: "",
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


    const gameTypeIsSolo = (gameType: GameModeTypes = gameMode) => {
        return gameType.includes("solo");
    }

    const gameTypeIsSpecial = (gameType: GameModeTypes = gameMode) => {
        return gameType.includes("special");
    }

    const isGameTie = (newBoard: BoardPlayer[][]) => {
        return newBoard.flat().every(cell => cell !== "");
    }

    const switchCurrentPlayer = (newBoard: BoardPlayer[][]) => {
        if (getWinnerStatus(newBoard) || isGameTie(newBoard)) return;

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
            // Pattern pour check si les 3 cases sont identiques
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
                    // Check si le mot de jeu est solo et si le nom d'utilisateur est défini
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
                            gameMode: gameStats.gameMode,
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

            if (!currentWinner && isGameTie(tab)) {
                setWinner("Draw");
                setShowModal(true);

                setGameStats((prevStats: GameStats) => ({
                    ...prevStats,
                    playerTurn: "X",
                    ties: prevStats.ties + 1
                }));

                setMoves([]);
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
            gameMode: "",
            playerTurn: "X",
            player1Wins: 0,
            ties: 0,
            player2Wins: 0
        });
    }

    useEffect(() => {
        // Permet de faire jouer le bot 🤖
        if ((gameTypeIsSolo() && currentPlayer === "O") && !winner) {
            const timer = setTimeout(playBot, 500);
            return () => clearTimeout(timer);
        }

    }, [currentPlayer]);

    useEffect(() => {
        if (gameMode !== "" && username !== "") {
            setGameStats((prevStats) => ({
                ...prevStats,
                gameMode,
                username,
                playerTurn: prevStats.playerTurn || "X"
            }));
        }
    }, [username, gameMode]);


    useEffect(() => {
        if (gameStats.playerTurn) {
            setCurrentPlayer(gameStats.playerTurn);
        } else {
            setCurrentPlayer("X");
        }
    }, [gameStats.playerTurn]);


    const contextValue = {
        board,
        currentPlayer,
        winner,
        showModal,
        setShowModal,
        resetBoard,
        username,
        setUsername,
        gameMode,
        setGameMode,
        gameStats,
        giveUpGame,
        gameTypeIsSolo,
        gameTypeIsSpecial,
        deleteCurrentGame,
        placeMove,
        moves,
        winningCells
    }

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    )
}
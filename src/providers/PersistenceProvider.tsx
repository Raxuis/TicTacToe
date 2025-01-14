import {ReactNode, useContext} from "react";
import {PersistenceContext} from "../contexts/PersistenceContext.tsx";
import {GameStats} from "../types";
import {BoardContext} from "../contexts/BoardContext.tsx";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";

type RankingEntry = Record<string, number>;

export const PersistenceProvider = ({children}: { children: ReactNode }) => {

    const [, setRanking] = useLocalStorage<RankingEntry>("ranking", {});

    const {
        username,
        winner,
        setGameStats,
        resetBoard,
        setShowModal
    } = useContext(BoardContext);


    const handleClick = (action: "NEXT" | "QUIT") => {
        if (winner !== "Draw" && winner !== null && winner !== "O" && username) {
            setRanking(prevRanking => ({
                ...prevRanking,
                [username]: (prevRanking[username] || 0) + 1
            }));
        }

        if (action === "NEXT" && winner !== null) {
            setGameStats((prevStats: GameStats) => {
                const updatedStats = {...prevStats};

                if (winner === "X") {
                    updatedStats.player1Wins = (prevStats.player1Wins || 0) + 1;
                } else if (winner === "O") {
                    updatedStats.player2Wins = (prevStats.player2Wins || 0) + 1;
                } else if (winner === "Draw") {
                    updatedStats.ties = (prevStats.ties || 0) + 1;
                }

                return updatedStats;
            });
        } else if (action === "QUIT") {
            setGameStats({
                player1Wins: 0,
                ties: 0,
                player2Wins: 0,
            });
        }

        if (action === "NEXT") {
            resetBoard();
        } else if (action === "QUIT") {
            resetBoard();
        }

        setShowModal(false);
    };

    const contextValue = {
        handleClick
    };

    return (
        <PersistenceContext.Provider value={contextValue}>
            {children}
        </PersistenceContext.Provider>
    )
}

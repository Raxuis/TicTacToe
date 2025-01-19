import {ReactNode, useState} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";
import {ScoreboardContext} from "@/contexts/ScoreboardContext.tsx";

export const ScoreboardProvider = ({children}: { children: ReactNode }) => {
    const [scoreboard] = useLocalStorage<ScoreboardType[]>("scoreboard", []);
    // Filter est initialisé à "WIN_STREAK" comme demandé, mais modifiable quand même
    const [filter, setFilter] = useState<"WIN_STREAK" | "DATE">("WIN_STREAK");

    const sortedScoreboardByWinStreak: ScoreboardType[] = [...scoreboard].sort(
        (a, b) => b.winStreak - a.winStreak
    );

    const scoreboardWithRank: ScoreboardTypeWithRank[] = sortedScoreboardByWinStreak.reduce(
        (acc: ScoreboardTypeWithRank[], curr: ScoreboardType, idx: number) => {
            if (idx === 0) {
                return [...acc, {...curr, rank: 1}];
            }

            const prevScore = acc[idx - 1];
            const rank =
                curr.winStreak === prevScore.winStreak ? prevScore.rank : idx + 1;

            return [...acc, {...curr, rank}];
        },
        []
    );

    const sortedScoreboardByTimestamp = [...scoreboardWithRank].sort(
        (a, b) => b.timestamp - a.timestamp
    );


    const filteredScoreboard =
        filter === "WIN_STREAK"
            ? scoreboardWithRank
            : sortedScoreboardByTimestamp;

    const contextValue = {
        scoreboard,
        filteredScoreboard,
        filter,
        setFilter,
    };

    return (
        <ScoreboardContext.Provider value={contextValue}>
            {children}
        </ScoreboardContext.Provider>
    );
}
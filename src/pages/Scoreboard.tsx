import {useLocalStorage} from "@/hooks/useLocalStorage";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";
import ScoreboardTable from "@/components/ScoreboardTable";
import {useState} from "react";
import FilterScoreboard from "@/components/ScoreboardTable/FilterScoreboard";

const Scoreboard = () => {
    const [scoreboard] = useLocalStorage<ScoreboardType[]>("scoreboard", []);
    const [filter, setFilter] = useState<"WIN_STREAK" | "DATE">("DATE");

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

    return (
        <div className="overflow-x-auto">
            {scoreboard.length === 0 ? (
                <p className="text-center text-lg">No games have been played yet</p>
            ) : (
                <>
                    <ScoreboardTable scoreboard={filteredScoreboard}/>
                    <FilterScoreboard setFilter={setFilter}/>
                </>
            )}
        </div>
    );
};

export default Scoreboard;

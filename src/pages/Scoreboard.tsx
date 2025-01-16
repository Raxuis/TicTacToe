import {useLocalStorage} from "@/hooks/useLocalStorage.ts";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";
import ScoreboardTable from "@/components/ScoreboardTable";

const Scoreboard = () => {
    const [scoreboard,] = useLocalStorage<ScoreboardType[]>("scoreboard", []);

    const sortedScoreboardByWinStreak: ScoreboardType[] = scoreboard.sort(
        (a, b) => b.winStreak - a.winStreak)

    const scoreboardWithRank: ScoreboardTypeWithRank[] = sortedScoreboardByWinStreak.reduce(
        (acc: ScoreboardTypeWithRank[], curr: ScoreboardType, idx: number) => {
            if (idx === 0) {
                return [...acc, {...curr, rank: 1}];
            }

            const prevScore = acc[idx - 1];
            const rank = curr.winStreak === prevScore.winStreak
                ? prevScore.rank
                : idx + 1;

            return [...acc, {...curr, rank}];
        },
        []
    );

    const sortedScoreboardByTimestamp = scoreboardWithRank.sort((
        a: ScoreboardTypeWithRank, b: ScoreboardTypeWithRank) => b.timestamp - a.timestamp)


    return (
        <div className="overflow-x-auto">
            <ScoreboardTable scoreboard={sortedScoreboardByTimestamp}/>
        </div>
    );
};

export default Scoreboard;
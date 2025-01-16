import {useLocalStorage} from "@/hooks/useLocalStorage.ts";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";
import {ticTacToes} from "@/constants";

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

    const getCorrespondingBoardType = (boardType: string) => {
        return ticTacToes.find(ticTacToe => ticTacToe.value === boardType)?.title;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-md text-primary font-light cursor-default">
                <thead>
                    <tr className="text-primary text-lg text-center">
                        <th></th>
                        <th>Username</th>
                        <th>Win Streak</th>
                        <th>Time</th>
                        <th>Board Type</th>
                    </tr>
                </thead>
                <tbody>
                {
                    sortedScoreboardByTimestamp.map((score, idx) => (
                        <tr key={idx} className="hover text-center">
                            <td>{score.rank}</td>
                            <td>{score.username}</td>
                            <td>{score.winStreak}</td>
                            <td>{new Date(score.timestamp).toLocaleString()}</td>
                            <td>{getCorrespondingBoardType(score.boardType)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default Scoreboard;
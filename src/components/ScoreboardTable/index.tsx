import {ticTacToes} from "@/constants";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";
import {Crown} from "lucide-react";

const ScoreboardTable = ({scoreboard}: {
    scoreboard: ScoreboardTypeWithRank[] | ScoreboardType[]
}) => {
    const getCorrespondingBoardType = (boardType: string) => {
        return ticTacToes.find(ticTacToe => ticTacToe.value === boardType)?.title;
    }

    const containsRank = (scoreboard: ScoreboardTypeWithRank[] | ScoreboardType[]): scoreboard is ScoreboardTypeWithRank[] => {
        return (scoreboard as ScoreboardTypeWithRank[])[0].rank !== undefined;
    }

    return (
        <table className="table table-md text-gray-dark dark:text-primary font-light cursor-default max-sm:mx-5">
            <thead>
            <tr className="text-gray-dark dark:text-primary text-lg text-center">
                <th></th>
                <th>Username</th>
                <th>Win Streak</th>
                <th>Board Type</th>
                <th>Played At</th>
            </tr>
            </thead>
            <tbody>
            {
                containsRank(scoreboard)
                    ? scoreboard.map((score, idx) => (
                        <tr key={idx} className="text-center">
                            <td>
                                {score.rank === 1 ?
                                    (
                                        <div className="flex items-center gap-2 text-secondary">
                                            <Crown className="size-4"/>
                                            <span className="underline">
                                        {
                                            score.rank
                                        }
                                        </span>
                                        </div>
                                    ) : score.rank
                                }
                            </td>
                            <td>{score.username}</td>
                            <td>{score.winStreak}</td>
                            <td>{getCorrespondingBoardType(score.boardType)}</td>
                            <td>{new Date(score.timestamp).toLocaleString()}</td>
                        </tr>
                    )) : scoreboard.map((score, idx) => (
                        <tr key={idx} className="text-center">
                            <td>{idx + 1}</td>
                            <td>{score.username}</td>
                            <td>{score.winStreak}</td>
                            <td>{getCorrespondingBoardType(score.boardType)}</td>
                            <td>{new Date(score.timestamp).toLocaleString()}</td>
                        </tr>
                    ))
            }
            </tbody>
        </table>
    );
};

export default ScoreboardTable;
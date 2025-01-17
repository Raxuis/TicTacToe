import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";
import {Crown} from "lucide-react";
import {getCorrespondingBoardType, containsRank} from "@/utils";

const ScoreboardTable = ({scoreboard}: {
    scoreboard: ScoreboardTypeWithRank[] | ScoreboardType[]
}) => {
    return (
        <table className="table table-md text-gray-dark dark:text-primary font-light cursor-default">
            <thead>
            <tr className="text-gray-dark dark:text-primary text-lg text-center">
                <th></th>
                <th>Username</th>
                <th>Win Streak</th>
                <th>Board Type</th>
                <th className="max-sm:hidden">Played At</th>
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
                                        <div className="flex items-center gap-2 text-secondary justify-center">
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
                            <td className="max-sm:hidden">{new Date(score.timestamp).toLocaleString()}</td>
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
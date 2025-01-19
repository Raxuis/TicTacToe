import {ticTacToes} from "@/constants";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";

export const getCorrespondingBoardType = (gameMode: string) => {
    return ticTacToes.find(ticTacToe => ticTacToe.value === gameMode)?.title;
}

export const containsRank = (scoreboard: ScoreboardTypeWithRank[] | ScoreboardType[]): scoreboard is ScoreboardTypeWithRank[] => {
    return (scoreboard as ScoreboardTypeWithRank[])[0].rank !== undefined;
}
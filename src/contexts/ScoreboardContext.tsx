import {createContext, Dispatch, SetStateAction} from "react";
import {ScoreboardType, ScoreboardTypeWithRank} from "@/types";

export type ScoreboardContextType = {
    filter: "WIN_STREAK" | "DATE";
    scoreboard: ScoreboardType[];
    filteredScoreboard: ScoreboardTypeWithRank[];
    setFilter: Dispatch<SetStateAction<"WIN_STREAK" | "DATE">>;
}

export const ScoreboardContext = createContext<ScoreboardContextType>({
    filter: "WIN_STREAK",
    scoreboard: [],
    filteredScoreboard: [],
    setFilter: () => {
    }
})
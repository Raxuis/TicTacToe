import {useContext} from "react";
import {ScoreboardContext, ScoreboardContextType} from "@/contexts/ScoreboardContext.tsx";

export const useScoreboard = (): ScoreboardContextType => {
    return useContext(ScoreboardContext);
}
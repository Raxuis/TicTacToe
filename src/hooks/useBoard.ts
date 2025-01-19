import {useContext} from "react";
import {BoardContext, BoardContextType} from "@/contexts/BoardContext.tsx";

export const useBoard = (): BoardContextType => {
    return useContext(BoardContext);
}
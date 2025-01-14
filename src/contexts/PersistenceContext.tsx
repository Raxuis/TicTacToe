import {createContext} from "react";

type PersistenceContextType = {
    handleClick: (action: "NEXT" | "QUIT") => void;
}

export const PersistenceContext = createContext<PersistenceContextType>({
    handleClick: () => {}
})

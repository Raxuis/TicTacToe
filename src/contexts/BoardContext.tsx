import {createContext, SetStateAction, Dispatch} from "react";
import {BoardPlayer, GameStats, Player, TicTacToesTypes, Winner} from "../types";
import {initialBoard} from "../constants";

type BoardContextType = {
    giveUpGame: () => void;
    resetBoard: () => void;
    board: BoardPlayer[][];
    setBoard: Dispatch<SetStateAction<BoardPlayer[][]>>;
    currentPlayer: Player;
    setCurrentPlayer: Dispatch<SetStateAction<Player>>;
    winner: Winner | null;
    setWinner: Dispatch<SetStateAction<Winner | null>>;
    checkWinner: (tab: BoardPlayer[][]) => void;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    playBot: () => void;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    boardType: TicTacToesTypes;
    setBoardType: Dispatch<SetStateAction<TicTacToesTypes>>;
    gameStats: GameStats;
    setGameStats: Dispatch<SetStateAction<GameStats>>;
    storedBoard: BoardPlayer[][];
    setStoredBoard: Dispatch<SetStateAction<BoardPlayer[][]>>
}

export const BoardContext = createContext<BoardContextType>({
    giveUpGame: () => {
    },
    resetBoard: () => {
    },
    board: initialBoard,
    setBoard: () => {
    },
    currentPlayer: "X",
    setCurrentPlayer: () => {
    },
    winner: null,
    setWinner: () => {
    },
    checkWinner: () => {
    },
    showModal: false,
    setShowModal: () => {
    },
    playBot: () => {
    },
    username: "",
    setUsername: () => {
    },
    boardType: "",
    setBoardType: () => {
    },
    gameStats: {
        player1Wins: 0,
        ties: 0,
        player2Wins: 0
    },
    setGameStats: () => {
    },
    storedBoard: initialBoard,
    setStoredBoard: () => {
    }
});
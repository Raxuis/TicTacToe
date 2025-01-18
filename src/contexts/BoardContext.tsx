import {createContext, SetStateAction, Dispatch} from "react";
import {BoardPlayer, GameStats, Player, TicTacToesTypes, Winner} from "@/types";
import {initialBoard} from "@/constants";

export type BoardContextType = {
    giveUpGame: () => void;
    deleteCurrentGame: () => void;
    resetBoard: () => void;
    board: BoardPlayer[][];
    currentPlayer: Player;
    winner: Winner | null;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    boardType: TicTacToesTypes;
    setBoardType: Dispatch<SetStateAction<TicTacToesTypes>>;
    gameStats: GameStats;
    gameTypeIsSolo: (gameType?: TicTacToesTypes) => boolean;
    gameTypeIsSpecial: (gameType?: TicTacToesTypes) => boolean;
    placeMove: (col: number, row: number) => void;
    moves: Array<{
        player: Player,
        position: [number, number]
    }>;
    winningCells: number[][];
}

export const BoardContext = createContext<BoardContextType>({
    giveUpGame: () => {
    },
    deleteCurrentGame: () => {
    },
    resetBoard: () => {
    },
    board: initialBoard,
    currentPlayer: "X",
    winner: null,
    showModal: false,
    setShowModal: () => {
    },
    username: "",
    setUsername: () => {
    },
    boardType: "",
    setBoardType: () => {
    },
    gameStats: {
        username: "",
        boardType: "",
        player1Wins: 0,
        ties: 0,
        player2Wins: 0,
        playerTurn: "X"
    },
    gameTypeIsSolo: () => false,
    gameTypeIsSpecial: () => false,
    placeMove: () => {
    },
    moves: [],
    winningCells: [],
});
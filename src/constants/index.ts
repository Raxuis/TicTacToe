import {BoardPlayer, TicTacToe} from "@/types";

export const initialBoard: BoardPlayer[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];


export const ticTacToes: TicTacToe[] = [
    {
        title: "Solo",
        value: "solo"
    },
    {
        title: "Versus",
        value: "versus"
    },
    {
        title: "Solo en 3 coups",
        value: "solo-special"
    },
    {
        title: "Versus en 3 coups",
        value: "versus-special"
    }]
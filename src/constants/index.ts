export type Player = "X" | "O";

export type Winner = Player | "Draw";

export type BoardPlayer = Player | "";

export const initialBoard: BoardPlayer[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

export type TicTacToe = {
    title: string;
    value: string;
}

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
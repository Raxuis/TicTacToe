export type Player = "X" | "O";

export type Winner = Player | "Draw";

export type BoardPlayer = Player | "";

export const initialBoard: BoardPlayer[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
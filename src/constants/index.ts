export type Player = "X" | "O";

export type BoardPlayer = Player | "";

export const initialBoard: BoardPlayer[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
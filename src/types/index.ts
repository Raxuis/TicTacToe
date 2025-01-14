import {ticTacToes} from "../constants";

export type TicTacToe = {
    title: string;
    value: string;
}


export type Player = "X" | "O";

export type Winner = Player | "Draw";

export type BoardPlayer = Player | "";

export type TicTacToesTypes = typeof ticTacToes[number]['value']

export type PlayersInfoCellTypes = "Player1Wins" | "Player2Wins" | "Ties"

export type GameStats = {
    player1Wins: number,
    ties: number,
    player2Wins: number
}
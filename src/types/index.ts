import {ticTacToes} from "@/constants";

export type TicTacToe = {
    title: string;
    value: string;
}


export type Player = "X" | "O";

export type Winner = Player | "Draw";

export type BoardPlayer = Player | "";

export type GameModeTypes = typeof ticTacToes[number]['value']

export type PlayersInfoCellTypes = "Player1Wins" | "Player2Wins" | "Ties"

export type GameStats = {
    username: string,
    gameMode: GameModeTypes
    player1Wins: number,
    ties: number,
    player2Wins: number,
    playerTurn: Player
}

export type ScoreboardType = {
    username: string,
    winStreak: number,
    timestamp: number,
    gameMode: GameModeTypes
}

export type ScoreboardTypeWithRank = ScoreboardType & {
    rank: number
}
import {BoardPlayer, TicTacToe} from "@/types";

export const initialBoard: BoardPlayer[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

// Création d'un dictionnaire de jeux de morpion
// pour simplifier la sélection du mode de jeu dans le formulaire de la page d'accueil.

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
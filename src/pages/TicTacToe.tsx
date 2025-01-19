import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import Board from "@/components/Game/Board";
import PlayersInfo from "@/components/Game/PlayersInfo";
import HeaderBoard from "@/components/Game/Board/HeaderBoard";
import {GameModeTypes} from "@/types";
import {useBoard} from "@/hooks/useBoard.tsx";
import DeleteCurrentGame from "@/components/Game/Board/DeleteCurrentGame";
import GameDescription from "@/components/Game/GameDescription";
import WinnerInfo from "@/components/Game/WinnerInfo";
import {motion} from "motion/react";

const TicTacToe = () => {
    const {
        setUsername,
        setGameMode,
        gameTypeIsSolo
    } = useBoard();

    const navigate = useNavigate();

    const location = useLocation();

    // Je récupère les données de la page précédente
    useEffect(() => {
        const username: string = location.state?.username;
        const gameMode: GameModeTypes = location.state?.gameMode;

        if (
            (
                !username &&
                gameTypeIsSolo(gameMode)
            ) || !gameMode
        ) {
            navigate("/");
        } else {
            setUsername(username);
            setGameMode(gameMode);
        }
    }, []);


    return (
        <motion.div
            className="flex flex-col justify-center items-center"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <HeaderBoard/>

            <GameDescription/>

            <Board/>

            <PlayersInfo/>

            <WinnerInfo/>

            <DeleteCurrentGame/>
        </motion.div>
    );
};

export default TicTacToe;
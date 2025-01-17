import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import Board from "@/components/Game/Board";
import PlayersInfo from "@/components/Game/PlayersInfo";
import HeaderBoard from "@/components/Game/Board/HeaderBoard";
import {TicTacToesTypes} from "@/types";
import {useBoard} from "@/hooks/useBoard.tsx";
import DeleteCurrentGame from "@/components/Game/Board/DeleteCurrentGame";
import GameDescription from "@/components/Game/GameDescription";
import WinnerInfo from "@/components/Game/WinnerInfo";

const TicTacToe = () => {
    const {
        setUsername,
        setBoardType,
        gameTypeIsSolo
    } = useBoard();

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const username: string = location.state?.username;
        const boardType: TicTacToesTypes = location.state?.boardType;

        if (
            (
                !username &&
                gameTypeIsSolo(boardType)
            ) || !boardType
        ) {
            navigate("/");
        } else {
            setUsername(username);
            setBoardType(boardType);
        }
    }, []);


    return (
        <div className="flex flex-col justify-center items-center">
            <HeaderBoard/>

            <GameDescription/>

            <Board/>

            <PlayersInfo/>

            <WinnerInfo/>

            <DeleteCurrentGame/>
        </div>
    );
};

export default TicTacToe;
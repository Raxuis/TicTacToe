import {useEffect} from "react";
import WinnerInfo from "../components/WinnerInfo";
import {useLocation, useNavigate} from "react-router";
import Board from "../components/Board";
import PlayersInfo from "../components/PlayersInfo";
import HeaderBoard from "../components/Board/HeaderBoard";
import {TicTacToesTypes} from "../types";
import {useBoard} from "../hooks/useBoard.tsx";
import DeleteCurrentGame from "../components/Board/DeleteCurrentGame";

const TicTacToe = () => {
    const {
        setUsername,
        boardType,
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
                gameTypeIsSolo
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

            <Board/>

            <PlayersInfo boardType={boardType}/>

            <WinnerInfo/>

            <DeleteCurrentGame />
        </div>
    );
};

export default TicTacToe;
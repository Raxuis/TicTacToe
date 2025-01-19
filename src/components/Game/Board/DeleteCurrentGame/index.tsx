import ButtonClickEffect from "@/components/ButtonClickEffect";
import {useBoard} from "@/hooks/useBoard.tsx";
import {useNavigate} from "react-router";

const DeleteCurrentGame = () => {
    const {deleteCurrentGame} = useBoard();
    const navigate = useNavigate();
    return (
        <ButtonClickEffect className="text-primary mt-6 shadow-buttonGrey hover:bg-gray-medium/90 dark:hover:bg-gray-medium/50" onClick={() => {
            deleteCurrentGame();
            navigate("/");
        }}>
            Delete Current Game
        </ButtonClickEffect>
    );
};

export default DeleteCurrentGame;
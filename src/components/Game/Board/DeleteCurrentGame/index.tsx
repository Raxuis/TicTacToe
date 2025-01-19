import ButtonClickEffect from "@/components/ButtonClickEffect";
import {useBoard} from "@/hooks/useBoard.ts";
import {useNavigate} from "react-router";

// Ici, je crée un bouton qui permet de supprimer la partie en cours.
// Cependant, si l'utilisateur est en partie, cela n'enregistre pas la win streak

const DeleteCurrentGame = () => {
    const {deleteCurrentGame} = useBoard();
    const navigate = useNavigate();
    return (
        <ButtonClickEffect
            className="text-primary mt-6 hover:bg-gray-medium/90 dark:hover:bg-gray-medium/50"
            onClick={() => {
                deleteCurrentGame();
                navigate("/");
            }}>
            Delete Current Game
        </ButtonClickEffect>
    );
};

export default DeleteCurrentGame;
import {RotateCcw} from "lucide-react";
import Button from "../../../Button";
import {useContext} from "react";
import {BoardContext} from "../../../../contexts/BoardContext.tsx";
import {useNavigate} from "react-router";

const ResetButton = () => {
    const {giveUpGame} = useContext(BoardContext);
    const navigate = useNavigate();
    return (
        <Button onClick={() => {
            giveUpGame()
            navigate("/");
        }}
                className="bg-primary text-gray-dark shadow-buttonGreyLight active:shadow-none active:translate-y-1">
            <RotateCcw/>
        </Button>
    );
};

export default ResetButton;
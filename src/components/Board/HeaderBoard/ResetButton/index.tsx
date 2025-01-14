import {RotateCcw} from "lucide-react";
import Button from "../../../Button";
import {useContext} from "react";
import {BoardContext} from "../../../../contexts/BoardContext.tsx";

const ResetButton = () => {
    const {giveUpGame} = useContext(BoardContext);
    return (
        <Button onClick={() => giveUpGame()}
                className="bg-primary text-gray-dark shadow-buttonGreyLight active:shadow-none active:translate-y-1">
            <RotateCcw/>
        </Button>
    );
};

export default ResetButton;
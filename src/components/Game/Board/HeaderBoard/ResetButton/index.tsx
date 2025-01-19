import {RotateCcw} from "lucide-react";
import {useBoard} from "@/hooks/useBoard.ts";
import ButtonClickEffect from "@/components/ButtonClickEffect";

const ResetButton = () => {
    const {giveUpGame} = useBoard();
    return (
        <ButtonClickEffect onClick={() => giveUpGame()}
                className="bg-primary hover:bg-primary/90 text-gray-dark shadow-buttonGreyLight">
            <RotateCcw/>
        </ButtonClickEffect>
    );
};

export default ResetButton;
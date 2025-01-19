import {RotateCcw} from "lucide-react";
import Button from "@/components/Button";
import {useBoard} from "@/hooks/useBoard.tsx";

const ResetButton = () => {
    const {giveUpGame} = useBoard();
    return (
        <Button onClick={() => giveUpGame()}
                className="bg-primary hover:bg-primary/90 text-gray-dark shadow-buttonGreyLight active:shadow-none active:translate-y-1">
            <RotateCcw/>
        </Button>
    );
};

export default ResetButton;
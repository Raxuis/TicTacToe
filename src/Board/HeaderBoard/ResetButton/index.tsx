import {RotateCcw} from "lucide-react";
import Button from "../../../Button";

const ResetButton = ({resetBoard}: { resetBoard: () => void }) => {
    return (
        <Button onClick={() => resetBoard()} className="bg-primary text-gray-dark shadow-buttonGreyLight active:shadow-none active:translate-y-1">
            <RotateCcw/>
        </Button>
    );
};

export default ResetButton;
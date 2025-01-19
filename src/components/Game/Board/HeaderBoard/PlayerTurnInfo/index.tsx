import cross from "@/assets/cross.svg";
import circle from "@/assets/circle.svg";
import {useBoard} from "@/hooks/useBoard.ts";

const PlayerTurnInfo = () => {
    const {currentPlayer} = useBoard();

    const textColor =
        currentPlayer === "O"
            ? "text-primary-dark"
            : "text-primary";
    return (
        <div className="block shadow-buttonGrey bg-gray-medium rounded-lg">
            <div
                className="flex gap-4 items-center justify-center p-2 px-4">
                <img src={currentPlayer === "X" ? cross : circle} alt={`${currentPlayer} turn`}
                     className="object-cover size-5"/>
                <p className={`${textColor} font-bold`}>TURN</p>
            </div>
        </div>
    );
};

export default PlayerTurnInfo;
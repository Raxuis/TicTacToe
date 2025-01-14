import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg";
import {Player} from "../types";

const CurrentPlayerInfo = ({currentPlayer}: { currentPlayer: Player }) => {
    const textColor =
        currentPlayer === "O"
            ? "text-primary-dark"
            : "text-primary";
    return (
        <div className="block">
            <div className="flex gap-4 items-center justify-center bg-gray-medium rounded-lg shadow-2xl shadow-primary/10 p-2 px-4">
                {
                    currentPlayer === "X" ? (
                        <img src={cross} alt="cross" className="object-cover size-5"/>
                    ) : (
                        <img src={circle} alt="circle" className="object-cover size-5"/>
                    )
                }
                <p className={`${textColor} font-bold`}>TURN</p>
            </div>
        </div>
    );
};

export default CurrentPlayerInfo;
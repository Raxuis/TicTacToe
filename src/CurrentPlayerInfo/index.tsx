import {Player} from "../constants";
import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg";

const CurrentPlayerInfo = ({currentPlayer}: { currentPlayer: Player }) => {
    const textColor =
        currentPlayer === "O"
            ? "text-primary-dark"
            : "text-primary";
    return (
        <div className="inline-block bg-cell p-2 rounded-xl shadow-2xl shadow-primary/10">
            {
                currentPlayer === "X" ? (
                    <img src={cross} alt="cross"/>
                ) : (
                    <img src={circle} alt="circle"/>
                )
            }
            <p className={`${textColor} font-bold`}>TURN</p>
        </div>
    );
};

export default CurrentPlayerInfo;
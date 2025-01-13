import {BoardPlayer} from "../constants";
import cross from "../assets/cross.svg";
import circle from "../assets/circle.svg";

const Cell = (
    {cellValue, onClick}: { cellValue: BoardPlayer, onClick: () => void }) => {
    return (
        <div
            className="bg-medium-gray size-20 flex items-center justify-center text-xl font-bold cursor-pointer p-4 rounded-lg"
            onClick={onClick}
        >
            {cellValue === "X" ? (
                <img src={cross} alt="cross"/>
            ) : cellValue === "O" ? (
                <img src={circle} alt="circle"/>
            ) : cellValue}
        </div>
    );
};

export default Cell;
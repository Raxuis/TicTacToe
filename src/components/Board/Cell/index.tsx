import cross from "@/assets/cross.svg";
import circle from "@/assets/circle.svg";
import {BoardPlayer} from "@/types";

const Cell = (
    {cellValue, onClick}: { cellValue: BoardPlayer, onClick: () => void }) => {
    return (
        <div
            className="bg-gray-medium size-24
            flex items-center justify-center text-xl font-bold cursor-pointer
            p-4 rounded-lg shadow-cellGreyShadow active:shadow-none active:translate-y-1"
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
import Cell from "./Cell";
import {useContext} from "react";
import {BoardContext} from "../../contexts/BoardContext.tsx";

const Board = () => {
    const {board, handleClick} = useContext(BoardContext);

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 place-items-center">
            {
                board.map((row, rowIndex) =>
                    row.map((cellValue, colIndex) => {
                        return (
                            <Cell cellValue={cellValue}
                                  key={`${rowIndex}-${colIndex}`}
                                  onClick={() => handleClick(rowIndex, colIndex)}
                            />
                        )
                    })
                )}
        </div>
    );
};

export default Board;
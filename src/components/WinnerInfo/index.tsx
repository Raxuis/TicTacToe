import Button from "../Button";
import {cn} from "../../libs/cn.ts";
import {useContext} from "react";
import {BoardContext} from "../../contexts/BoardContext.tsx";
import {PersistenceContext} from "../../contexts/PersistenceContext.tsx";
import {useNavigate} from "react-router";

const WinnerInfo = () => {
    const {
        winner,
        showModal
    } = useContext(BoardContext);

    const {handleClick} = useContext(PersistenceContext);

    const navigate = useNavigate();

    const textColor = winner === "O"
        ? "text-primary-dark"
        : "text-primary";

    return (
        showModal && (
            <dialog id="my_modal_2" className="modal bg-black/50" open={showModal}>
                <div className="modal-box bg-gray-medium">
                    {winner === "Draw" ? (
                        <h3 className="font-bold text-lg">
                            Ahhh, that's a draw...
                        </h3>
                    ) : (
                        <h3 className={cn('font-bold text-lg', textColor)}>
                            Youhou, <span className="underline">{winner ?? ""}</span> won !! 🥳
                        </h3>
                    )}
                    <div className="flex justify-center gap-4 pt-2">
                        <Button className="bg-primary text-medium-gray cursor-pointer"
                                onClick={() => {
                                    handleClick("QUIT");
                                    navigate("/");
                                }}>
                            QUIT
                        </Button>
                        <Button className="bg-secondary text-medium-gray cursor-pointer"
                                onClick={() => handleClick("NEXT")}>
                            NEXT ROUND
                        </Button>
                    </div>
                </div>
            </dialog>
        )
    )
};

export default WinnerInfo;
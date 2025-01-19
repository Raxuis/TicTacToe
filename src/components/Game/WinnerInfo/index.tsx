import {useNavigate} from "react-router";
import {useBoard} from "@/hooks/useBoard.ts";
import ButtonClickEffect from "../../ButtonClickEffect";
import cross from "@/assets/cross.svg";
import circle from "@/assets/circle.svg";
import {cn} from "@/libs/cn.ts";


const WinnerInfo = () => {

    const {
        winner,
        showModal,
        setShowModal,
        resetBoard,
        gameTypeIsSolo,
    } = useBoard();


    const handleClick = () => {
        resetBoard();
        setShowModal(false);
    };

    const navigate = useNavigate();

    const textColor = winner === "O"
        ? "text-primary-dark"
        : "text-primary";

    return (
        showModal && (
            <dialog id="my_modal_2" className="modal bg-black/50" open={showModal}>
                <div className="modal-box bg-gray-medium">
                    <div className="flex flex-col items-center text-xl uppercase font-bold">
                        {winner === "Draw" ? (
                            <h3 className="text-gray-light">
                                Ahhh, that's a draw...
                            </h3>
                        ) : (
                            <h3 className={textColor}>
                                {
                                    gameTypeIsSolo()
                                        ? winner === "O" ? "CPU " : "You "
                                        : winner + " "
                                }
                                won !! 🥳
                            </h3>
                        )}
                    </div>
                    {
                        winner !== "Draw" && (
                            <div className={cn('py-4 block uppercase text-4xl font-bold', textColor)}>
                                <div className="flex justify-center items-center gap-6">
                                    <img src={winner === "O" ? circle : cross} alt="cross"
                                         className="size-20 object-cover"/>
                                    <p>Takes the round</p>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex justify-center gap-4 pt-2">
                        <ButtonClickEffect className="bg-primary hover:bg-primary/90 text-gray-dark cursor-pointer shadow-buttonGreyLight"
                                           onClick={() => {
                                               handleClick();
                                               navigate("/");
                                           }}>
                            QUIT
                        </ButtonClickEffect>
                        <ButtonClickEffect
                            className="bg-secondary hover:bg-secondary/90 text-gray-dark cursor-pointer shadow-buttonSecondary"
                            onClick={() => handleClick()}>
                            NEXT ROUND
                        </ButtonClickEffect>
                    </div>
                </div>
            </dialog>
        )
    )
};

export default WinnerInfo;
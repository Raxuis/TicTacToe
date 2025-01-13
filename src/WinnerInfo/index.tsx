import {Winner} from "../constants";
import Button from "../Button";
import {cn} from "../libs/utils.ts";

type Props = {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void,
    winner: Winner,
}

const WinnerInfo = (
    {showModal, setShowModal, winner}: Props) => {
    const textColor = winner === "O"
        ? "text-primary-dark"
        : "text-primary";
    return (
        showModal && (
            <dialog id="my_modal_2" className="modal bg-black/50" open={showModal}>
                <div className="modal-box bg-medium-gray">
                    {winner === "Draw" ? (
                        <h3 className="font-bold text-lg">
                            Ahhh, that's a draw...
                        </h3>
                    ) : (
                        <h3 className={cn('font-bold text-lg', textColor)}>
                            Youhou, <span className="underline">{winner}</span> won !! 🥳
                        </h3>
                    )}
                    <div className="flex justify-center gap-4 pt-2">
                        <Button className="bg-primary text-medium-gray cursor-pointer" onClick={() => setShowModal(false)}>
                            QUIT
                        </Button>
                        <Button className="bg-yellow-500 text-medium-gray cursor-pointer" onClick={() => setShowModal(false)}>
                            NEXT ROUND
                        </Button>
                    </div>
                </div>
            </dialog>
        )
    )
};

export default WinnerInfo;
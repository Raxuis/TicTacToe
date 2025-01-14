import Button from "../Button";
import {cn} from "../libs/cn.ts";
import {useNavigate} from "react-router";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {GameStats, Winner} from "../types";
import {Dispatch, SetStateAction} from "react";


type SetGameStats = Dispatch<SetStateAction<GameStats>>;
type setShowModal = Dispatch<SetStateAction<boolean>>;


type Props = {
    showModal: boolean,
    setShowModal: setShowModal,
    resetBoard: () => void,
    winner: Winner | null,
    username: string | null,
    setGameStats: SetGameStats,
}

type RankingEntry = Record<string, number>;

const WinnerInfo = (
    {showModal, setShowModal, resetBoard, winner, username, setGameStats}: Props) => {

    const navigate = useNavigate();
    const [, setRanking] = useLocalStorage<RankingEntry>("ranking", {});

    const handleClick = (action: "NEXT" | "QUIT") => {
        if (winner !== "Draw" && winner !== null && winner !== "O" && username) {
            setRanking(prevRanking => ({
                ...prevRanking,
                [username]: (prevRanking[username] || 0) + 1
            }));
        }

        if (action === "NEXT" && winner !== null) {
            setGameStats((prevStats: GameStats) => {
                const updatedStats = {...prevStats};

                if (winner === "X") {
                    updatedStats.player1Wins = (prevStats.player1Wins || 0) + 1;
                } else if (winner === "O") {
                    updatedStats.player2Wins = (prevStats.player2Wins || 0) + 1;
                } else if (winner === "Draw") {
                    updatedStats.ties = (prevStats.ties || 0) + 1;
                }

                return updatedStats;
            });
        } else if (action === "QUIT") {
            setGameStats({
                player1Wins: 0,
                ties: 0,
                player2Wins: 0,
            });
        }

        if (action === "NEXT") {
            resetBoard();
        } else if (action === "QUIT") {
            navigate('/');
        }

        setShowModal(false);
    };

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
                                onClick={() => handleClick("QUIT")}>
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
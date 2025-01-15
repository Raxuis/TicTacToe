import Button from "../Button";
import {cn} from "../../libs/cn.ts";
import {useNavigate} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {GameStats} from "../../types";
import {useBoard} from "../../hooks/useBoard.tsx";

type RankingEntry = Record<string, number>;


const WinnerInfo = () => {
    const [, setRanking] = useLocalStorage<RankingEntry>("ranking", {});

    const {
        winner,
        showModal,
        setShowModal,
        username,
        setGameStats,
        resetBoard,
        gameTypeIsSolo
    } = useBoard();

    const handleClick = (action: "NEXT" | "QUIT") => {
        if (winner !== "Draw" && winner !== null && winner !== "O" && username && gameTypeIsSolo) {
            setRanking(prevRanking => ({
                ...prevRanking,
                [username]: (prevRanking[username] || 0) + 1
            }));
        }

        if (action === "NEXT" && winner !== null) {
            setGameStats((prevStats: GameStats) => {
                const updatedStats = {...prevStats};
                updatedStats.playerTurn = "X";

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
                username: "",
                boardType: "",
                player1Wins: 0,
                ties: 0,
                player2Wins: 0,
                playerTurn: "X"
            });
        }

        if (action === "NEXT" || action === "QUIT") {
            resetBoard();
        }

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
import {useNavigate} from "react-router";
import {useLocalStorage} from "@/hooks/useLocalStorage.ts";
import {GameStats, ScoreboardType} from "@/types";
import {useBoard} from "@/hooks/useBoard.tsx";
import ButtonClickEffect from "../ButtonClickEffect";
import cross from "@/assets/cross.svg";
import circle from "@/assets/circle.svg";
import {cn} from "@/libs/cn.ts";


const WinnerInfo = () => {
    const [, setScoreboard] = useLocalStorage<ScoreboardType[]>("scoreboard", []);

    const {
        winner,
        showModal,
        setShowModal,
        username,
        gameStats,
        setGameStats,
        resetBoard,
        gameTypeIsSolo,
    } = useBoard();


    const handleClick = (action: "NEXT" | "QUIT") => {
        if (winner === "O" && username && gameTypeIsSolo()) {
            setScoreboard(prevScoreBoard => [...prevScoreBoard, {
                username: username,
                boardType: gameStats.boardType,
                winStreak: gameStats.player1Wins,
                timestamp: Date.now(),
            }]);


            setGameStats({
                ...gameStats,
                player1Wins: 0,
                ties: 0,
                player2Wins: 0,
                playerTurn: "X"
            })
        }

        if (action === "NEXT" && winner !== null && winner !== "O") {
            setGameStats((prevStats: GameStats) => {
                const updatedStats = {...prevStats};
                updatedStats.playerTurn = "X";

                if (winner === "X") {
                    updatedStats.player1Wins = (prevStats.player1Wins || 0) + 1;
                } else if (winner === "Draw") {
                    updatedStats.ties = (prevStats.ties || 0) + 1;
                }

                return updatedStats;
            });
        } else if (action === "QUIT") {
            setScoreboard(prevScoreBoard => [...prevScoreBoard, {
                username: username,
                boardType: gameStats.boardType,
                winStreak: gameStats.player1Wins,
                timestamp: Date.now()
            }]);

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
                        <ButtonClickEffect className="bg-primary text-medium-gray cursor-pointer shadow-buttonGreyLight"
                                           onClick={() => {
                                               handleClick("QUIT");
                                               navigate("/");
                                           }}>
                            QUIT
                        </ButtonClickEffect>
                        <ButtonClickEffect
                            className="bg-secondary text-medium-gray cursor-pointer shadow-buttonSecondary"
                            onClick={() => handleClick("NEXT")}>
                            NEXT ROUND
                        </ButtonClickEffect>
                    </div>
                </div>
            </dialog>
        )
    )
};

export default WinnerInfo;
import {FormEvent, useState} from "react";
import {ticTacToes} from "@/constants";
import Button from "@/components/Button";
import {useNavigate} from "react-router";
import {TicTacToe} from "@/types";
import {useBoard} from "@/hooks/useBoard.tsx";
import {LineShadowText} from "@/components/LineShadowText";

const Homepage = () => {
    const [type, setType] = useState<TicTacToe>({
        title: "",
        value: "",
    });
    const [username, setUsername] = useState<string>();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const {gameStats, gameTypeIsSolo} = useBoard();

    const handleSubmit = (e: FormEvent<HTMLFormElement>, action: "RESUME" | "START") => {
        e.preventDefault()


        if (action === "START") {
            if (gameTypeIsSolo(type.value) && !username || username === "") {
                setError("Username is required");
                return;
            }
            if (!type.value) {
                setError("Tic Tac Toe type is required");
                return;
            }
            navigate('/tic-tac-toe', {
                state: {username, boardType: type.value}
            })
        } else {
            navigate('/tic-tac-toe', {
                state: {username: gameStats.username, boardType: gameStats.boardType}
            })
        }
    }

    const isValidGameState = (isSolo: boolean, boardType: string | undefined, username: string | undefined) => {
        return boardType && (!isSolo || (isSolo && username));
    };

    const isGameStateValid = isValidGameState(
        gameTypeIsSolo(type.value),
        gameStats.boardType,
        gameStats.username
    );


    return (
        <>
            <div className="w-full max-lg:px-7">
                <h1 className="text-primary text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                    Welcome to
                    <LineShadowText className="italic text-secondary" shadowColor="yellow">
                        TicTacToe
                    </LineShadowText>
                    {" "}
                    !
                </h1>
                <p className="text-gray-light dark:text-gray-light/70">Fill the form to start a new game.</p>
                <div className="w-full bg-gray-light/30 dark:bg-white rounded-2xl flex flex-col gap-5 p-5 mt-5">
                    <p className="text-xl text-gray-dark">Homepage</p>
                    {isGameStateValid ? (
                        <form
                            onSubmit={(e) => handleSubmit(e, "RESUME")}
                            className="flex flex-col max-w-sm w-full space-y-2 mx-auto">
                            <Button type="submit" className="text-white">
                                Resume
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={(e) => handleSubmit(e, "START")}
                              className="flex flex-col max-w-sm w-full space-y-2 mx-auto">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="type" className="text-gray-dark">Tic Tac Toe Type</label>
                                <select name="type" id="type"
                                        onChange={e => {
                                            const selectedType = ticTacToes.find(t => t.value === e.target.value);
                                            setType(selectedType || {title: "", value: ""});
                                        }}
                                        defaultValue={type.value}
                                        className="select select-bordered"
                                >
                                    <option value="">Select Tic Tac Toe</option>
                                    {
                                        ticTacToes.map((type) => (
                                            <option value={type.value} key={type.value}>
                                                {type.title}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                (type.value === "solo" || type.value === "solo-special") && (
                                    <div className="flex flex-col space-y-2">
                                        <label htmlFor="username">Your username</label>
                                        <input name="username" id="username"
                                               onChange={e => setUsername(e.target.value)}
                                               defaultValue={username}
                                               placeholder="Enter your username..."
                                               className="input input-bordered"
                                        />
                                    </div>
                                )
                            }
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button type="submit" className="text-white">
                                Submit
                            </Button>
                        </form>
                    )
                    }
                </div>
            </div>
        </>
    );
};

export default Homepage;
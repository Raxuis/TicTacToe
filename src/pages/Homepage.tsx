import {FormEvent, useContext, useMemo, useState} from "react";
import {useNavigate} from "react-router";
import {TicTacToe} from "@/types";
import {useBoard} from "@/hooks/useBoard.ts";
import {LineShadowText} from "@/components/LineShadowText";
import {ThemeContext} from "@/contexts/ThemeContext.tsx";
import {motion} from "motion/react";
import ResumeForm from "@/components/HomepageForms/ResumeForm";
import StartForm from "@/components/HomepageForms/StartForm";

export type FormAction = "RESUME" | "START";

const Homepage = () => {
    const [type, setType] = useState<TicTacToe>({
        title: "",
        value: "",
    });
    const [username, setUsername] = useState<string>();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const {gameStats, gameTypeIsSolo} = useBoard();

    const {theme} = useContext(ThemeContext);

    const handleSubmit = (e: FormEvent<HTMLFormElement>, action: FormAction) => {
        e.preventDefault()

        // J'ai décidé d'enlever les usernames lors du jeu en local en espérant que cela ne pose pas de problème... 🙃
        // Cela évite d'avoir trop d'useState et des bugs potentiels.

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
                state: {username, gameMode: type.value}
            })
        } else {
            navigate('/tic-tac-toe', {
                state: {username: gameStats.username, gameMode: gameStats.gameMode}
            })
        }
    }

    const isValidGameState = (isSolo: boolean, gameMode: string | undefined, username: string | undefined) => {
        return gameMode && (!isSolo || (isSolo && username));
    };

    const isGameStateValid = isValidGameState(
        gameTypeIsSolo(type.value),
        gameStats.gameMode,
        gameStats.username
    );

    const shadowColor = useMemo(
        () => (theme === "dark" ? "yellow" : "#203741"),
        [theme]
    );


    return (
        <>
            <motion.div
                className="w-full max-lg:px-7"
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.3,
                    type: "tween",
                }}
            >
                <h1 className="text-primary text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                    Welcome to
                    <LineShadowText className="italic text-gray-dark dark:text-secondary" shadowColor={shadowColor}>
                        TicTacToe
                    </LineShadowText>
                    {" "}
                    !
                </h1>
                <p className="text-gray-light dark:text-gray-light/70">Fill the form to start a new game.</p>
                <div className="w-full bg-gray-light/30 dark:bg-white rounded-2xl flex flex-col gap-5 p-5 mt-5">
                    <p className="text-xl text-gray-dark">Homepage</p>
                    {
                        isGameStateValid ?
                            (
                                <ResumeForm
                                    handleSubmit={(e) => handleSubmit(e, "RESUME")}
                                />
                            ) : (
                                <StartForm
                                    handleSubmit={(e) => handleSubmit(e, "START")}
                                    type={type}
                                    username={username}
                                    setType={setType}
                                    setUsername={setUsername}
                                    error={error}
                                />
                            )
                    }
                </div>
            </motion.div>
        </>
    );
};

export default Homepage;
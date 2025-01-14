import {FormEvent, useState} from "react";
import {ticTacToes} from "../constants";
import Button from "../Button";
import {useNavigate} from "react-router";
import {TicTacToe} from "../types";

const Homepage = () => {
    const [type, setType] = useState<TicTacToe>({
        title: "",
        value: "",
    });
    const [username, setUsername] = useState<string>();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if ((type.value === "solo" || type.value === "solo-special") && !username || username === "") {
            setError("Username is required");
            return;
        }
        navigate(`/tic-tac-toe`, {
            state: {username, boardType: type.value}
        })
    }


    return (
        <div className="w-full bg-white rounded-2xl flex flex-col gap-5 p-5 mt-10">
            <p className="text-xl">Homepage</p>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-sm w-full space-y-2 mx-auto">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="type">Tic Tac Toe Type</label>
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
        </div>
    );
};

export default Homepage;
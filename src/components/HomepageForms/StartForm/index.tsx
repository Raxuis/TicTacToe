import {ticTacToes} from "@/constants";
import Button from "@/components/Button";
import {Dispatch, FormEvent, SetStateAction} from "react";
import {FormAction} from "@/pages/Homepage.tsx";
import {TicTacToe} from "@/types";

type StartFormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>, action: FormAction) => void;
    type: TicTacToe;
    username: string | undefined;
    setType: Dispatch<SetStateAction<TicTacToe>>;
    setUsername: Dispatch<SetStateAction<string | undefined>>;
    error: string | undefined;
}

const StartForm = ({
                       handleSubmit,
                       type,
                       username,
                       setType,
                       setUsername,
                       error
                   }: StartFormProps) => {
    return (
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
                        <label htmlFor="username" className="text-gray-dark">Your username</label>
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
    );
};

export default StartForm;
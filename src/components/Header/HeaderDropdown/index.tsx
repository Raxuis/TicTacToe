import {MenuIcon} from "lucide-react";
import {cn} from "@/libs/cn.ts";
import {Link, useNavigate} from "react-router";
import {Dispatch, SetStateAction} from "react";
import {HeaderLinkType} from "@/components/Header";
import {useBoard} from "@/hooks/useBoard.tsx";

type HeaderDropdownProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>,
    headerLinks: HeaderLinkType[]
}

const HeaderDropdown = ({open, setOpen, headerLinks}: HeaderDropdownProps) => {
    // Le Dropdown est de DaisyUI, j'ai dû changer la logique pour fermer le menu avec les Links
    const navigate = useNavigate();

    const {gameStats, gameTypeIsSolo} = useBoard();


    const isVerified = (link: HeaderLinkType) => {
        if (!link.needsVerification) return true;

        return gameTypeIsSolo()
            ? gameStats.boardType && gameStats.username
            : gameStats.boardType;
    };

    const handleGameClick = () => {
        if (isVerified({to: "/tic-tac-toe", text: "Game", needsVerification: true})) {
            navigate("/tic-tac-toe", {
                state: {username: gameStats.username, boardType: gameStats.boardType},
            });
        }
    };

    return (
        <details
            className="dropdown dropdown-end"
            open={open}
            onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
        >
            <summary className="btn btn-sm m-1 focus:ring-2 dark:bg-white hover:dark:bg-opacity-5">
                <MenuIcon/>
            </summary>
            <ul
                className={cn(
                    "menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-32 p-2 shadow text-gray-dark dark:text-white"
                )}
            >
                {headerLinks.map((link, index) =>
                    isVerified(link) ? (
                        link.text === "Game" ? (
                            <li key={index}>
                                <button
                                    onClick={() => {
                                        handleGameClick();
                                        setOpen(false);
                                    }}
                                    className="w-full text-left"
                                >
                                    {link.text}
                                </button>
                            </li>
                        ) : (
                            <li key={index}>
                                <Link
                                    to={link.to}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        )
                    ) : null
                )}
            </ul>
        </details>
    );
};

export default HeaderDropdown;
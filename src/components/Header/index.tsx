import {Link, useNavigate} from "react-router";
import {useBoard} from "@/hooks/useBoard.tsx";
import {useState} from "react";
import {cn} from "@/libs/cn.ts";
import {MenuIcon} from "lucide-react";

type HeaderLinkType = {
    to: string;
    text: string;
    needsVerification?: boolean;
};

const headerLinks: HeaderLinkType[] = [
    {to: "/", text: "Home"},
    {to: "/tic-tac-toe", text: "Game", needsVerification: true},
    {to: "/scoreboard", text: "Scoreboard"},
];

const Header = () => {
    const {gameStats, gameTypeIsSolo} = useBoard();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

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
        <header>
            <nav
                className="navbar rounded-box flex items-center justify-between text-white w-screen max-w-7xl mx-auto px-5 lg:px-10">
                <div className="flex-1 px-2 lg:flex-none">
                    <Link className="text-lg font-bold" to="/">
                        Tic-Tac-Toe
                    </Link>
                </div>
                <div className="flex flex-1 justify-end px-2">
                    <div className="flex items-stretch">
                        {/* Le Dropdown est de DaisyUI, j'ai dû changer la logique pour fermer le menu avec les Links */}
                        <details
                            className="dropdown dropdown-end"
                            open={open}
                            onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
                        >
                            <summary className="btn m-1 focus:ring-4">
                                <MenuIcon/>
                            </summary>
                            <ul
                                className={cn(
                                    "menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow text-black"
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
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

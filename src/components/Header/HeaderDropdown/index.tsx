import {MenuIcon} from "lucide-react";
import {cn} from "@/libs/cn.ts";
import {Link, useNavigate} from "react-router";
import {Dispatch, memo, SetStateAction} from "react";
import {HeaderLinkType} from "@/components/Header";
import {useBoard} from "@/hooks/useBoard.ts";

type HeaderDropdownProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>,
    headerLinks: HeaderLinkType[]
}

const HeaderDropdown = memo(({open, setOpen, headerLinks}: HeaderDropdownProps) => {
    // Le Dropdown est de DaisyUI, j'ai dû changer la logique pour fermer le menu avec les Links
    const navigate = useNavigate();

    const {gameStats, gameTypeIsSolo} = useBoard();


    const isVerified = (link: HeaderLinkType) => {
        if (!link.needsVerification) return true;

        return gameTypeIsSolo()
            ? gameStats.gameMode && gameStats.username
            : gameStats.gameMode;
    };

    // Je crée une fonction qui permet de gérer le click sur le bouton Game
    // Cette fonction est obligée, car je dois envoyer des données à la page suivante.
    const handleGameClick = () => {
        if (isVerified({to: "/tic-tac-toe", text: "Game", needsVerification: true})) {
            navigate("/tic-tac-toe", {
                state: {username: gameStats.username, gameMode: gameStats.gameMode},
            });
        }
    };

    return (
        <details
            className="dropdown dropdown-end"
            open={open}
            onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
        >
            <summary className="btn btn-sm m-1 focus:ring-2 bg-gray-dark hover:bg-gray-dark/90 text-gray-light">
                <MenuIcon/>
            </summary>
            <ul
                className={cn(
                    "menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-32 p-2 shadow"
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
});

export default HeaderDropdown;
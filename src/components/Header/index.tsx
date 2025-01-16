import {Link} from "react-router";
import {useState} from "react";
import HeaderDropdown from "@/components/Header/HeaderDropdown";
import ThemeToggle from "@/components/Header/ThemeToggle";

export type HeaderLinkType = {
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
    const [open, setOpen] = useState(false);

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
                    <div className="flex items-stretch gap-2">
                        <ThemeToggle/>
                        <HeaderDropdown open={open} setOpen={setOpen} headerLinks={headerLinks}/>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

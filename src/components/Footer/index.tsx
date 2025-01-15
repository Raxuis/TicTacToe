import React from "react";
import {GithubIcon, LinkedinIcon} from "lucide-react";
import {Link} from "react-router";

type Link = {
    text: string;
    url: string;
};

const links: Link[] = [
    {text: "Game", url: "/tic-tac-toe"},
    {text: "Scoreboard", url: "/scoreboard"},
];

interface Icon {
    icon: React.JSX.Element;
    url: string;
}

const icons: Icon[] = [
    {icon: <GithubIcon/>, url: "https://github.com/Raxuis"},
    {icon: <LinkedinIcon/>, url: "https://www.linkedin.com/raphael-raclot"},
];

export function Footer() {
    return (
        <footer className="px-5 lg:px-10 p-5 max-w-7xl mx-auto fixed bottom-0 w-screen">
            <div
                className="flex flex-col gap-y-5 md:flex-row items-start md:items-center justify-between w-full gap-x-5">
                <div className="flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8">
                        <defs>
                            <linearGradient id="tailwindGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#36CDCA"/>
                                <stop offset="100%" stop-color="#F6BC47"/>
                            </linearGradient>
                        </defs>
                        <path
                            fill="none"
                            stroke="url(#tailwindGradient)"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M12 2v20m10-10H2m6 6.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M16 3l5 5m0-5l-5 5"
                        />
                    </svg>
                    <h2 className="font-bold text-white">
                        Tic Tac Toe
                    </h2>
                </div>

                <ul className="flex items-center justify-center gap-x-5">
                    {links.map((link, index) => (
                        <li
                            key={index}
                            className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear  hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:text-neutral-100"
                        >
                            <a href={link.url}>{link.text}</a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-x-4">
                    {icons.map((icon, index) => (
                        <a
                            key={index}
                            href={icon.url}
                            target="_blank"
                            className="text-neutral-500 hover:text-white text-xl"
                        >
                            {icon.icon}
                        </a>
                    ))}
                </div>
            </div>
            <div
                className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p className="text-white">© {new Date().getFullYear()} Tic-Tac-Toe. All rights reserved.</p>
            </div>
        </footer>
    );
}

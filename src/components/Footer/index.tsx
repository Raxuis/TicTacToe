import React from "react";
import {
    GithubIcon,
    LinkedinIcon
} from "lucide-react";

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
                className="flex gap-y-5 items-start md:items-center justify-between w-full gap-x-5">
                <div className="flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8">
                        <defs>
                            <linearGradient id="tailwindGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F6BC47"/>
                                <stop offset="100%" stopColor="#36CDCA"/>
                            </linearGradient>
                        </defs>
                        <path
                            fill="none"
                            stroke="url(#tailwindGradient)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 2v20m10-10H2m6 6.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M16 3l5 5m0-5l-5 5"
                        />
                    </svg>
                    <h2 className="font-bold text-white">
                        Tic Tac Toe
                    </h2>
                </div>
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
                className="mt-5 sm:mt-12 pt-4 sm:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p className="text-white">© {new Date().getFullYear()} Tic-Tac-Toe. All rights reserved.</p>
            </div>
        </footer>
    );
}

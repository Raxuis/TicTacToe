import {Sun, Moon} from 'lucide-react';
import {useContext} from "react";
import {ThemeContext} from "@/contexts/ThemeContext.tsx";


const ThemeToggle = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
            <button onClick={toggleTheme}>
                {theme === 'dark' ? (
                    <Sun className="size-6 text-black dark:text-primary"/>
                ) : (
                    <Moon className="size-6 text-black dark:text-primary"/>
                )}
            </button>
    );
};

export default ThemeToggle;
import {Sun, Moon} from 'lucide-react';
import {useContext} from "react";
import {ThemeContext} from "@/contexts/ThemeContext.tsx";


const ThemeToggle = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
            <button onClick={toggleTheme}>
                {theme === 'dark' ? (
                    <Sun className="size-6 text-blue-700 dark:text-white"/>
                ) : (
                    <Moon className="size-6 text-blue-700 dark:text-white"/>
                )}
            </button>
    );
};

export default ThemeToggle;
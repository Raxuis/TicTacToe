import {cn} from "@/libs/cn";
import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'submit' | 'button' | 'reset';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick' | 'type'>;

// Bouton simple possédant un style par défaut.
// Il possède aussi toutes les propriétés d'un bouton HTML.

const Button = ({children, className, onClick, type = 'button', ...props}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn('block bg-gray-medium hover:bg-gray-medium/95 rounded-lg shadow-2xl shadow-primary/10 p-2 px-4 font-bold', className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
};

export default Button;
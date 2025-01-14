import {cn} from "../../libs/cn.ts";
import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'submit' | 'button' | 'reset';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick' | 'type'>;

const Button = ({children, className, onClick, type = 'button', ...props}: ButtonProps) => {
    return (
        <button
            type={type}
            className={cn('block bg-gray-medium rounded-lg shadow-2xl shadow-primary/10 p-2 px-4', className)}
            onClick={onClick}
            {...props}
        >
            <p className="font-bold">{children}</p>
        </button>
    )
};

export default Button;
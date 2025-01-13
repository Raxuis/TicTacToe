import {cn} from "../libs/utils.ts";
import {ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const Button = ({children, className, onClick}: ButtonProps) => {
    return (
        <div
            className={cn('block bg-medium-gray rounded-lg shadow-2xl shadow-primary/10 p-2 px-4', className)}
            onClick={onClick}
        >
            <p className="font-bold">{children}</p>
        </div>
    )
};

export default Button;
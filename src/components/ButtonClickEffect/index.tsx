import React, {ReactNode} from 'react';
import Button from "../Button";
import {cn} from "../../libs/cn.ts";

type ButtonClickEffectProps = {
    children: ReactNode,
    className?: string,
    onClick?: () => void,
}

const ButtonClickEffect = ({children, className, onClick}: ButtonClickEffectProps) => {
    return (
        <Button className={cn('active:shadow-none active:translate-y-1', className)} onClick={onClick}>
            {children}
        </Button>
    );
};

export default ButtonClickEffect;
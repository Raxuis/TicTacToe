import {ReactNode} from 'react';
import Button from "@/components/Button";
import {cn} from "@/libs/cn.ts";

type ButtonClickEffectProps = {
    children: ReactNode,
    className?: string,
    onClick?: () => void,
}

// Bouton simple avec effet de clic
// Possède une shadow par défault → Il faudra la modifier lors de son appel dans className !

const ButtonClickEffect = ({children, className, onClick}: ButtonClickEffectProps) => {
    return (
        <Button className={cn('active:shadow-none active:translate-y-1 shadow-buttonGrey', className)}
                onClick={onClick}>
            {children}
        </Button>
    );
};

export default ButtonClickEffect;
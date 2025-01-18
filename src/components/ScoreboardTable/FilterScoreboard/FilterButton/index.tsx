import {ReactNode} from "react";
import Button from "@/components/Button";
import {cn} from "@/libs/cn.ts";

type FilterButtonProps = {
    onClick: () => void;
    children: ReactNode;
    className?: string;
    isActive?: boolean;
}

const FilterButton = ({onClick, children, className, isActive}: FilterButtonProps) => {
    return (
        <Button className={
            cn(
                'block hover:bg-primary/70 duration-300 text-white',
                className,
                isActive && 'bg-primary/70'
            )
        } onClick={onClick}>
            <div className="flex items-center justify-center gap-2">
                {children}
            </div>
        </Button>
    );
};

export default FilterButton;
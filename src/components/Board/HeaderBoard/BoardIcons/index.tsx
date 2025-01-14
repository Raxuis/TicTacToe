import cross from "../../../../assets/cross.svg";
import circle from "../../../../assets/circle.svg";

const BoardIcons = () => {
    return (
        <div>
            <div className="flex items-center gap-4">
                <img src={cross} alt="cross" className="size-8 object-cover"/>
                <img src={circle} alt="circle" className="size-8 object-cover"/>
            </div>
        </div>
    );
};

export default BoardIcons;
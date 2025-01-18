import Button from "@/components/Button";
import {Clock, Trophy} from "lucide-react";
import {Dispatch, SetStateAction} from "react";

const FilterScoreboard = ({setFilter}: { setFilter: Dispatch<SetStateAction<"WIN_STREAK" | "DATE">> }) => {
    return (
        <div className="flex flex-col mt-2 mx-4">
            <p>Filter by : </p>
            <div className="flex justify-center sm:justify-between mt-2">
                <Button onClick={() => setFilter("WIN_STREAK")}
                        className="block hover:bg-primary/70 hover:text-black duration-300">
                    <div className="flex items-center justify-center gap-2">
                        <Trophy/>
                        <p>Win Streak</p>
                    </div>
                </Button>
                <Button onClick={() => setFilter("DATE")}
                        className="hidden sm:block hover:bg-primary/70 hover:text-black duration-300">
                    <div className="flex items-center justify-center gap-2">
                        <Clock/>
                        <span>Date</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default FilterScoreboard;
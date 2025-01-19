import {Clock, Trophy} from "lucide-react";
import {useScoreboard} from "@/hooks/useScoreboard.tsx";
import FilterButton from "@/components/ScoreboardTable/FilterScoreboard/FilterButton";

const FilterScoreboard = () => {
    const {filter, setFilter} = useScoreboard();
    return (
        <div className="flex flex-col mt-2 mx-4">
            <p>Filter by : </p>
            <div className="flex justify-center sm:justify-between mt-2">
                <FilterButton
                    onClick={() => setFilter("WIN_STREAK")}
                    isActive={filter === "WIN_STREAK"}
                >
                    <Trophy/>
                    <span>Win Streak</span>
                </FilterButton>
                <FilterButton
                    onClick={() => setFilter("DATE")}
                    isActive={filter === "DATE"}
                    className="hidden sm:block"
                >
                    <Clock/>
                    <span>Date</span>
                </FilterButton>
            </div>
        </div>
    );
};

export default FilterScoreboard;
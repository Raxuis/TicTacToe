import ScoreboardTable from "@/components/ScoreboardTable";
import FilterScoreboard from "@/components/ScoreboardTable/FilterScoreboard";
import {useScoreboard} from "@/hooks/useScoreboard.tsx";

const Scoreboard = () => {
    // Par défaut, le scoreboard est filtré par win streak comme demandé,
    // j'ai ajouté un filtre par date en plus.
    const {scoreboard, filteredScoreboard} = useScoreboard();

    return (
        <div className="overflow-x-auto">
            {scoreboard.length === 0 ? (
                <p className="text-center text-lg">No games have been played yet</p>
            ) : (
                <>
                    <ScoreboardTable scoreboard={filteredScoreboard}/>
                    <FilterScoreboard/>
                </>
            )}
        </div>
    );
};

export default Scoreboard;

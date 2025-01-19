import ScoreboardTable from "@/components/ScoreboardTable";
import FilterScoreboard from "@/components/ScoreboardTable/FilterScoreboard";
import {useScoreboard} from "@/hooks/useScoreboard.ts";
import {motion} from "motion/react";

const Scoreboard = () => {
    // Par défaut, le scoreboard est filtré par win streak comme demandé,
    // j'ai ajouté un filtre par date en plus.
    const {scoreboard, filteredScoreboard} = useScoreboard();

    return (
        <div className="overflow-x-auto">
            {scoreboard.length === 0 ? (
                <p className="text-center text-lg">No games have been played yet</p>
            ) : (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.3,
                        type: "tween",
                    }}
                >
                    <ScoreboardTable scoreboard={filteredScoreboard}/>
                    <FilterScoreboard/>
                </motion.div>
            )}
        </div>
    );
};

export default Scoreboard;

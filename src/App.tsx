import {Route, Routes} from "react-router";
import Homepage from "./pages/Homepage.tsx";
import Layout from "./Layout";
import TicTacToe from "./pages/TicTacToe.tsx";
import Scoreboard from "@/pages/Scoreboard.tsx";
import NotFound from "@/pages/NotFound.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/tic-tac-toe" element={<TicTacToe/>}/>
                <Route path="/scoreboard" element={<Scoreboard/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </Layout>
    )
}

export default App

import {Route, Routes} from "react-router";
import Homepage from "./pages/Homepage.tsx";
import Layout from "./Layout";
import SoloTicTacToe from "./pages/SoloTicTacToe.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/solo-tic-tac-toe" element={<SoloTicTacToe/>}/>
            </Routes>
        </Layout>
    )
}

export default App

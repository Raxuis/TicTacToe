import {Route, Routes} from "react-router";
import Homepage from "./pages/Homepage.tsx";
import Layout from "./Layout";
import TicTacToe from "./pages/TicTacToe.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/tic-tac-toe" element={<TicTacToe/>}/>
            </Routes>
        </Layout>
    )
}

export default App

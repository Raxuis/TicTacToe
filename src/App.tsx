import {Route, Routes} from "react-router";
import Homepage from "./pages/Homepage.tsx";
import Layout from "./Layout";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
            </Routes>
        </Layout>
    )
}

export default App

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {BoardProvider} from "./providers/BoardProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BoardProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
        </BoardProvider>
    </StrictMode>,
)

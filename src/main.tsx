import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {BoardProvider} from "./providers/BoardProvider.tsx";
import {ThemeProvider} from "@/providers/ThemeProvider.tsx";
import {ScoreboardProvider} from "@/providers/ScoreboardProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <BoardProvider>
                <ScoreboardProvider>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </ScoreboardProvider>
            </BoardProvider>
        </ThemeProvider>
    </StrictMode>
)

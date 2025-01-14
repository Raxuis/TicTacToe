import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {BoardProvider} from "./providers/BoardProvider.tsx";
import {PersistenceProvider} from "./providers/PersistenceProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BoardProvider>
            <PersistenceProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistenceProvider>
        </BoardProvider>
    </StrictMode>,
)

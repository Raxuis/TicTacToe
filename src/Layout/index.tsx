import {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = ({children}: { children: ReactNode }) => {
    // Je suis obligé de mettre le fond sur chaque élément, car sinon cela ne fonctionne pas
    // → Cela fait juste un fond différent pour le responsive.
    return (
        <div className="bg-white dark:bg-gray-dark min-h-screen min-w-screen font-space-grotesk">
            <div className="flex flex-col h-screen justify-between">
                <div className="mb-auto bg-white dark:bg-gray-dark">
                    <Header/>
                    <main className="max-w-5xl mx-auto">
                        {children}
                    </main>
                </div>
                <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-dark">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default Layout;
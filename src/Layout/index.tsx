import {ReactNode} from "react";
import Header from "@/components/Header";
import {Footer} from "@/components/Footer";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="bg-white dark:bg-gray-dark  min-h-screen min-w-screen font-space-grotesk py-5">
            <Header/>
            <div className="max-w-5xl mx-auto">
                {children}
            </div>
            <div className="flex flex-col justify-center items-center">
                <Footer/>
            </div>
        </div>
    );
};

export default Layout;
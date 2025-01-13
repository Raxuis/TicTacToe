import {ReactNode} from "react";
import Header from "../Header";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="w-screen max-w-5xl mx-auto py-5 font-space-grotesk">
            <Header/>
            {children}
        </div>
    );
};

export default Layout;
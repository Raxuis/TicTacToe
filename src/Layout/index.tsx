import {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className="font-space-grotesk">
            {children}
        </div>
    );
};

export default Layout;
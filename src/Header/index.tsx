import {Link} from "react-router";

const Header = () => {
    return (
        <header className="">
            <nav className="flex items-center justify-between">
                <Link to="/">Home</Link>
            </nav>
        </header>
    );
};

export default Header;
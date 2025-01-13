import {Link} from "react-router";

const Header = () => {
    return (
        <header>
            <nav className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <Link to="/">Home</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
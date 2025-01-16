import {Link} from "react-router";

const Header = () => {
    return (
        <header>
            <nav className="flex items-center justify-between text-white w-screen max-w-7xl mx-auto px-5 lg:px-10">
                <div className="flex items-center gap-2">
                    <Link to="/">Home</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
import {Link} from "react-router";

const NotFound = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-gray-light">404</h1>
                <p className="text-xl text-gray-light/50">Page not found</p>
                <Link to="/" className="text-primary underline mt-4">Go back to home</Link>
            </div>
        </div>
    );
};

export default NotFound;
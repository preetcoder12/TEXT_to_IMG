import { Link } from 'react-router-dom';
import "../src/index.css"; // Import CSS file

const Navbar = () => {
    return (
        <div className="fixed left-0 top-0 w-18 h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all hover:w-64 p-4 poopins left-section">
            <div className="flex flex-col items-start space-y-4 text-white">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/about" className="hover:underline">About</Link>
                <Link to="/signup" className="hover:underline">SignUp</Link>
                </div>
        </div>
    );
};

export default Navbar;

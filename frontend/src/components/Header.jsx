import { Link, useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    // Get the value from the userSlice
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    // Handle search 
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <header className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-bold">
                <Link to='/'><h1>Logo</h1></Link>
            </div>

            <nav className="space-x-4 text-md flex items-center ">
                {/* Search functionality */}
                <form onSubmit={handleSearchSubmit} className="h-10 flex gap-2 items-center bg-white text-black rounded-full px-4">
                    <input
                        type="text"
                        placeholder="search post.."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="outline-none w-full"
                    />
                    <button type="submit" className="text-2xl">
                        <CiSearch />
                    </button>
                </form>

                <button className="py-2 px-3 rounded-full bg-green-600 hover:bg-green-700">
                    <Link to={isLoggedIn ? '/create' : '/signup'}>Create a Post</Link>
                </button>

                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="py-2 px-3 rounded-full bg-red-600 hover:bg-red-700"
                    >
                        Logout
                    </button>
                )}

                {isLoggedIn ? (
                    <Link to="/profile" >
                        <IoPersonSharp className="w-10 h-10 pt-1 border rounded-full" />
                    </Link>
                ) : (
                    <button className="py-2 px-3 rounded-full border border-green-600 hover:border-green-700">
                        <Link to='/login'>Log In</Link>
                    </button>
                )}
            </nav>
        </header>
    )
}

export default Header;

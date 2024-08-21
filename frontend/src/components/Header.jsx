import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice"; // Assuming you have an action creator for logout

const Header = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-bold">
                <Link to='/'><h1>Logo</h1></Link>
            </div>

            <nav className="space-x-4 text-md flex items-center">
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

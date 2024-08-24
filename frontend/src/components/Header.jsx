import { Link, useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import logoImg from "../assets/logo.svg";
import profileImg from "../assets/profile.png";

const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setIsSearchModalOpen(false);
    };

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };

    return (
        <>
            <header className="w-full bg-gray-900 text-white px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => navigate("/")}>
                    <img src={logoImg} alt="logo" className="w-14 md:w-16 h-14 md:h-16" />
                    <span className="text-md md:text-lg text-[#9495fa] font-semibold hidden sm:inline-block">StoryNetwork</span>
                </div>

                <nav className="space-x-2 sm:space-x-4 text-sm md:text-[16px] flex items-center">
                    <button onClick={openSearchModal} className="text-2xl hover:text-green-500">
                        <CiSearch />
                    </button>

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
                            <img src={profileImg} alt="profile" className="w-10 h-10 border-2 border-green-500 rounded-full" />
                        </Link>
                    ) : (
                        <button className="py-2 px-3 rounded-full border border-green-600 hover:border-green-700">
                            <Link to='/login'>Log In</Link>
                        </button>
                    )}
                </nav>
            </header>

            {/* Search Modal */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3">
                        <form onSubmit={handleSearchSubmit} className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search post..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full p-2 px-4 border border-gray-300 rounded-full outline-none"
                            />
                            <button type="submit" className="ml-2 text-2xl text-black bg-green-500 p-2 rounded-full text-white">
                                <CiSearch />
                            </button>
                        </form>
                        <button
                            onClick={closeSearchModal}
                            className=" mt-4 mr-0 font-semibold text-red-500 hover:text-red-700 "
                        >
                            Close

                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header;

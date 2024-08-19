import { Link } from "react-router-dom";
import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-bold">
                <Link to='/'><h1>Logo</h1></Link>
            </div>

            <nav className="space-x-4 text-md flex items-center">
                <button className="py-2 px-3 rounded-full bg-green-600 hover:bg-green-700">
                    <Link to={isLoggedIn? '/create' :'/signup'}>Create a Post</Link>
                </button>
                {isLoggedIn ?
                    <Link to="/profile" >
                        {/* <img src="" alt="profile" className="w-10 h-10" /> */}
                        <IoPersonSharp className="w-10 h-10 pt-1 border rounded-full" />
                    </Link> :
                    <button className="py-2 px-3 rounded-full border border-green-600 hover:border-green-700">
                        <Link to='/login'>Log In</Link>
                    </button>
                }
            </nav>
        </header>
    )
}

export default Header;
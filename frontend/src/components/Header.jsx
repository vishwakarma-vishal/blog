import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full bg-gray-900 text-white px-8 py-4">
            <nav className="flex justify-between items-center">
                <div className="text-2xl md:text-3xl font-bold">
                    <Link to='/'><h1>Logo</h1></Link>
                </div>
                <div className="space-x-4 text-md">
                    <button className="py-2 px-3 rounded-full bg-green-600 hover:bg-green-700">
                        <Link to='/signup'>Create a Post</Link>
                    </button>
                    <button className="py-2 px-3 rounded-full border border-green-600 hover:border-green-700">
                        <Link to='/login'>Log In</Link>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header;
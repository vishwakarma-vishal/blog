import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <BiError className="w-[40vw] h-[30vh] text-red-300" />
            <p className="-mt-4 text-lg md:text-xl lg:text-2xl text-gray-900">Opps! Page not found.</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-full">
                <Link to="/">Back to home</Link>
            </button>
        </div>
    )
}

export default NotFound;
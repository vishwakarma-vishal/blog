import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <BiError className="w-[40vw] h-[30vh] text-gray-400" />
            <p className="-mt-4 text-2xl text-gray-900">Opps! The page not found.</p>
            <button className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-full">
                <Link to="/">Back to home</Link>
            </button>
        </div>
    )
}

export default NotFound;
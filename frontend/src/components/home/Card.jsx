import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = () => {
    const navigate = useNavigate();
    return (
        <div 
        className="bg-white rounded-lg shadow-lg cursor-pointer"
        onClick={()=>navigate('/post')}>
            <div className="w-full overflow-hidden rounded-t-md ">
                <img src="/src/assets/placeholder.jpg" alt="placeholder" className="transition-all duration-700 hover:scale-125" />
            </div>
            <div className="p-3 space-y-1">
                <h3 className="text-md font-semibold">Lorem ipsum dolor sit amet</h3>
                <div className="flex gap-2 text-xs text-gray-700">
                    <span>Mark Twin</span>
                    <span className="flex items-center gap-1"><FaRegComment /> 30</span>
                </div>
                <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet at the dolorum aut aspernatur dolore...</p>
            </div>
        </div>
    )
}

export default Card;
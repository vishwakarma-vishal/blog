import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import placeholderImg from "../../assets/placeholder.jpg"

const Card = ({ post }) => {
    const thumbnailUrl = `${import.meta.env.VITE_URL}${post.thumbnailUrl}`;
    const title = post.title;
    const description = post.description;
    const category = post.category;

    const navigate = useNavigate();
    return (
        <div className="max-h-72 bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => navigate(`/post/${post._id}`)}>

            <div className="h-[54%] w-full rounded-t-md overflow-hidden">
                <img
                    src={thumbnailUrl ? thumbnailUrl : placeholderImg}
                    alt="placeholder"
                    className="transition-all duration-700 hover:scale-125 h-full w-full rounded-t-md"
                    onError={(e) => {
                        e.target.src = placeholderImg; //if the thumnailUrl isn't available
                    }}
                />
            </div>

            <div className="h-[43%] p-3 space-y-1 overflow-hidden">
                <h3 className="text-md font-semibold">{title}</h3>
                <div className="flex gap-2 text-xs text-gray-700">
                    <span className="flex items-center gap-1"><TbCategory />{category}</span>
                    <span className="flex items-center gap-1"><FaRegComment />{post.comments?.length || 0}</span>
                </div>
                <p className="text-sm text-gray-700">{description}...</p>
            </div>
        </div>
    )
}

export default Card;
import React from 'react';
import placeholderImage from "../../assets/placeholder.jpg";
import { useNavigate } from 'react-router-dom';

export const MiniCard = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex items-center gap-2 bg-white py-2 px-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer hover:shadow"
            onClick={() => navigate(`/post/${post._id}`)}>
            <img
                src={placeholderImage}
                alt="thumbnail"
                className="w-12 h-12 rounded-full" />
            <div>
                <p className="text-md font-semibold">{post.title} </p>
                <p className="text-sm text-gray-500">{post.description.slice(0, 30)}...</p>
            </div>
        </div>
    )
}

import React from 'react';
import placeholderImg from "../../assets/placeholder.jpg";
import { useNavigate } from 'react-router-dom';

export const MiniCard = ({ post }) => {
    const thumbnailUrl = `${import.meta.env.VITE_URL}${post.thumbnailUrl}`;
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-2 border border-bottom p-2 rounded-full cursor-pointer hover:shadow-lg transition-all duration-400"
            onClick={() => navigate(`/post/${post._id}`)}>
            <img
                src={thumbnailUrl ? thumbnailUrl : placeholderImg}
                alt="thumbnail"
                className="w-12 h-12 rounded-full"
                onError={(e) => {
                    e.target.src = placeholderImg;
                }}
            />
            <div>
                <p className="text-md font-semibold">{post.title}</p>
            </div>
        </div>
    )
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../../store/userSlice'; 

export const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //handle post delete
    const handleDelete = async () => {
        const answer = confirm("Are you sure to delete the post");

        if (answer) {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    toast.success("Post deleted successfully");
                    if (userId) {
                        console.log("inside our get user stat fun->");
                        const userResponse = await fetch(`${import.meta.env.VITE_URL}/users/${userId}`);
                        console.log(userResponse);
                        const updatedUserData = await userResponse.json();
    
                        // Dispatch the setUser action to update the user state
                        dispatch(setUser({ user: updatedUserData }));
                    }
                    navigate('/');
                } else {
                    toast.error(`${data.message}`);
                }

            } catch (error) {
                toast.error("Something went wrong, try again later");
                console.error("Unable to delete the post:", error);
            }
        }
    }

    return (
        <div
            className="flex items-center gap-2 bg-white py-2 px-2 rounded-full shadow cursor-pointer"
            onClick={() => navigate(`/post/${post._id}`)}>
            <img src={post.thumbnailUrl} alt="thumbnail" className="w-12 h-12 rounded-full" />
            <div>
                <p className="text-md font-semibold">{post.title}</p>
                <p className="text-sm text-gray-500">{post.description.slice(0, 50)}</p>
            </div>
            <div className="ml-auto space-x-4">
                <button
                    className="text-sm font-semibold py-1 px-4 bg-green-500 text-white rounded-full"
                    onClick={() => navigate(`/post/update/${post._id}`)}>
                    Edit
                </button>
                <button
                    className="text-sm font-semibold py-1 px-4 bg-red-500 text-white rounded-full"
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}

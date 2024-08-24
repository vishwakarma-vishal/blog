import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { setUser } from '../../store/userSlice';
import { toast } from "react-toastify";
import ConfirmDialog from '../post/ConfirmDialog';
import { useState } from 'react';

export const PostCard = ({ post,fetchAllPost }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const postId = post._id;
    const user = useSelector((state) => state.user.user);
    const userId = user?._id;

    //handle post delete
    // const handleDelete = async () => {
    //     const answer = confirm("Are you sure to delete the post");

    //     if (answer) {
    //         try {
    //             const response = await fetch(`${import.meta.env.VITE_URL}/posts/${postId}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             });

    //             const data = await response.json();
    //             console.log(data);

    //             if (response.ok) {
    //                 toast.success("Post deleted successfully");
    //                 if (userId) {
    //                     console.log("inside our get user stat fun->");
    //                     const userResponse = await fetch(`${import.meta.env.VITE_URL}/users/${userId}`);
    //                     console.log(userResponse);
    //                     const updatedUserData = await userResponse.json();

    //                     // Dispatch the setUser action to update the user state
    //                     dispatch(setUser({ user: updatedUserData }));
    //                 }
    //                 navigate('/');
    //             } else {
    //                 toast.error(`${data.message}`);
    //             }

    //         } catch (error) {
    //             toast.error("Something went wrong, try again later");
    //             console.error("Unable to delete the post:", error);
    //         }
    //     }
    // }

    // handle post delete


    const handleDelete = async (confirmed) => {
        if (confirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success("Post deleted successfully");
                    if (userId) {
                        const userResponse = await fetch(`${import.meta.env.VITE_URL}/users/${userId}`);
                        const updatedUserData = await userResponse.json();
                        // Dispatch the setUser action to update the user state
                        dispatch(setUser({ user: updatedUserData }));
                        fetchAllPost();
                    }
                    navigate(-1);
                } else {
                    toast.error(`${data.message}`);
                }
            } catch (error) {
                toast.error("Something went wrong, try again later");
                console.error("Unable to delete the post:", error);
            }
        } else {
            toast.info("Deletion cancelled");
        }
        setIsDialogOpen(false); // Close the dialog
    };

    return (
        <div
            className="w-full flex items-center justify-between gap-1 sm:gap-2 bg-white py-2 px-2 rounded-lg shadow "
        >
            <img
                src={`${import.meta.env.VITE_URL}${post.thumbnailUrl}`}
                alt="thumbnail"
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-full cursor-pointer"
                onClick={() => navigate(`/post/${post._id}`)} />
            <div
                className='w-3/4 cursor-pointer'
                onClick={() => navigate(`/post/${post._id}`)}
            >
                <p className="text-sm lg:text-lg font-semibold">{post.title}</p>
                <p className="text-xs md:text-sm text-gray-500">{post.description.slice(0, 50)}</p>
            </div>

            <div className="ml-auto w-min flex flex-col flex-wrap sm:flex-row gap-x-4 gap-y-2">
                <button
                    className="w-16 sm:w-20 text-sm font-semibold py-1 bg-green-500 text-white rounded-full"
                    onClick={() => navigate(`/post/update/${post._id}`)}>
                    Edit
                </button>
                <button
                    className="w-16 sm:w-20 text-sm font-semibold py-1 bg-red-500 text-white rounded-full"
                     onClick={() => setIsDialogOpen(true)}>
                    Delete
                </button>

                {/* confirm delete box */}
                <ConfirmDialog
                    isOpen={isDialogOpen}
                    onConfirm={(confirmed) => handleDelete(confirmed)}
                    onCancel={() => handleDelete(false)}
                    message="Are you sure you want to delete the post?"
                />
            </div>
        </div>
    )
}

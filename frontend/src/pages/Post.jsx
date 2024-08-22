import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineInsertComment } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../store/userSlice';

const Post = () => {
    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const dispatch = useDispatch();
    const userId = user?._id;

    //get post data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts/${postId}`);
                const result = await response.json();

                if (result.data == undefined) navigate("/");
                setPost(result.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('Post not found (404)');
                } else {
                    console.error('Something went wrong', error.message);
                }
            }
        };

        fetchData();
    }, [postId]);

    let className = "hidden";
    if (user) {
        if (user.posts.includes(postId)) {
            className = "space-x-2 text-sm text-white";
        }
    }

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
        <div className="flex gap-6">
            <div className="space-y-4 w-full lg:w-2/3 bg-white p-4 rounded shadow-xl">
                <div>
                    <img src="https://res.cloudinary.com/drza1itfd/image/upload/v1724225521/zupay-blog/posts/pexels-toan-van-1745332-14445098_dvwgwc.jpg" alt="hero" className="w-full h-[450px] rounded " />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex gap-3 text-md text-gray-600">
                            <span className="flex items-center gap-1"><FaRegPenToSquare />{post.author}</span>
                            <span className="flex items-center gap-1"><TbCategory />{post.category}</span>
                            <span className="flex items-center gap-[1px]"><MdOutlineInsertComment /> 13</span>
                        </div>
                        <div className={className}>
                            <button
                                className="bg-green-600 py-1 px-4 rounded-full"
                                onClick={() => navigate(`/post/update/${postId}`)}>
                                Update
                            </button>
                            <button
                                className="bg-red-600 py-1 px-4 rounded-full"
                                onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold text-gray-800">{post.title}</h2>
                    <p className="text-md">{post.description}</p>
                </div>

                <div className="w-full border-2 rounded p-4 space-y-2">
                    <h2 className="text-gray-800 font-semibold">Leave a comment</h2>
                    <textarea className="w-full h-40 bg-gray-200 rounded outline-none text-sm p-2"></textarea>
                    <button className="text-sm px-4 py-2 bg-green-500 rounded-full text-white font-semibold">Post comment</button>
                </div>
            </div>
            <div className="hidden w-1/3 lg:block">
                < Sidebar />
            </div>
        </div>
    )
}

export default Post;
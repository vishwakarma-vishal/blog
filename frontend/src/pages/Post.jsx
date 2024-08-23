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
import ConfirmDialog from '../components/post/ConfirmDialog';

const Post = () => {
    const user = useSelector((state) => state.user.user);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const dispatch = useDispatch();
    const userId = user?._id;

    //get post data
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

    useEffect(() => {
        fetchData();
    }, [postId]);

    //Check if the post is inside the user posts obj
    const check = user && user.posts ? user.posts.some(post => post._id === postId) : false;

    let className = "hidden";
    if (user) {
        if (check) {
            className = "space-x-2 text-sm text-white";
        }
    }

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

    // handle post comment
    const [commentdata, setCommentdata] = useState({
        author: "",
        comment: ""
    });

    useEffect(() => {
        if (post && post.author) {
            setCommentdata({
                author: post.author,
                comment: "",
                user:"566",
            });
        }
    }, [post]);

    const handleComment = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentdata),
            });
            if (response.ok) {
                toast.success("Comment created");
                fetchData();
            }
            else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Error:", error)
            ("something went wrong", error);
        }
    }

    return (
        <div className="flex gap-6">
            <div className="space-y-4 w-full lg:w-2/3 bg-white p-4 rounded shadow-xl">
                <div>
                    <img src={`${import.meta.env.VITE_URL}${post.thumbnailUrl}`} alt="hero" className="w-full h-[450px] rounded " />
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
                                className="bg-green-600 hover:bg-green-700 py-1 px-4 rounded-full"
                                onClick={() => navigate(`/post/update/${postId}`)}>
                                Update
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 py-1 px-4 rounded-full"
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

                    <h2 className="text-3xl font-semibold text-gray-800">{post.title}</h2>
                    <p className="text-md whitespace-pre-wrap">{post.description}</p>
                </div>

                {/* comment section */}
                <div className="w-full border-2 rounded p-4 space-y-2">
                    <h2 className="text-gray-800 font-semibold">Comments</h2>

                    <div className="h-40 rounded p-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll shadow-inner">
                        {
                            post.comments?.map((comment) => {
                                return (
                                    <div className="flex flex-col text-sm border-b pb-2">
                                        <span >{comment.author}</span>
                                        <span className="text-xs">{comment.comment}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className="text-sm font-semibold pt-2">Leave a comment</p>
                    <textarea
                        className="w-full h-20 bg-gray-200 rounded outline-none text-sm p-2"
                        value={commentdata.comment}
                        onChange={(e) => setCommentdata((prevData) => ({
                            ...prevData,
                            comment: e.target.value
                        }))}
                        disabled={!user}
                    />
                    <button
                        className="text-sm px-4 py-2 bg-green-500 rounded-full text-white font-semibold"
                        onClick={handleComment}
                        disabled={!user}
                    >
                        Post comment
                    </button>
                    {!user && <p className="text-red-500 text-xs">You must be logged in to post a comment.</p>}
                </div>
            </div>
            <div className="hidden w-1/3 lg:block">
                < Sidebar />
            </div>
        </div>
    )
}

export default Post;
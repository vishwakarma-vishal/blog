import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { setUser } from '../store/userSlice'; // Import the setUser action
import Icon from "../assets/writer.png";

const CreatePost = ({ fetchData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useSelector((state) => state.user.user);

    // blog categories
    const blogCategories = [
        "All",
        "Technology",
        "Health & Wellness",
        "Finance",
        "Travel",
        "Lifestyle",
        "Food & Recipes",
        "Fashion",
        "Personal Development",
        "Business",
        "Entertainment"
    ];

    // Initialize post data
    const [postdata, setPostdata] = useState({
        title: "",
        description: "",
        category: "All",
        author: `${user.firstName} ${user.lastName}`
    });

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.user?._id);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setFilePreview("");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPostdata((prePostdata) => ({
            ...prePostdata,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('thumbnail', file);
        formData.append('title', postdata.title);
        formData.append('description', postdata.description);
        formData.append('category', postdata.category);
        formData.append('author', postdata.author);
        formData.append('userId', user._id);

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/posts/create`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("New post created");

                if (userId) {
                    const userResponse = await fetch(`${import.meta.env.VITE_URL}/users/${userId}`);
                    const updatedUserData = await userResponse.json();
                    console.log(updatedUserData);
                    fetchData();
                    // Dispatch the setUser action to update the user state
                    dispatch(setUser({ user: updatedUserData }));
                }
                navigate('/');
            } else {
                toast.error(`${data.message}`);
            }

        } catch (error) {
            toast.error("Something went wrong, try again later");
            console.error("Error while creating a post:", error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className='text-xl sm:text-2xl font-semibold text-gray-800 my-4'>Create a new Post</h1>

            <div className='flex relative'>
                <form
                    onSubmit={handleSubmit}
                    className='border bg-white p-4 md:p-6 space-y-4 border-none rounded shadow-lg w-full lg:w-8/12'>
                    <div className='space-y-1'>
                        <label
                            htmlFor="thumbnail"
                            className='text-md font-semibold text-gray-800'>
                            Thumbnail
                        </label><br />
                        <div
                            className={`relative w-full bg-transparent border-2 h-60
                    ${filePreview ? 'border-green-500' : 'border-dashed'} 
                    rounded flex flex-col items-center justify-center gap-2 p-4 text-gray-600 hover:text-gray-700`}>
                            <input
                                id="thumbnail"
                                type="file"
                                name="file"
                                className='absolute w-full h-full opacity-0 cursor-pointer'
                                onChange={handleFileChange}
                                required
                            />
                            {filePreview ? (
                                <img src={filePreview} alt="File preview" className='w-40 h-40 object-cover mb-2 rounded' />
                            ) : (
                                <IoCloudUploadOutline className='inline-block text-6xl' />
                            )}
                            <span className='text-xs'>
                                {filePreview ?
                                    <div className=' text-green-500 space-x-1'>
                                        <IoCheckmarkCircleOutline className='inline-block text-4xl' />
                                        <span>'File ready to upload'</span>
                                    </div> :
                                    'Select to upload image'
                                }
                            </span>
                        </div>
                    </div>
                    <div className='space-y-1'>
                        <label
                            htmlFor="category"
                            className='text-md font-semibold text-gray-800'>
                            Category
                        </label><br />
                        <select
                            id="category"
                            name="category"
                            className="w-full border p-2 outline-none rounded"
                            value={postdata.category || "All"}
                            onChange={handleChange}
                            required
                        >
                            {blogCategories.map((blogCategory, index) => (
                                <option key={index} value={blogCategory}>
                                    {blogCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='space-y-1'>
                        <label
                            htmlFor="title"
                            className='text-md font-semibold text-gray-800'>
                            Title
                        </label><br />
                        <input
                            id="title"
                            type="text"
                            name="title"
                            minLength={10}
                            placeholder="Enter post title"
                            className='w-full border p-2 outline-none rounded'
                            value={postdata.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='space-y-1'>
                        <label
                            htmlFor="description"
                            className='text-md font-semibold text-gray-800'>
                            Description
                        </label><br />
                        <textarea
                            id="description"
                            name="description"
                            placeholder='Write your post...'
                            className='w-full h-[30vh] border p-2 outline-none rounded'
                            minLength={1000}
                            value={postdata.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className={`bg-green-500 text-white font-semibold px-4 py-2 rounded-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Create Post'}
                    </button>

                    {isSubmitting && (
                        <div className="loader mt-2 text-green-500">Processing...</div>
                    )}
                </form>

                {/* Inspiration Sidebar */}
                <div className="hidden lg:flex h-screen sticky top-0 w-4/12 p-6 bg-gray-100 text-gray-800  flex-col justify-center items-center rounded shadow-lg ml-4 bg-white">
                    <h2 className="text-xl font-bold mb-4">Get Inspired</h2>

                    <p className="italic text-lg mb-6 text-center">
                        "Creativity is intelligence having fun."
                    </p>

                    <p className="text-base mb-6 text-center">
                        Every word you write has the potential to ignite change. Let your creativity shine through.
                    </p>

                    {/*  3D Icon */}
                    <img
                        src={Icon}
                        alt="3D Icon"
                        className="rounded-lg shadow-md mb-6 w-32 h-32"
                    />

                    <ul className="text-sm list-disc list-inside space-y-2">
                        <li>Write with authenticity and passion.</li>
                        <li>Let your ideas flow without self-doubt.</li>
                        <li>Your words can inspire others—make them count.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;

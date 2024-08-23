import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const UpdatePost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

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

    const [post, setPost] = useState({
        title: "",
        description: "",
        category: "",
        author: "",
        thumbnailUrl: ""
    });

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState("");

    // Load current post data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts/${postId}`);
                const result = await response.json();
                const data = result.data;

                setPost({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    author: data.author,
                    thumbnailUrl: data.thumbnailUrl
                });
                setFilePreview(`${import.meta.env.VITE_URL}${data.thumbnailUrl}`);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };

        fetchData();
    }, [postId]);

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

    // update the input values
    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    };

    // submite the form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        if (file) {
            formData.append('thumbnail', file); 
        }
        formData.append('title', post.title);
        formData.append('description', post.description);
        formData.append('category', post.category);

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/posts/update/${postId}`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Post updated successfully");
                navigate(-1);
            } else {
                toast.error(`${data.message}`);
                console.log(data);
            }

        } catch (error) {
            toast.error("Something went wrong, try again later");
            console.error("Error while updating the post:", error);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Update Post</h1>

            <form
                onSubmit={handleSubmit}
                className='border bg-white p-6 space-y-4 border-none rounded shadow-lg'>
                <div className='space-y-1'>
                    <label
                        htmlFor="thumbnail"
                        className='text-md font-semibold text-gray-800'>
                        Thumbnail
                    </label><br />
                    <div
                        className={`relative w-full bg-transparent border-2 h-60
                        ${filePreview ? 'border-green-500' : 'border-dashed'} 
                        rounded flex flex-col items-center justify-center gap-2 p-10 text-gray-600 hover:text-gray-700`}>
                        <input
                            id="thumbnail"
                            type="file"
                            name="file"
                            className='absolute w-full h-full opacity-0 cursor-pointer'
                            onChange={handleFileChange}
                        />
                        {filePreview ? (
                            <img src={filePreview} alt="File preview" className='w-40 h-40 object-cover mb-2 rounded' />
                        ) : (
                            <IoCloudUploadOutline className='inline-block text-6xl' />
                        )}
                        <span className='text-xs'>
                            {filePreview ?
                                <div className='text-green-500 space-x-1'>
                                    <IoCheckmarkCircleOutline className='inline-block text-4xl' />
                                    <span>File ready to upload</span>
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
                        value={post.category || "All"}
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
                        className='w-full border p-2 outline-none rounded'
                        value={post.title}
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
                        className='w-full h-[30vh] border p-2 outline-none rounded'
                        value={post.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-green-500 text-white font-semibold px-4 py-2 rounded-full'>
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
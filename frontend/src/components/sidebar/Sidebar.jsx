import React, { useState, useEffect } from 'react';
import { MiniCard } from './MiniCard';

export const Sidebar = () => {
    //fetch most recent 5 posts
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts`);
                const data = await response.json();

                // Sort posts by `createdAt` in descending order
                const sortedPosts = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const recentPosts = sortedPosts.slice(0, 5);

                setPosts(recentPosts);
                setLoading(false);
            } catch (error) {
                console.log("Something went wrong", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-fit basis-1/3 space-y-4 px-4 py-8 bg-white shadow-xl rounded">
            <h2 className="text-2xl text-center text-gray-800">Recent Post</h2>

            {posts.map((post) => {
                return <MiniCard key={post._id} post={post} />
            })}

            <div className='space-y-2'>
                <h2 className="w-full text-lg font-semibold text-gray-800">Categories</h2>
                <div className=' flex flex-wrap gap-2 text-sm text-blue-600'>
                    {posts.map((post) => {
                        return (
                            <span
                                key={post._id}
                                className='hover:underline cursor-pointer'>
                                {post.category}
                            </span>)
                    })}
                </div>
            </div>
        </div>
    )
}

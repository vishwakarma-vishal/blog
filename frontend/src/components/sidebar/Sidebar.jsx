import React, { useState, useEffect } from 'react';
import { MiniCard } from './MiniCard';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

export const Sidebar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    //fetch most recent 5 posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts`);
                const data = await response.json();

                // Sort posts by `createdAt` in descending order
                const sortedPosts = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const recentPosts = sortedPosts.slice(0, 5);

                setPosts(recentPosts);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };

        fetchData();
    }, []);

    // Handle search 
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="sticky top-4 h-fit basis-1/3 space-y-4 px-4 py-12 bg-white shadow-xl rounded">
             {/* Search functionality */}
             <form onSubmit={handleSearchSubmit} className="h-12 flex gap-2 items-center bg-white text-black rounded-full pl-4 border shadow-md">
                    <input
                        type="text"
                        placeholder="search post.."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="outline-none w-full"
                    />
                    <button type="submit" className="h-12 text-2xl text-white p-3 rounded-full bg-green-400 hover:bg-green-500">
                        <CiSearch />
                    </button>
                </form>

            <h2 className="text-2xl text-center text-gray-800">Recent Post</h2>

            {posts.map((post) => {
                return <MiniCard key={post._id} post={post} />
            })}
        </div>
    )
}

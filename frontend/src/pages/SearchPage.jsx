import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/home/Card";

const SearchPage = ({ posts }) => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const query = new URLSearchParams(useLocation().search).get("query") || "";

    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPosts(results);
    }, [query, posts]);

    return (
        <div>
            <h1 className="text-xl sm:text-2xl text-center font-semibold text-gray-900 m-6">Search Results for "{query}"</h1>

            <div className="flex justify-center">
                {filteredPosts.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredPosts.map((post) => (
                            <Card key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        </div>)
};

export default SearchPage;

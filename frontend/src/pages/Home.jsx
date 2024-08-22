import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import Card from "../components/home/Card";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch all the posts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts`);
                const result = await response.json();
                setPosts(result.data);
                setLoading(false);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center">
            {loading ?
                <Loader /> :
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <Card key={post._id} post={post} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Home;
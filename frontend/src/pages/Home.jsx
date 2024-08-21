import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import Card from "../components/home/Card";

const Home = () => {
    // fetch all the posts
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/posts`);
                const data = await response.json();
                setPosts(data.data);
                console.log("response->", data.data);
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
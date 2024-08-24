import { PostCard } from "../components/profile/PostCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import profileImg from "../assets/profile.png";

const Profile = ({fetchAllPost}) => {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.user.user);
    console.log("user->", user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/users/${user._id}`);
                const data = await response.json();
                setPosts(data.posts);

                console.log("response->", data.posts);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center gap-2 sm:gap-4">
                    <img src={profileImg} alt="profile" className="w-24 sm:w-28 h-24 sm:h-28 border-4 border-green-500 rounded-full" />
                    <div className="flex flex-col">
                        <p className="text-2xl sm:text-3xl font-bold">User</p>
                        <p className="font-semibold text-sm lg:text-lg">Name: <span className="font-normal italic">{user.firstName} {user.lastName}</span></p>
                        <p className=" font-semibold text-sm lg:text-lg">Email: <span className="font-normal italic">{user.email}</span></p>
                    </div>
                </div>


                <div className="flex flex-row gap-x-2 sm:flex-col items-center mr-10">
                    <span className="inline-block text-md sm:text-xl font-bold text-gray-900">Total Post</span>
                    <span className="inline-block text-2xl sm:text-6xl font-bold text-green-500">{posts?.length}</span>
                </div>

            </div>

            <div className="w-full space-y-4 py-4">
                <h2 className="text-xl sm:text-2xl text-gray-800 font-semibold text-gray-800">Your Posts</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts && posts.map((post) => {
                        return <PostCard key={post._id} post={post} fetchAllPost={fetchAllPost} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile;
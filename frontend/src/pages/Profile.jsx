import { IoPersonSharp } from "react-icons/io5";
import { PostCard } from "../components/profile/PostCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
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
            <div className="flex justify-between items-start">
                {/* <img src="" alt="profile" className="w-20 h-20" /> */}
                <div className="flex flex-col items-center">
                    <IoPersonSharp className="w-28 h-28 pt-5 border-2 rounded-full" />
                    <h2 className="text-md font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
                    <p className="text-sm font-semibold">Email: <span className="font-normal">{user.email}</span></p>
                </div>

                <div>
                    <button className="w-fit text-sm font-semibold py-2 px-4 bg-green-500 text-white rounded-full">Update profile</button>
                </div>
            </div>

            <div className="w-full space-y-4 py-4">
                <h2 className="text-2xl text-gray-800">Your Posts</h2>

                {posts && posts.map((post)=>{
                    return <PostCard key={post._id} post={post}/>
                })}
               
            </div>
        </div>
    )
}

export default Profile;
import { IoPersonSharp } from "react-icons/io5";
import { PostCard } from "../components/profile/PostCard";

const Profile = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                {/* <img src="" alt="profile" className="w-20 h-20" /> */}
                <div className="flex flex-col items-center">
                    <IoPersonSharp className="w-28 h-28 pt-5 border-2 rounded-full" />
                    <h2 className="text-md font-semibold text-gray-800">Vishal Vishwakarma</h2>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <input type="email" placeholder="vishalvishwak@gmail.com" className="w-max bg-transparent outline-none" disabled></input>
                    <button className="w-fit text-sm font-semibold py-1 px-4 bg-green-500 text-white rounded-full">Change email</button>
                </div>
            </div>

            <div className="w-full space-y-4 py-4">
                <h2 className="text-2xl text-gray-800">Your Posts</h2>

                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}

export default Profile;
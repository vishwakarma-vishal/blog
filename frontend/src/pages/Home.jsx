import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import Card from "../components/home/Card";

const Home = ({posts,loading}) => {

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
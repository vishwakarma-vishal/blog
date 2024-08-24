import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "./components/Header";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";

import UpdatePost from "./pages/UpdatePost";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Footer from "./components/Footer";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all the posts
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <Header posts={posts}/>

      <main className="p-2 sm:p-4 md:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Home posts={posts} loading={loading} />} />
          <Route path="/search" element={<SearchPage posts={posts} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:postId" element={<Post fetchAllPost={fetchData} />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route path="/create" element={isLoggedIn ? <CreatePost fetchData={fetchData}/> : <Navigate to="/login" />} />
          <Route path="/post/update/:postId" element={isLoggedIn ? <UpdatePost /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile fetchAllPost={fetchData} /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

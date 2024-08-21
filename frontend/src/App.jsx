// src/App.js
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from './pages/Login';
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import UpdatePost from "./pages/UpdatePost";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Footer from "./components/Footer";

const App = () => {
  // Use useSelector to access the Redux store
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="p-4 sm:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route path="/post/update/:postId" element={isLoggedIn ? <UpdatePost /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/create" element={isLoggedIn ? <CreatePost /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

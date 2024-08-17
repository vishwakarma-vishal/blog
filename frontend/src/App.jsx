import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import Footer from "./components/Footer";

const App = () => {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header/>

      <main className="p-4 sm:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App;

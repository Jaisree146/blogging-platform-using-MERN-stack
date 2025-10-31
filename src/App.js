import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import MyBlogs from './pages/MyBlogs';
import EditPost from './pages/EditPost';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:slug" element={<EditPost />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-blogs" element={<MyBlogs />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <footer className="app-footer">© {new Date().getFullYear()} BlogNest</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

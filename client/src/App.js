import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Feed from './pages/Feed';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import SingleBlog from './pages/SingleBlog'; // Import the SingleBlog component
import UserSingleBlog from './pages/userSingleBlog';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs/:blogId" element={<SingleBlog />} />
        <Route path="/userblogs/:blogId" element={<UserSingleBlog />} />
      </Routes>
    </Router>
  );
}

export default App;

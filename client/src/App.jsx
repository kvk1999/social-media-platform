import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { CommentProvider } from './context/CommentContext';
import { FriendProvider } from './context/FriendContext';
import { NotificationProvider } from './context/NotificationContext';
import { StoryProvider } from './context/StoryContext';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';
import PostPage from './pages/Post';
import NotificationsPage from './pages/Notifications';
import FriendRequestsPage from './pages/FriendRequests';
import StoriesPage from './pages/Stories';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import EditProfilePage from './pages/EditProfile';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './styles/globals.css'; // Global CSS (including Tailwind)

const App = () => {
  useEffect(() => {
    // This effect can be used to perform any necessary initializations, 
    // like checking user authentication status on load.
  }, []);

  return (
    <AuthProvider>
      <PostProvider>
        <CommentProvider>
          <FriendProvider>
            <NotificationProvider>
              <StoryProvider>
                <Router>
                  <div className="min-h-screen flex flex-col bg-gray-100">
                    {/* Navbar and Sidebar (always visible on most pages) */}
                    <Navbar />
                    <div className="flex">
                      <Sidebar />
                      <div className="flex-grow p-6">
                        {/* Routing to different pages */}
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/profile/edit" element={<EditProfilePage />} />
                          <Route path="/post/:postId" element={<PostPage />} />
                          <Route path="/notifications" element={<NotificationsPage />} />
                          <Route path="/friend-requests" element={<FriendRequestsPage />} />
                          <Route path="/stories" element={<StoriesPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </Router>
              </StoryProvider>
            </NotificationProvider>
          </FriendProvider>
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;

import { Link, Outlet } from "react-router-dom";
import { fetchPosts, createPost } from '../services/postservice';

const Home = () => {
  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetchPosts();
      console.log(posts);
    };
    getPosts();
  }, []);

  const handleCreatePost = async () => {
    const newPost = { title: 'New Post', content: 'Post content...' };
    const createdPost = await createPost(newPost);
    console.log(createdPost);
  };

  return <button onClick={handleCreatePost}>Create Post</button>;
}; 

export default Home;
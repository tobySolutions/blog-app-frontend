import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notify from "./Notify";

function Home({ socket }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const createPostBtn = () => {
    fetchUser();
    navigate("/post/create");
  }

  const fetchUser = () => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        // converts the array to a string
        const stringData = data.toString();
        // saved the data to local storage
        localStorage.setItem("users", stringData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    function fetchPosts() {
      console.log("running");
      fetch("http://localhost:4000/api")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        })
        .catch((err) => console.error(err));
    }
    fetchPosts();
  }, []);

  // saves the posts into the "posts" state
  useEffect(() => {
    socket.on("updatePosts", (posts) => setPosts(posts));
  }, [socket]);

  // Navigates to the NotionPost page to view all the contents
  const readMoreBtn = (postID) => {
    console.log(postID);
    socket.emit("findPost", postID);
    navigate(`/post/${postID}`);
  };

  return (
    <div className="home">
      <nav className="home__navbar">
        <h2>Toby-Notion</h2>
        <div className="home__buttons">
          <button className="home__createBtn" onClick={createPostBtn}>
            CREATE POST
          </button>
          <button className="home__notifyBtn">NOTIFY</button>
        </div>
      </nav>

      <div className="posts_container">
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <button className="post__cta" onClick={() => readMoreBtn(post.id)}>
              READ MORE
            </button>
            <Notify/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

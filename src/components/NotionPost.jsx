import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NotionPost({ socket }) {
  // gets the Post ID from its URL
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [post, setPost] = useState({});

  // loading state for async request
  const [loading, setLoading] = useState(true);

  // Gets the post details from the server for display

  useEffect(() => {
    socket.on("postDetails", (data) => {
      setPost(data);
      setLoading(false);
    });
  }, []);

  // create new comments
  const handleAddComment = (event) => {
    event.preventDefault();
    socket.emit("newComment", {
      comment,
      user: localStorage.getItem("username"),
      postID: id,
    });
    setComment("");
  };

  if (loading) {
    return <h2>Loading... Please wait</h2>;
  }

  return (
    <div className="notionPost">
      <div className="notionPost__container">
        <h1>{post.title}</h1>
        <div className="notionPost__meta">
          <p className="notionPost__author"> By {post.author}</p>
          <p className="notionPost__date">Created on {post.createdAt}</p>
        </div>

        <div className="notionPost__content">{post.content}</div>
      </div>

      <div className="comments__container">
        <h2>Add Commments</h2>
        <form className="comments__inputContainer" onSubmit={handleAddComment}>
          <textarea
            placeholder="Type in your comments..."
            rows={5}
            value={comment}
            required
            className="comments__input"
            onChange={(event) => setComment(event.target.value)}
          />
          <button className="comments__cta">Add Comment</button>
        </form>

        <div>
          {post.comments.map((item) => (
            <p className="comment" key={item.id}>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.user}
              </span>{" "}
              {item.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotionPost;

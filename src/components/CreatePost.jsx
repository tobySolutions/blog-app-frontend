import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";





function CreatePost({ socket }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // an array containing the tags
  const [tags, setTags] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    function getUsers() {
      const storedUsers = localStorage?.getItem("users")?.split(",");
      setUsers(storedUsers);
    }

    getUsers();
  }, []);

  // The suggestion list for autocomplete
  const suggestions = users.map((name) => {
    return {
      id: name,
      text: name,
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  // The comma and enter keys are used to separate each tags
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  // deleting tags
  const handleDelete = (idx) => {
    setTags(tags.filter((tag, index) => index !== idx));
  };

  // adding new tags
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  // runs when you click on a tag
  const handleTagClick = (idx) => {
    console.log(`The tag at index ${idx} was clicked`);
  };

  // get the publish date for the post
  const currentDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  // logs the post details to the console
  const addPost = (event) => {
    event.preventDefault();

    // sends all the post details to the server
    socket.emit("createPost", {
      postTitle,
      postContent,
      username: localStorage.getItem("username"),
      timestamp: currentDate(),
      tags,
    });
    navigate("/dashboard");
  };

  return (
    <>
      <div className="createPost">
        <h2>Create a new Post</h2>
        <form className="createForm" onSubmit={addPost}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            required
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)}
            className="createForm__title"
          />

          <label htmlFor="title">Content</label>
          <textarea
            required
            rows={15}
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
            className="createForm__content"
          />

          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />

          <button className="createForm__button">ADD POST</button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;

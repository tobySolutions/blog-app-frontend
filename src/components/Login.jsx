import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Here, the application accepts the username and saves it in the local storage for user identification. Copy the code below into the Login component.

function Login({socket}) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // sends the username to the server
    socket.emit("addUser", username)
    localStorage.setItem("username", username);
    navigate("dashboard");
  };
  return (
    <div className="login">
      <h2>Sign in to Toby-Notion</h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="username">Enter Your Username</label>
        <input
          name="username"
          id="username"
          type="text"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="login__cta">LOG IN</button>
      </form>
    </div>
  );
}

export default Login;

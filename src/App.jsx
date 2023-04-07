import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotionPost from "./components/NotionPost";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Login from "./components/Login";
import { io } from "socket.io-client";

//👇🏻 http://localhost:4000 is where the server host URL.
const socket = io.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="dashboard" element={<Home socket={socket} />} />
        <Route path="/post/create" element={<CreatePost socket={socket} />} />
        <Route path="/post/:id" element={<NotionPost socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

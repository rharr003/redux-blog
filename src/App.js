import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import AddPostForm from "./AddPostForm";
import PostDetail from "./PostDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<AddPostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;

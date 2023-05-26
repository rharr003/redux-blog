import { useSelector } from "react-redux";
import Post from "./Post";
import "./Home.css";
import { getPosts } from "./reduxSetup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Home() {
  const posts = useSelector((state) => state.titles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  console.log(posts);
  return (
    <div>
      <h2 className="post-list-heading">Latest Posts</h2>
      <div className="post-list">
        {Object.keys(posts).map((key) => (
          <Post
            key={posts[key].id}
            id={posts[key].id}
            title={posts[key].title}
            content={posts[key].description}
            votes={posts[key].votes}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

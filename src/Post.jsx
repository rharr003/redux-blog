import "./Post.css";
import { Link } from "react-router-dom";
import PostVote from "./PostVote";
function Post({ title, content, id, votes }) {
  return (
    <div className="post">
      <Link to={`/posts/${id}`} className="post-title">
        {title}
      </Link>
      <p className="post-content">{content}</p>
      <PostVote post={{ id, votes }} />
    </div>
  );
}

export default Post;

import { useDispatch } from "react-redux";
import { postVote } from "./reduxSetup";

function PostVote({ post }) {
  const dispatch = useDispatch();
  const vote = (postId, direction) => dispatch(postVote(postId, direction));
  return (
    <div>
      <h5>Upvotes: {post.votes}</h5>
      <button onClick={() => vote(post.id, "up")}>Up</button>
      <button onClick={() => vote(post.id, "down")}>Down</button>
    </div>
  );
}

export default PostVote;

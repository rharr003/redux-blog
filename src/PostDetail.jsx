import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import EditPostForm from "./EditPostForm";
import AddCommentForm from "./AddCommentForm";
import "./PostDetail.css";
import { deletePost, getPost, deleteComment } from "./reduxSetup";
import { postVote } from "./reduxSetup";
import PostVote from "./PostVote";

function PostDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => {
    const post = state.posts[id];
    return post;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id, setLoading));
  }, [dispatch, id]);

  function toggleEdit() {
    setIsEditing((isEditing) => !isEditing);
  }

  function deleteP() {
    deletePost(id, navigate);
  }

  function deleteC(id, commentId) {
    dispatch(deleteComment(id, commentId));
  }

  function toggleCommentForm() {
    setShowCommentForm((showCommentForm) => !showCommentForm);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <>
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={deleteP}>Delete</button>
          <button onClick={toggleEdit}>Edit</button>
        </div>
        {isEditing && <EditPostForm id={id} toggleEdit={toggleEdit} />}
        <PostVote post={{ id, votes: post.votes }} />
        <div className="comments">
          <h3>Comments</h3>
          <button onClick={toggleCommentForm}>Add Comment</button>
          {showCommentForm && (
            <AddCommentForm id={id} toggleCommentForm={toggleCommentForm} />
          )}
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <button onClick={() => deleteC(id, comment.id)}>X</button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default PostDetail;

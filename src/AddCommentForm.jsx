import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "./reduxSetup";
import "./AddCommentForm.css";

function AddCommentForm({ id, toggleCommentForm }) {
  const [formData, setFormData] = useState({
    comment: "",
  });
  const dispatch = useDispatch();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addComment(id, formData.comment));
    toggleCommentForm();
    setFormData({
      comment: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label htmlFor="comment" className="comment-form-label">
        Comment
      </label>
      <input
        className="comment-form-input"
        type="text"
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
      />
      <button type="submit" className="comment-form-button">
        Add Comment
      </button>
    </form>
  );
}

export default AddCommentForm;

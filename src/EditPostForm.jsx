import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./reduxSetup";
import { useNavigate } from "react-router";
import "./AddPostForm.css";

function EditPostForm({ id, toggleEdit }) {
  const post = useSelector((state) => state.posts[id]);
  const navigate = useNavigate();
  console.log(post);
  const [formData, setFormData] = useState({
    id: post.id,
    title: post.title,
    description: post.description,
    body: post.body,
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
    toggleEdit();
    dispatch(editPost(formData, post.comments));
  }

  function handleCancel(event) {
    event.preventDefault();
    toggleEdit();
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <label htmlFor="title" className="form-label">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-input"
      />
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-input"
      />
      <label htmlFor="Body" className="form-label">
        Body
      </label>
      <textarea
        id="body"
        name="body"
        value={formData.body}
        onChange={handleChange}
        className="form-textarea"
      />
      <button type="submit">Save Changes</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default EditPostForm;

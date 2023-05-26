import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addPost } from "./reduxSetup";
import "./AddPostForm.css";

function AddPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    comments: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPost(formData, navigate);
  }

  function handleCancel(event) {
    event.preventDefault();
    navigate("/");
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
      <button type="submit">Add Post</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default AddPostForm;

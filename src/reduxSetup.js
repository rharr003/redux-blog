import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import { redirect } from "react-router";

const initialState = {
  titles: [],
  posts: {},
};

function getPosts() {
  return async function (dispatch) {
    const response = await fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => data);

    dispatch({
      type: "SET_POSTS",
      payload: response,
    });
  };
}

function getPost(id, setLoading) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => data);
    dispatch({
      type: "ADD_POST",
      payload: response,
    });
    setLoading(false);
  };
}

async function addPost(formData, navigate) {
  const response = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => data);
  console.log(response);
  navigate("/");
}

async function deletePost(id, navigate) {
  await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: "DELETE",
  });
  navigate("/");
}

function editPost(formData, comments) {
  return async function (dispatch) {
    const response = await fetch(
      `http://localhost:5000/api/posts/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    console.log(response);
    dispatch({
      type: "EDIT_POST",
      payload: { ...response, comments },
    });
  };
}

function addComment(id, comment) {
  return async function (dispatch) {
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment }),
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    console.log(response);
    dispatch({
      type: "ADD_COMMENT",
      payload: { id, comment: response },
    });
  };
}

function deleteComment(id, commentId) {
  return async function (dispatch) {
    await fetch(`http://localhost:5000/api/posts/${id}/comments/${commentId}`, {
      method: "DELETE",
    });
    dispatch({
      type: "DELETE_COMMENT",
      payload: { postId: id, commentId },
    });
  };
}

function postVote(id, direction) {
  return async function (dispatch) {
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}/vote/${direction}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    dispatch({
      type: direction === "up" ? "UPVOTE" : "DOWNVOTE",
      payload: {
        id,
        votes: response.votes,
      },
    });
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload,
        },
      };
    case "EDIT_POST":
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            ...action.payload,
          },
        },
      };

    case "ADD_COMMENT":
      const post = state.posts[action.payload.id];
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...post,
            comments: [...post.comments, action.payload.comment],
          },
        },
      };

    case "DELETE_COMMENT":
      const post1 = state.posts[action.payload.postId];
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...post1,
            comments: post1.comments.filter(
              (comment) => comment.id !== action.payload.commentId
            ),
          },
        },
      };

    case "SET_POSTS":
      return {
        ...state,
        titles: action.payload,
      };

    case "UPVOTE":
      return {
        titles: state.titles.map((title) => {
          if (title.id === action.payload.id) {
            return { ...title, votes: action.payload.votes };
          }
          return title;
        }),

        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            votes: action.payload.votes,
          },
        },
      };

    case "DOWNVOTE":
      return {
        titles: state.titles.map((title) => {
          if (title.id === action.payload.id) {
            return { ...title, votes: action.payload.votes };
          }
          return title;
        }),

        posts: {
          ...state.posts,
          [action.payload.id]: {
            ...state.posts[action.payload.id],
            votes: action.payload.votes,
          },
        },
      };

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export {
  store,
  getPosts,
  getPost,
  addPost,
  deletePost,
  editPost,
  addComment,
  deleteComment,
  postVote,
};

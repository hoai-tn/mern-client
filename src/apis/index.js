import axios from "axios";

const url = "http://localhost:9999";

const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts/creator", newPost);
export const modifyPost = (post) => API.patch(`/posts/${post._id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like-post`);

export const signIn = (form) => API.post("/user/sign-in", form);
export const signUp = (form) => API.post("/user/sign-up", form);

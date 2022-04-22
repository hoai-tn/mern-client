import axios from "axios";

const url = "http://localhost:9999/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url + "/creator", newPost);

export const modifyPost = (post) => axios.patch(`${url}/${post._id}`, post);

export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/like-post`);

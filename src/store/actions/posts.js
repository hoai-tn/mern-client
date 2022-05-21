import * as api from '../../apis';
import {
  COMMENT,
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  GET_POST,
  LIKE,
  MODIFY,
  SET_POST,
} from '../../contants/actionTypes';

// Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPost(id);
    dispatch({ type: GET_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setPost = (post) => (dispatch) => {
  dispatch({ type: SET_POST, payload: post });
};

export const modifyPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.modifyPost(post);
    dispatch({ type: MODIFY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (id, comment, name) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.addComment(id, comment, name);
    console.log(data);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

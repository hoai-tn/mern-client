import {
  COMMENT,
  CREATE,
  FETCH_ALL,
  FETCH_BY_CREATOR,
  FETCH_BY_SEARCH,
  GET_POST,
  LIKE,
  MODIFY,
  SET_POST,
} from "../../contants/actionTypes";

const initialState = {
  posts: [],
  post: {},
  postForm: {},
  currentPage: null,
  numberOfPage: null,
  isLoading: false,
};
const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };
    case GET_POST:
      return { ...state, post: action.payload.data[0] };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case SET_POST:
      return { ...state, postForm: action.payload };
    case COMMENT:
    case MODIFY:
    case LIKE:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        ],
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, posts: action.payload.data };
    case "DELETE":
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.payload)],
      };
    default:
      return state;
  }
};
export default posts;

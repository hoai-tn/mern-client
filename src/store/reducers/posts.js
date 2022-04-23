import {
  CREATE,
  FETCH_ALL,
  LIKE,
  MODIFY,
  SET_POST,
} from "../../contants/actionTypes";

const initialState = {
  posts: [],
  postForm: {},
};
const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case SET_POST:
      return { ...state, postForm: action.payload };
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

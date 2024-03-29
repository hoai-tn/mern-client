import { AUTH, LOGOUT, SIGN_IN } from "../../contants/actionTypes";

const initialState = {
  authData: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default auth;

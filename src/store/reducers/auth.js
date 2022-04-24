import { AUTH } from "../../contants/actionTypes";

const initialState = {
  authData: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.data);
      return state;
    default:
      return state;
  }
};
export default auth;

import * as api from "../../apis";
import { AUTH, SIGN_IN } from "../../contants/actionTypes";

export const signIn = (form, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(form);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (form, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(form);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

import { Dispatch } from "redux";
import { setToken } from "../../api";
import { createToken, LoginBody } from "../../api/user";

const login = (data: LoginBody) => async (dispath: Dispatch) => {
  try {
    const res = await createToken(data);
    console.log(res);
    setToken(res.accessToken)
  } catch (err) {
    console.log(err);
  }
};

export const userActions = {
  login,
};

import axios  from "axios";
import { UserToken } from "../types";


export interface LoginBody {
  username: string
  password: string
}

function createToken(data: LoginBody) {
  return Promise.resolve({
    accessToken: 'axdeufghjgehzdfpg',
    expiry: 3600*10,
    roles: ['admin'],
    tenantId: "10000",
    userId: "1"
  })
  // return axios.post<UserToken>("/tokens", data).then(res => res.data);
}

export { createToken };

import axios from "axios";

const URL = "http://localhost:3000/";

const getToken = () => {
  if (!localStorage) {
    return null
  }
  return localStorage.getItem("jwt");
};

const formatToken = (token: string | null) => {
  return token ;
};

// Public
export const setToken = (token: string | null) => {
  if (localStorage && token) {
    localStorage.setItem('jwt', token)
  }
  agentInstance.defaults.headers.common.Authorization = formatToken(token);
};

const agentInstance = axios.create({
  baseURL: URL,
  timeout: 4000,
  headers: {
    common: {
      "Access-Token": formatToken(getToken()),
    },
  },
});


const agentHeadness = axios.create({
  baseURL: URL,
  timeout: 4000,
})

agentHeadness.interceptors.response.use((response) => {
  return response.data;
});

agentInstance.interceptors.response.use((response) => {
  return response.data;
});


export {agentHeadness}

export default agentInstance;

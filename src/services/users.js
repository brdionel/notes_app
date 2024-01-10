import axios from "axios";
import { SERVER_URL } from "./settings";

export const validateEmail = (email) => {
  return axios.get(`${SERVER_URL}/users?email=${email}`);
};

export const loginService = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  return axios.post(`${SERVER_URL}/auth/login`, data);
};

export const registerService = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  return axios.post(`${SERVER_URL}/auth/signup`, data);
};

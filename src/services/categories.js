import axios from "axios";
import { SERVER_URL } from "./settings";

export const getAllCategories = () => {
  return axios.get(`${SERVER_URL}/categories`);
};

export const createCategory = (category) => {
  return axios.post(`${SERVER_URL}/categories`, category);
}
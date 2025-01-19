import axios from "axios";
import { SERVER_URL } from "./settings";

export const getAllCategories = async () => {
  const response = await axios.get(`${SERVER_URL}/categories`);
  return response.data.categories;
};

export const createCategory = async (category) => {
  const response = await axios.post(`${SERVER_URL}/categories`, category);
  return response.data;
};

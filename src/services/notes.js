import axios from "axios";
import { SERVER_URL } from "./settings";

let token;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllNotes = (page) => {
  return axios.get(`${SERVER_URL}/notes?page=${page}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const createNote = (note) => {
  return axios.post(`${SERVER_URL}/notes`, note, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteNote = (id) => {
  return axios.delete(`${SERVER_URL}/notes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateNote = (id, data) => {
  return axios.patch(`${SERVER_URL}/notes/${id}`, data, {
    headers: {
      Authorization: token,
    },
  });
};

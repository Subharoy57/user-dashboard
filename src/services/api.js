import React from "react"; 
import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getUserById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}
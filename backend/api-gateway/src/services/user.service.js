import axios from "axios";

const USER_URL = "http://localhost:4001";

export const login = (credentials) =>
  axios.post(`${USER_URL}/auth/login`, credentials).then(r => r.data);

export const getUserById = (id, token) =>
  axios.get(`${USER_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const deductBalance = (userId, amount, token) =>
  axios.post(`${USER_URL}/users/${userId}/deduct`, { amount }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);
import { User, UserLogin, UserRegister } from "../types/user";

import axios from "axios";

const USERS_API_URL = "http://localhost:8080/users";
const USER_LOGIN_API_URL = "http://localhost:8080/login";
const USER_REGISTER_API_URL = "http://localhost:8080/register";

export const createUser = async (user: UserRegister): Promise<User> => {
  const response = await axios.post(USER_REGISTER_API_URL, user);
  return response.data.data;
};

export const fetchUsers = async (): Promise<User> => {
  const response = await axios.get(USERS_API_URL);
  return response.data;
};

export const loginUser = async (user: UserLogin): Promise<User> => {
  const response = await axios.post(USER_LOGIN_API_URL, user);
  console.log(response.data);
  return response.data;
};

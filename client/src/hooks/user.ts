import { createUser, fetchUsers, loginUser } from "../api/user";
import { useMutation, useQuery } from "@tanstack/react-query";

const USERS = "USERS";

export const useUsers = () => {
  return useQuery([USERS], fetchUsers);
};

export const useCreateUser = () => {
  return useMutation(createUser);
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};

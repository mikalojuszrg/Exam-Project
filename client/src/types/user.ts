export type User = {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  id: string;
};

export type UserLogin = Omit<User, "id" | "first_name" | "last_name">;

export type UserRegister = Omit<User, "id">;

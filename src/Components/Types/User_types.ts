//create a User type
export type Signup_Types = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
};

export type Login_Types = {
  email: string;
  password: string;
};

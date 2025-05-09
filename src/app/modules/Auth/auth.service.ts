const loginUser = async (payload: { email: string; password: string }) => {
  console.log("Login user function called", payload);
};


export const AuthService = { loginUser };

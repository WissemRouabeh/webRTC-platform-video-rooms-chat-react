const signin = (user) => {
  return {
    type: "SIGNIN",
    payload: {
      isLogged: true,
      user,
    },
  };
};
const logout = () => {
  return {
    type: "LOGOUT",
  };
};
const login = () => {
  return {
    type: "LOGIN",
  };
};
export { signin, logout };

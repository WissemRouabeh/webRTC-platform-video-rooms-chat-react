const isLogged = (state = { isLogged: false }, action) => {
  switch (action.type) {
    case "SIGNIN":
      return (state = action.payload);

    case "LOGOUT":
      return (state = { isLogged: false });

    default:
      return state;
  }
};
export default isLogged;

import api from "../api";
const getUser = async (id) => {
  await api.get("/user/findbyid/" + id).then((res) => {
    return res.data.user;
  });
};
export { getUser };

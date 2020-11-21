import axios from "axios";
const getUser = ({ user, setUser, state, setState, formData, route }) => {
  axios
    .post(route, formData)
    .then((res) => {
      console.log(res.data);
      if (!res.data.error) {
        setUser(res.data);
        console.log(res.data);
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        //if not checking whether authenticated is false or not, infinite re-renders are occuring -> why is this
        if (!state.authenticated) setState({ ...state, authenticated: true });
      }
    })
    .catch((e) => console.log(e));
};

export { getUser };

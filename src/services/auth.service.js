import axios from "axios";
// const API_URL = "https://shisha-journey-backend.herokuapp.com/api/auth/";
const API_URL = "https://smoking-zombies-backend.herokuapp.com/api/auth/";

class AuthService {
  async login(email, password) {
    await axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("login success action", response.data);
          return response.data;
        }
      })
      .catch((error) => {
        console.log("login error actions", error);
        return;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, phone) {
    axios
      .post(API_URL + "signup", {
        username,
        email,
        password,
        phone,
      })
      .then((response) => {
        return response;
      });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();

import { AuthProvider } from "react-admin";

localStorage.setItem("username", "Faroe");

export const authProvider: AuthProvider = {
  login: ({ username }) => {
    localStorage.setItem("username", username);
    // accept all username/password combinations
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.reject("Unknown method"),
  getIdentity: () =>
    Promise.resolve({
      id: 0,
      fullName: "فربد نظری",
      avatar: "https://avatars.githubusercontent.com/u/81690217?v=4",
    }),
};

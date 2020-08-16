export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("chit-chat-auth")) {
    return JSON.parse(localStorage.getItem("chit-chat-auth"));
  } else {
    return false;
  }
};
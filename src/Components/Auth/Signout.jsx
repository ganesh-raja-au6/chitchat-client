export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("chit-chat-auth");
  next();
  return fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signout`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

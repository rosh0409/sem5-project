export const isLoggedIn = () => {
  if (localStorage.getItem("shopzilla_login") === "true") {
    return true;
  } else {
    return false;
  }
};

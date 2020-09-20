var baseUrl = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://bantuin-bisnis-teman-api.herokuapp.com";
}

const colorPalette = {
  primary: "#132743",
  secondary: "#407088",
  accent: "#70adb5",
  button: "132743",
  buttonHover: "#407088",
};

export { baseUrl, colorPalette };

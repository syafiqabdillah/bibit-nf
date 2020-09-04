var baseUrl = "http://localhost:5000"

if (process.env.NODE_ENV === "production") {
    baseUrl = "https://bantuin-bisnis-teman-api.herokuapp.com";
}

export { baseUrl };
let apiRoot = "";

console.log(import.meta.env)
console.log(process.env)
if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:3007";
}
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://fsapp-backend.onrender.com";
}
export const API_ROOT = apiRoot;

let apiRoot = "";
if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:3007";
}
if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://fsapp-backend.vercel.app";
}
export const API_ROOT = apiRoot;

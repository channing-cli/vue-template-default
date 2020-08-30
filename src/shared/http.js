import Axios from "axios";
import interceptors from "./interceptors";

const http = Axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "X-Requested-With": "Channing-Request",
    "Cache-Control": "no-cache"
  },
  timeout: 60000 // max time of request timeout
});

interceptors(http);

export { http };
export default http;

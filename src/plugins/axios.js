import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function setAuthorizationHeader(config) {
  // Be aware: Paypal redirect returns "token" query parameter
  const urlToken = new URLSearchParams(window.location.search).get("api_token");

  if (urlToken) {
    localStorage.setItem("token", urlToken);
  }

  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
}

// Request interceptor for API calls
instance.interceptors.request.use(
  (config) => {
    setAuthorizationHeader(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    if (typeof response.data == "object") {
      response.data.success = true;
    }
    return response;
  },
  async (error) => {
    error.response.data.success = false;
    return Promise.reject(error);
  }
);

export default instance;

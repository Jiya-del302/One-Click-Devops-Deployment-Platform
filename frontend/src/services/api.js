import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const deployRepository = async (githubUrl) => {
  const response = await api.post("/deploy", {
    githubUrl,
  });

  return response.data;
};

export default api;
import axios from "axios";

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);
//http://localhost:5000/api/upload
  return axios.post("https://ready-ai-pritiranjan-sahoo.vercel.app/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

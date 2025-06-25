/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

//createPost api that sends form data and token for authorization
export const createPost = async (data: FormData, token: string | null) => {
  try {
    const response = await axios.post(`${baseURL}/posts/createPost`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.post;
  } catch (e: any) {
    console.error("Error in CreatePost:", e);
    throw e;
  }
};
//getPost api that sends token for authorization and returns posts
export const getPost = async (token: any) => {
  try {
    const response = await axios.get(`${baseURL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.posts;
  } catch (e: any) {
    console.error("Error in gettingPost:", e);
    throw e;
  }
};

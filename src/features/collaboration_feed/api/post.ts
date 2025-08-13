/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { Post } from "../types/post_types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const createPost = async (data: FormData, token: string) => {
  try {
    const response = await api.post("/posts/createPost", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("CreatePost response:", response.data); // Debug
    return response.data.post;
  } catch (e: any) {
    console.error("Error in CreatePost:", e.response?.data || e.message);
    throw e;
  }
};

export const getPost = async (token: string | null) => {
  if (!token) {
    console.error("No token provided for getPost");
    throw new Error("No authentication token");
  }
  try {
    const response = await api.get("/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetPost response:", response.data); // Debug
    return response.data.posts;
  } catch (e: any) {
    console.error("Error in gettingPost:", e.response?.data || e.message);
    throw e;
  }
};

export const deletePost = async (postId: string, token: string) => {
  try {
    const response = await api.delete(`/posts/${postId}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("DeletePost response:", response.data); // Debug
    return response.data;
  } catch (e: any) {
    console.error("Error deleting post:", e.response?.data || e.message);
    throw e;
  }
};

export const editPost = async (id: string, content: string, token: string): Promise<Post> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/posts/${id}/edit`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const updatedPost = response.data;
    console.log("editPost response:", updatedPost); // Debug
    if (!updatedPost?._id || !updatedPost?.userId?._id) {
      throw new Error("Invalid post data returned from server");
    }
    return updatedPost as Post;
  } catch (e: any) {
    console.error("editPost error:", e.response?.data || e.message);
    throw new Error(e.response?.data?.message || "Failed to edit post");
  }
};

export const likePost = async (postId: string, token: string) => {
  try {
    const response = await api.post(
      `/posts/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("LikePost response:", response.data); // Debug
    return response.data.post;
  } catch (e: any) {
    console.error("Error liking post:", e.response?.data || e.message);
    throw e;
  }
};

export const unlikePost = async (postId: string, token: string) => {
  try {
    const response = await api.delete(`/posts/${postId}/like`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("UnlikePost response:", response.data); // Debug
    return response.data.post;
  } catch (e: any) {
    console.error("Error unliking post:", e.response?.data || e.message);
    throw e;
  }
};

export const getLikeCount = async (postId: string, token: string) => {
  try {
    const response = await api.get(`/posts/${postId}/like`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("GetLikeCount response:", response.data); // Debug
    return response.data.TotalLikes;
  } catch (e: any) {
    console.error("Error getting like count:", e.response?.data || e.message);
    throw e;
  }
};

// FIXED COMMENT API FUNCTIONS - Changed 'content' to 'text' parameter
export const addComment = async (postId: string, text: string, token: string) => {
  const res = await api.post(
    `/posts/${postId}/comment`,
    { text }, // FIXED: Changed from content to text
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getComments = async (postId: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await api.get(`/posts/${postId}/comments`, { headers });
  return res.data;
};

export const updateComment = async (postId: string, commentId: string, text: string, token: string) => {
  const res = await api.put(
    `/posts/${postId}/comments/${commentId}`,
    { text }, // FIXED: Changed from content to text
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteComment = async (postId: string, commentId: string, token: string) => {
  const res = await api.delete(
    `/posts/${postId}/comments/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
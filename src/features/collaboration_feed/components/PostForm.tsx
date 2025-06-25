/* eslint-disable @typescript-eslint/no-explicit-any */
import { authAtom } from "../../../jotai/auth";
import { useAtom } from "jotai";
import type {  PostReq } from "../types/post_types";
import { useState } from "react";
import { feedAtom } from "../../../jotai/feedAtom";
import { createPost } from "../api/post";

type UploadStatus = "uploading" | "success" | "idle" | "error";
function PostForm() {
  const [post, setPost] = useState<PostReq>({
    content: "",
    media: [
      {
        url: "",
        type: "",
      },
    ],
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [UploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [auth] = useAtom(authAtom);
  const [, setPosts] = useAtom(feedAtom);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (post.media[0].type !== "") {
      if (e.target.files) {
        setMediaFile(e.target.files[0]);
        setPost({
          ...post,
          media: [
            { ...post.media[0], url: URL.createObjectURL(e.target.files[0]) },
          ],
        });
      }
    } else {
      setUploadStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name == "media-type") {
      setPost({ ...post, media: [{ ...post.media[0], type: value }] });
      setUploadStatus("idle");
    } else {
      setPost({ ...post, [name]: value });
    }
  };
  console.log(post);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.content.trim() && !auth.token) return;
    setUploadStatus("uploading");
    const formData = new FormData();
    formData.append("content", post.content);
    if (mediaFile) formData.append("media", mediaFile);
    formData.append("mediaType", post.media[0].type);
    try {
      const newPost = await createPost(formData, auth.token);
      setPosts((prev: any) => [newPost, ...prev]);
      setUploadStatus("success");
    } catch (e) {
      console.log("error uploading post", e);
      setUploadStatus("error");
    }
    setPost({ content: "", media: [{ url: "", type: "" }] });
    setMediaFile(null);
    if (document.getElementById("media-file")) {
      (document.getElementById("media-file") as HTMLInputElement).value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          value={post.content}
          onChange={handleChange}
        />
        <select
          name="media-type"
          id="media-type"
          value={post.media[0].type}
          onChange={(e) => handleChange(e)}
        >
          <option value="">Select-Media-Type</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        {post.media[0].type && (
          <input
            id="media-file"
            type="file"
            onChange={handleFileChange}
            accept={post.media[0].type === "image" ? "image/*" : "video/*"}
          />
        )}

        <button
          disabled={!post.content.trim()}
          type="submit"
          className="bg-green-600 p-3 rounded-md cursor-pointer"
        >
          Post
        </button>
      </form>
      {post.media[0].url && post.media[0].type === "image" && (
        <img
          src={post.media[0].url}
          alt="PreviewImg"
          className="w-[50px] h-[50px]"
        />
      )}
      {post.media[0].url && post.media[0].type === "video" && (
        <video src={post.media[0].url} controls className="w-[50px] h-[50px]" />
      )}
      {UploadStatus === "error" && <div>Select Media type first</div>}
    </>
  );
}

export default PostForm;

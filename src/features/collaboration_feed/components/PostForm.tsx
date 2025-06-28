/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { authAtom } from "../../../jotai/auth"
import { feedAtom } from "../../../jotai/feedAtom"
import { createPost } from "../api/post"
import type { PostReq } from "../types/post_types"
import { Send, ImageIcon, Video, Upload, X, CheckCircle2, AlertCircle, Loader2, Sparkles, FileText } from "lucide-react"

type UploadStatus = "uploading" | "success" | "idle" | "error"

export const EnhancedPostForm: React.FC = () => {
  const [post, setPost] = useState<PostReq>({
    content: "",
    media: [{ url: "", type: "" }],
  })
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [auth] = useAtom(authAtom)
  const [, setPosts] = useAtom(feedAtom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "media-type") {
      setPost({ ...post, media: [{ url: "", type: value }] })
      setMediaFile(null)
      setUploadStatus("idle")
      const fileInput = document.getElementById("media-file") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } else {
      setPost({ ...post, [name]: value })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (post.media[0].type === "") {
      setError("Please select a media type first")
      setUploadStatus("error")
      return
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMediaFile(file)
      setPost({
        ...post,
        media: [{ ...post.media[0], url: URL.createObjectURL(file) }],
      })
      setUploadStatus("idle")
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!auth.token || !auth.user?._id) {
      setError("Please log in to create a post")
      return
    }

    if (!post.content.trim()) {
      setError("Content cannot be empty")
      return
    }

    setUploadStatus("uploading")
    setError(null)

    const formData = new FormData()
    formData.append("content", post.content)

    if (mediaFile) {
      formData.append("media", mediaFile)
      formData.append("mediaType", post.media[0].type)
    }

    try {
      const newPost = await createPost(formData, auth.token)
      setPosts((prev) => [newPost, ...prev])
      setUploadStatus("success")
      setPost({ content: "", media: [{ url: "", type: "" }] })
      setMediaFile(null)
      const fileInput = document.getElementById("media-file") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      // Reset success state after 3 seconds
      setTimeout(() => setUploadStatus("idle"), 3000)
    } catch (e: any) {
      console.error("Error creating post:", e.response?.data || e.message)
      setUploadStatus("error")
      setError(e.response?.data?.message || "Failed to create post")
    }
  }

  const clearMedia = () => {
    setPost({ ...post, media: [{ url: "", type: "" }] })
    setMediaFile(null)
    const fileInput = document.getElementById("media-file") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Share Your Ideas</h3>
            <p className="text-slate-400 text-sm">What's on your mind?</p>
          </div>
        </div>
      </div>

      {/* Content Input */}
      <div className="mb-6">
        <div className="relative">
          <textarea
            name="content"
            id="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Share your thoughts, ideas, or ask questions..."
            className="w-full h-32 p-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
            aria-label="Post content"
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">{post.content.length}/500</span>
          </div>
        </div>
      </div>

      {/* Media Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">Add Media (Optional)</label>
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            type="button"
            onClick={() => setPost({ ...post, media: [{ url: "", type: "" }] })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              post.media[0].type === ""
                ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                : "border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-500"
            }`}
          >
            <FileText className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Text Only</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setPost({ ...post, media: [{ url: "", type: "image" }] })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              post.media[0].type === "image"
                ? "border-purple-400 bg-purple-500/10 text-purple-400"
                : "border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-500"
            }`}
          >
            <ImageIcon className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Image</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setPost({ ...post, media: [{ url: "", type: "video" }] })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              post.media[0].type === "video"
                ? "border-pink-400 bg-pink-500/10 text-pink-400"
                : "border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-500"
            }`}
          >
            <Video className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Video</span>
          </motion.button>
        </div>
      </div>

      {/* File Upload */}
      <AnimatePresence>
        {post.media[0].type && post.media[0].type !== "" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="relative">
              <input
                type="file"
                id="media-file"
                name="media-file"
                accept={post.media[0].type === "image" ? "image/*" : "video/*"}
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload media file"
              />
              <label
                htmlFor="media-file"
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-slate-600 rounded-xl hover:border-cyan-400 transition-colors cursor-pointer bg-slate-800/30"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-300 font-medium">
                    Click to upload {post.media[0].type === "image" ? "an image" : "a video"}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    {post.media[0].type === "image" ? "PNG, JPG, GIF up to 10MB" : "MP4, MOV up to 50MB"}
                  </p>
                </div>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Preview */}
      <AnimatePresence>
        {post.media[0].url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-6 relative"
          >
            <div className="relative rounded-xl overflow-hidden bg-slate-800/50 border border-slate-600">
              {post.media[0].type === "image" && (
                <img
                  src={post.media[0].url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full max-h-64 object-cover"
                />
              )}
              {post.media[0].type === "video" && <video src={post.media[0].url} controls className="w-full max-h-64" />}
              <motion.button
                type="button"
                onClick={clearMedia}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
            <span className="text-red-400 font-medium">{error}</span>
          </motion.div>
        )}

        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
            <span className="text-green-400 font-medium">Post created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!post.content.trim() || uploadStatus === "uploading"}
        whileHover={{ scale: uploadStatus === "uploading" ? 1 : 1.02 }}
        whileTap={{ scale: uploadStatus === "uploading" ? 1 : 0.98 }}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
          uploadStatus === "uploading"
            ? "bg-slate-600 cursor-not-allowed"
            : post.content.trim()
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25"
              : "bg-slate-600 cursor-not-allowed"
        }`}
        aria-label="Submit new post"
      >
        {uploadStatus === "uploading" ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Loader2 className="w-5 h-5" />
            </motion.div>
            <span>Posting...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Share Post</span>
          </>
        )}
      </motion.button>
    </motion.form>
  )
}

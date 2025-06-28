/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import type { Post } from "../types/post_types"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useAtom } from "jotai"
import { authAtom } from "../../../jotai/auth"
import { feedAtom } from "../../../jotai/feedAtom"
import { deletePost, editPost, likePost, unlikePost } from "../api/post"
import { Heart, MessageCircle, Edit3, Trash2, Save, X, MoreHorizontal, Calendar, User, AlertCircle } from "lucide-react"

export const EnhancedPostCard: React.FC<Post> = ({ _id, userId, content, media, likes, createdAt }) => {
  const [auth] = useAtom(authAtom)
  const [, setPosts] = useAtom(feedAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const userName = userId?.name || "Unknown User"
  const userAvatar = userId?.avatar || "/placeholder.svg?height=40&width=40"
  const authUserId = auth.user?._id || auth.user?._id

  const isCreator = auth.isAuthenticated && authUserId && userId?._id && authUserId === userId._id
  const hasLiked = auth.isAuthenticated && authUserId && likes.some((id) => id.toString() === authUserId)

  const handleDelete = async () => {
    if (!auth.token || !auth.user?._id) {
      setError("Please log in to delete this post")
      return
    }

    try {
      await deletePost(_id, auth.token)
      setPosts((prev) => prev.filter((post) => post._id !== _id))
      setShowDeleteConfirm(false)
      setError(null)
    } catch (e: any) {
      console.error("Delete post error:", e.response?.data || e.message)
      setError(e.response?.data?.message || "Failed to delete post")
    }
  }

  const handleEdit = async () => {
    if (!auth.token || !auth.user?._id) {
      setError("Please log in to edit this post")
      return
    }

    if (!editContent.trim()) {
      setError("Content cannot be empty")
      return
    }

    try {
      const updatedPost = await editPost(_id, editContent, auth.token)

      if (!updatedPost?._id || !updatedPost?.userId?._id) {
        console.error("Invalid updated post:", updatedPost)
        setError("Invalid post data returned")
        return
      }

      setPosts((prev) =>
        prev.map((post) =>
          post._id === _id
            ? {
                ...post,
                content: updatedPost.content,
                updatedAt: updatedPost.updatedAt || post.updatedAt,
                userId: updatedPost.userId || post.userId,
                media: updatedPost.media || post.media,
                likes: updatedPost.likes || post.likes,
              }
            : post,
        ),
      )

      setIsEditing(false)
      setError(null)
    } catch (e: any) {
      console.error("Edit post error:", e.message)
      setError(e.message || "Failed to edit post")
    }
  }

  const handleLikeToggle = async () => {
    if (!auth.token || !auth.user?._id) {
      setError("Please log in to like/unlike this post")
      return
    }

    setIsLiking(true)
    try {
      const updatedPost = hasLiked ? await unlikePost(_id, auth.token) : await likePost(_id, auth.token)

      setPosts((prev) => prev.map((post) => (post._id === _id ? updatedPost : post)))
      setError(null)
    } catch (e: any) {
      console.error("Like toggle error:", e.response?.data || e.message)
      setError(e.response?.data?.message || `Failed to ${hasLiked ? "unlike" : "like"} post`)
    } finally {
      setIsLiking(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
              <img
                src={userAvatar || "/placeholder.svg"}
                alt={`${userName}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <div className="ml-4">
            <h4 className="font-semibold text-white flex items-center">
              <User className="w-4 h-4 mr-2 text-cyan-400" />
              {userName}
            </h4>
            <p className="text-slate-400 text-sm flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(createdAt)}
            </p>
          </div>
        </div>

        {isCreator && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              <MoreHorizontal className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 top-12 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-10 min-w-[120px]"
                >
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-colors flex items-center rounded-t-xl"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-3 text-left text-slate-300 hover:text-red-400 hover:bg-slate-700/50 transition-colors flex items-center rounded-b-xl"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-32 p-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
            aria-label="Edit post content"
          />
          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsEditing(false)
                setEditContent(content)
                setError(null)
              }}
              className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="mb-6">
          <p className="text-slate-200 leading-relaxed text-lg">{content}</p>
        </div>
      )}

      {/* Media */}
      {media.length > 0 && media[0].url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 rounded-xl overflow-hidden bg-slate-800/30 border border-slate-700/30"
        >
          {media[0].type === "image" && (
            <img
              src={`${import.meta.env.VITE_STATIC_URL}${media[0].url}`}
              alt="Post media"
              className="w-full max-h-96 object-cover"
              onError={(e) => console.error("Image load error:", e)}
            />
          )}
          {media[0].type === "video" && (
            <video
              src={`${import.meta.env.VITE_STATIC_URL}${media[0].url}`}
              controls
              className="w-full max-h-96"
              onError={(e) => console.error("Video load error:", e)}
            />
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-6">
          {auth.isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLikeToggle}
              disabled={isLiking}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                hasLiked
                  ? "text-red-400 bg-red-500/10 hover:bg-red-500/20"
                  : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
              }`}
            >
              <motion.div animate={isLiking ? { scale: [1, 1.2, 1] } : {}}>
                <Heart className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`} />
              </motion.div>
              <span>{likes.length}</span>
            </motion.button>
          )}

          <div className="flex items-center space-x-2 text-slate-400">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comments</span>
          </div>
        </div>

        <div className="text-slate-400 text-sm">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-6 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <h4 className="text-red-400 font-semibold">Delete Post</h4>
            </div>
            <p className="text-slate-300 mb-4">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(false)}
                className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-all duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
            <span className="text-red-400 font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

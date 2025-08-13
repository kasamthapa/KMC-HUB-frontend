/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, } from "react"
import { useAtom } from "jotai"
import { authAtom } from "../../../jotai/auth"
import { feedAtom } from "../../../jotai/feedAtom"
import { deletePost, editPost, likePost, unlikePost } from "../api/post"
import CommentSystem from "./CommentSystem" // Import the new comment system
import {
  Heart,
  MessageCircle,
  Edit3,
  Trash2,
  Save,
  X,
  MoreHorizontal,
  Calendar,
  User,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import dProfile from "../../../assets/dProfile.png";

export interface Comment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  text: string; // Changed from content to text to match your CommentSystem
  createdAt: string;
}

export interface Post {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  media: { url: string; type: "image" | "video" }[];
  likes: string[];
  createdAt: string;
  updatedAt?: string;
}

export const EnhancedPostCard: React.FC<Post> = ({
  _id,
  userId,
  content,
  media,
  likes,
  createdAt
}) => {
  const [auth] = useAtom(authAtom)
  const [, setPosts] = useAtom(feedAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [previewComments, setPreviewComments] = useState<Comment[]>([])
  const [showAllComments, setShowAllComments] = useState(false)

  const userName = userId?.name || "Unknown User"
  const userAvatar = userId?.avatar
    ? `${import.meta.env.VITE_STATIC_URL}${userId.avatar}`
    : dProfile;
  const authUserId = auth.user?._id

  const isCreator =
    auth.isAuthenticated &&
    authUserId &&
    userId?._id &&
    authUserId === userId._id

  const hasLiked =
    auth.isAuthenticated &&
    authUserId &&
    likes.some((id) => id.toString() === authUserId)

  // Update comment count when comments change
  const handleCommentCountChange = (count: number) => {
    setCommentCount(count)
  }

  const handleCommentsUpdate = (newComments: Comment[]) => {
    setPreviewComments(newComments)
  }

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
      setPosts((prev) =>
        prev.map((post) =>
          post._id === _id
            ? {
                ...post,
                content: updatedPost.content,
                updatedAt: updatedPost.updatedAt || post.updatedAt,
                userId: updatedPost.userId || post.userId,
                media: updatedPost.media || post.media,
                likes: updatedPost.likes || post.likes
              }
            : post
        )
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
      const updatedPost = hasLiked
        ? await unlikePost(_id, auth.token)
        : await likePost(_id, auth.token)
      setPosts((prev) => prev.map((post) => (post._id === _id ? updatedPost : post)))
      setError(null)
    } catch (e: any) {
      console.error("Like toggle error:", e.response?.data || e.message)
      setError(
        e.response?.data?.message ||
          `Failed to ${hasLiked ? "unlike" : "like"} post`
      )
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

  // Show first 2 comments as preview
  const visiblePreviewComments = previewComments.slice(0, 2)
  const hasMoreComments = previewComments.length > 2

  const CommentPreviewItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    const commentUserAvatar = comment.userId?.avatar
      ? `${import.meta.env.VITE_STATIC_URL}${comment.userId.avatar}`
      : dProfile;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex space-x-3 py-2"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-kmcBlue to-green-600 p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
            <img
              src={commentUserAvatar}
              alt={`Avatar of ${comment.userId?.name || 'Unknown User'}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = dProfile
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
            <p className="font-semibold text-sm text-kmcBlue dark:text-white">
              {comment.userId?.name || 'Unknown User'}
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
              {comment.text}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3">
            {formatDate(comment.createdAt)}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 shadow-md font-roboto w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gradient-to-r from-kmcBlue to-green-600 p-0.5"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
              <img
                src={userAvatar}
                alt={`Avatar of ${userName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = dProfile
                  console.error("Avatar load error for user:", userName)
                }}
              />
            </div>
          </motion.div>
          <div className="ml-3">
            <h4 className="font-semibold text-kmcBlue dark:text-white flex items-center">
              <User className="w-4 h-4 mr-2 text-green-600" />
              {userName}
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center font-roboto">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(createdAt)}
            </p>
          </div>
        </div>

        {isCreator && (
          <div className="relative self-start sm:self-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-kmcBlue dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <MoreHorizontal className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 top-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]"
                >
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center rounded-t-lg"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true)
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center rounded-b-lg"
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
          className="mb-4"
        >
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-24 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 resize-none"
          />
          <div className="flex flex-wrap gap-3 mt-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-roboto break-words">
            {content}
          </p>
        </div>
      )}

      {/* Media */}
      {media.length > 0 && media[0].url && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        >
          {media[0].type === "image" && (
            <img
              src={`${import.meta.env.VITE_STATIC_URL}${media[0].url}`}
              alt="Post media"
              className="w-full max-h-[60vh] object-cover"
            />
          )}
          {media[0].type === "video" && (
            <video
              src={`${import.meta.env.VITE_STATIC_URL}${media[0].url}`}
              controls
              className="w-full max-h-[60vh]"
            />
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-300 dark:border-gray-600">
        <div className="flex items-center space-x-6">
          {auth.isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLikeToggle}
              disabled={isLiking}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                hasLiked
                  ? "text-red-600 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
              }`}
            >
              <motion.div animate={isLiking ? { scale: [1, 1.2, 1] } : {}}>
                <Heart className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`} />
              </motion.div>
              <span>{likes.length}</span>
            </motion.button>
          )}
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{commentCount} Comments</span>
          </div>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>
      </div>

      {/* Comment Preview Section */}
      {visiblePreviewComments.length > 0 && !showAllComments && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="space-y-2">
            <AnimatePresence>
              {visiblePreviewComments.map((comment) => (
                <CommentPreviewItem key={comment._id} comment={comment} />
              ))}
            </AnimatePresence>
          </div>
          
          {(hasMoreComments || commentCount > visiblePreviewComments.length) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAllComments(true)}
              className="flex items-center justify-center w-full mt-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-kmcBlue dark:hover:text-white transition-colors duration-200"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              View all {commentCount} comments
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Full Comment System */}
      {showAllComments ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="relative"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAllComments(false)}
            className="flex items-center justify-center w-full mt-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-kmcBlue dark:hover:text-white transition-colors duration-200 border-t border-gray-200 dark:border-gray-700"
          >
            <ChevronUp className="w-4 h-4 mr-1" />
            Show less
          </motion.button>
          <CommentSystem 
            postId={_id} 
            onCommentCountChange={handleCommentCountChange}
            onCommentsUpdate={handleCommentsUpdate}
          />
        </motion.div>
      ) : (
        <CommentSystem 
          postId={_id} 
          onCommentCountChange={handleCommentCountChange}
          onCommentsUpdate={handleCommentsUpdate}
        />
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
          >
            <div className="flex items-center mb-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <h4 className="text-red-600 dark:text-red-400 font-semibold">Delete Post</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(false)}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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
            className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
            <span className="text-red-600 dark:text-red-400 font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
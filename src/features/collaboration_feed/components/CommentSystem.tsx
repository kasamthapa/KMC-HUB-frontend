/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { authAtom } from '../../../jotai/auth';
import {
  MessageCircle,
  Send,
  Edit3,
  Trash2,
  Save,
  X,
  User,
  Calendar,
  MoreHorizontal,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import dProfile from '../../../assets/dProfile.png';
import axios from 'axios';

interface Comment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  createdAt: string;
}

interface CommentSystemProps {
  postId: string;
  onCommentCountChange?: (count: number) => void;
  onCommentsUpdate?: (comments: Comment[]) => void;
}

// Fixed API functions with correct parameter names
const addComment = async (postId: string, text: string, token: string) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
  });
  
  const res = await api.post(
    `/posts/${postId}/comment`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const getComments = async (postId: string, token?: string) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
  });
  
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await api.get(`/posts/${postId}/comments`, { headers });
  return res.data;
};

const updateComment = async (postId: string, commentId: string, text: string, token: string) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
  });
  
  const res = await api.put(
    `/posts/${postId}/comments/${commentId}`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const deleteComment = async (postId: string, commentId: string, token: string) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
  });
  
  const res = await api.delete(
    `/posts/${postId}/comments/${commentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const CommentSystem: React.FC<CommentSystemProps> = ({ postId, onCommentCountChange, onCommentsUpdate }) => {
  const [auth] = useAtom(authAtom);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Use useCallback to memoize fetchComments and prevent dependency issues
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedComments = await getComments(postId, auth.token || undefined);
      setComments(fetchedComments);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [postId, auth.token]);

  // Fetch comments on initial load (not just when showComments is true)
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Fetch comments when showing comments section
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, fetchComments]);

  // Update comment count when comments change
  useEffect(() => {
    onCommentCountChange?.(comments.length);
  }, [comments.length, onCommentCountChange]);

  // Update parent component with comments data
  useEffect(() => {
    onCommentsUpdate?.(comments);
  }, [comments, onCommentsUpdate]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.token || !auth.user?._id || !newComment.trim()) {
      setError('Please log in and enter a comment');
      return;
    }

    setSubmitting(true);
    try {
      await addComment(postId, newComment.trim(), auth.token);
      setNewComment('');
      await fetchComments();
      setError(null);
    } catch (err: any) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!auth.token || !editText.trim()) {
      setError('Please enter a comment');
      return;
    }

    try {
      await updateComment(postId, commentId, editText.trim(), auth.token);
      setEditingId(null);
      setEditText('');
      await fetchComments();
      setError(null);
    } catch (err: any) {
      console.error('Error updating comment:', err);
      setError('Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!auth.token) {
      setError('Please log in to delete comments');
      return;
    }

    try {
      await deleteComment(postId, commentId, auth.token);
      await fetchComments();
      setDeleteConfirmId(null);
      setError(null);
    } catch (err: any) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const canEditOrDelete = (comment: Comment) => {
    return auth.isAuthenticated && auth.user?._id === comment.userId._id;
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
      {/* Comment Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowComments(!showComments)}
        className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-kmcBlue dark:hover:text-white mb-4"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
        {showComments ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </motion.button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Add Comment Form */}
            {auth.isAuthenticated && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleAddComment}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-kmcBlue to-green-600 p-0.5 flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
                      <img
                        src={auth.user?.avatar ? `${import.meta.env.VITE_STATIC_URL}${auth.user.avatar}` : dProfile}
                        alt="Your avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 resize-none"
                      rows={3}
                      maxLength={300}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{newComment.length}/300</span>
                      <motion.button
                        type="submit"
                        disabled={!newComment.trim() || submitting}
                        whileHover={{ scale: submitting ? 1 : 1.05 }}
                        whileTap={{ scale: submitting ? 1 : 0.95 }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          newComment.trim() && !submitting
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {submitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                            >
                              <Loader2 className="w-4 h-4" />
                            </motion.div>
                            <span>Posting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Comment</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.form>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-center"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                  >
                    <Loader2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Comments List */}
            <AnimatePresence mode="popLayout">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-kmcBlue to-green-600 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
                          <img
                            src={
                              comment.userId.avatar
                                ? `${import.meta.env.VITE_STATIC_URL}${comment.userId.avatar}`
                                : dProfile
                            }
                            alt={`${comment.userId.name}'s avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-kmcBlue dark:text-white flex items-center text-sm">
                          <User className="w-3 h-3 mr-1 text-green-600" />
                          {comment.userId.name}
                        </h5>
                        <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>

                    {canEditOrDelete(comment) && (
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowMenuId(showMenuId === comment._id ? null : comment._id)}
                          className="p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </motion.button>

                        <AnimatePresence>
                          {showMenuId === comment._id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -10 }}
                              className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[100px]"
                            >
                              <button
                                onClick={() => {
                                  setEditingId(comment._id);
                                  setEditText(comment.text);
                                  setShowMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center rounded-t-lg text-sm"
                              >
                                <Edit3 className="w-3 h-3 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirmId(comment._id);
                                  setShowMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center rounded-b-lg text-sm"
                              >
                                <Trash2 className="w-3 h-3 mr-2" />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Comment Content */}
                  {editingId === comment._id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2"
                    >
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 resize-none"
                        rows={3}
                        maxLength={300}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{editText.length}/300</span>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUpdateComment(comment._id)}
                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                          >
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setEditingId(null);
                              setEditText('');
                            }}
                            className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed mt-2 break-words">
                      {comment.text}
                    </p>
                  )}

                  {/* Delete Confirmation */}
                  <AnimatePresence>
                    {deleteConfirmId === comment._id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                      >
                        <div className="flex items-center mb-2">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
                          <span className="text-red-600 dark:text-red-400 font-medium text-sm">Delete Comment</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                          Are you sure you want to delete this comment?
                        </p>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteComment(comment._id)}
                            className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDeleteConfirmId(null)}
                            className="flex items-center px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* No Comments State */}
            {!loading && comments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">Be the first to share your thoughts!</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentSystem;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useAtom } from "jotai"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { authAtomWithStorage } from "../../../jotai/auth"
import { feedAtom } from "../../../jotai/feedAtom"
import { getPost } from "../api/post"
import { getCurrentUser } from "../../auth/api/auth"
import { EnhancedPostCard } from "../components/PostCard"
import { EnhancedPostForm } from "../components/PostForm"
import { CollaborationSidebar } from "../components/collaboration-sidebar"
import { InteractiveStars } from "../../home/components/interactive-stars"
import { AnimatedCursor } from "../../home/components/animated-cursor"
import { Loader2, AlertCircle, MessageCircle, Sparkles, Menu } from "lucide-react"
import { Header } from "../../../shared/Header"

const EnhancedCollaborationFeedWithSidebar: React.FC = () => {
  const [auth, setAuth] = useAtom(authAtomWithStorage)
  const [posts, setPosts] = useAtom(feedAtom)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // On desktop, sidebar is always visible. On mobile, it starts closed.
      if (!mobile) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    async function fetchUser() {
      if (auth.token && !auth.user) {
        try {
          console.log("Fetching user on load with token:", auth.token)
          const user = await getCurrentUser(auth.token)
          setAuth({ ...auth, user, isAuthenticated: true })
        } catch (e: any) {
          console.error("Failed to fetch user on load:", e.response?.data || e.message)
          setAuth({ user: null, token: null, isAuthenticated: false })
          setError("Session expired. Please log in again.")
        }
      }
    }
    fetchUser()
  }, [auth, setAuth])

  useEffect(() => {
    async function fetchPosts() {
      if (!auth.isAuthenticated || !auth.token) {
        setError("Please log in to view posts.")
        return
      }

      setLoading(true)
      try {
        const posts = await getPost(auth.token)
        setPosts(posts)
        setError(null)
      } catch (e: any) {
        setError(e.response?.data?.message || "Failed to fetch posts")
        console.error("Error fetching posts:", e.response?.data || e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [auth.isAuthenticated, auth.token, setPosts])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      <Header/>
      <InteractiveStars />
      <AnimatedCursor />

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Sidebar */}
      <CollaborationSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(true)}
          className="fixed top-24 left-4 z-40 p-3 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all duration-300 shadow-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      )}

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-300 ${!isMobile ? "ml-80" : ""} pt-24`}>
        {/* Feed Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-300 font-medium text-sm uppercase tracking-wider">Collaboration Feed</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Share & Collaborate
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Connect with your academic community, share ideas, and collaborate on projects that matter.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Post Form */}
            <motion.div variants={itemVariants}>
              {auth.isAuthenticated ? (
                <EnhancedPostForm />
              ) : (
                <motion.div
                  className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                >
                  <MessageCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Join the Conversation</h3>
                  <p className="text-slate-400">Please log in to create posts and engage with the community.</p>
                </motion.div>
              )}
            </motion.div>

            {/* Loading State */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center py-12"
                >
                  <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                    <span className="text-slate-300 font-medium">Loading posts...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error State */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-2xl p-6 flex items-center"
                >
                  <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-red-400 font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Posts */}
            <AnimatePresence mode="popLayout">
              {posts.length > 0
                ? posts.map((post, index) => (
                    <motion.div
                      key={post._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    >
                      <EnhancedPostCard
                        _id={post._id}
                        userId={post.userId}
                        content={post.content}
                        media={post.media}
                        updatedAt={post.updatedAt}
                        createdAt={post.createdAt}
                        likes={post.likes}
                      />
                    </motion.div>
                  ))
                : !loading &&
                  !error && (
                    <motion.div
                      variants={itemVariants}
                      className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-12 text-center"
                    >
                      <Sparkles className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-semibold text-white mb-4">No Posts Yet</h3>
                      <p className="text-slate-400 text-lg">
                        Be the first to share something amazing with the community!
                      </p>
                    </motion.div>
                  )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedCollaborationFeedWithSidebar

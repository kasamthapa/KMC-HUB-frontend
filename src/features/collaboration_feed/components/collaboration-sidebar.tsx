import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "../../../jotai/auth";
import {
  Home,
  Users,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Hash,
  Bell,
  Settings,
  Search,
  Plus,
  Calendar,
  Award,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollaborationSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const [auth] = useAtom(authAtom);
  const [activeSection, setActiveSection] = useState("feed");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const navigationItems = [
    { id: "feed", label: "Feed", icon: Home, count: null },
    { id: "groups", label: "Study Groups", icon: Users, count: 3 },
    { id: "resources", label: "Resources", icon: BookOpen, count: null },
    { id: "messages", label: "Messages", icon: MessageCircle, count: 5 },
    { id: "notifications", label: "Notifications", icon: Bell, count: 12 },
  ];

  const trendingTopics = [
    { tag: "DataStructures", posts: 24, trending: true },
    { tag: "MachineLearning", posts: 18, trending: true },
    { tag: "WebDevelopment", posts: 15, trending: false },
    { tag: "Algorithms", posts: 12, trending: true },
    { tag: "DatabaseDesign", posts: 8, trending: false },
  ];

  const quickActions = [
    { label: "Create Post", icon: Plus, color: "from-cyan-500 to-blue-600" },
    { label: "Join Group", icon: Users, color: "from-purple-500 to-pink-600" },
    {
      label: "Upload Resource",
      icon: BookOpen,
      color: "from-green-500 to-emerald-600",
    },
  ];

  const recentActivity = [
    {
      user: "Alice Johnson",
      action: "liked your post",
      time: "2m ago",
      avatar: "/placeholder.svg",
    },
    {
      user: "Bob Smith",
      action: "commented on your post",
      time: "5m ago",
      avatar: "/placeholder.svg",
    },
    {
      user: "Carol Davis",
      action: "shared your resource",
      time: "10m ago",
      avatar: "/placeholder.svg",
    },
  ];

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  // On desktop, always show. On mobile, show only when isOpen is true
  const shouldShow = !isMobile || isOpen;

  return (
    <>
      {/* Backdrop - only on mobile */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={isMobile ? sidebarVariants : {}}
        initial={isMobile ? "closed" : "open"}
        animate={shouldShow ? "open" : "closed"}
        className={`fixed left-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 shadow-2xl z-50 overflow-y-auto ${
          isMobile ? "" : "lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-800/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  />
                  <Sparkles className="absolute inset-0 w-10 h-10 text-white p-2" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">KMC Hub</h2>
                  <p className="text-slate-400 text-sm">Collaboration Feed</p>
                </div>
              </div>
              {/* Close button - only show on mobile */}
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* User Profile */}
            {auth.isAuthenticated && auth.user && (
              <motion.div
                variants={itemVariants}
                className="flex items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/30"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    <img
                      src={auth.user.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold text-white">{auth.user.name}</h3>
                  <p className="text-slate-400 text-sm">{auth.user.role}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <div className="space-y-2 mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full">
                      {item.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: (index + 5) * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r ${action.color} text-white font-medium hover:shadow-lg transition-all duration-300`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Trending Topics
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.tag}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: (index + 8) * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Hash className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300 font-medium">
                        {topic.tag}
                      </span>
                      {topic.trending && (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <span className="text-slate-400 text-sm">
                      {topic.posts}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: (index + 13) * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                        <img
                          src={activity.avatar || "/placeholder.svg"}
                          alt={activity.user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-slate-400 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                >
                  <Award className="w-5 h-5" />
                </motion.button>
              </div>
              {auth.isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

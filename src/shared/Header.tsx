

import type React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { authAtom, authAtomWithStorage } from "../jotai/auth";
import { useAtomValue, useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Zap,
  BookOpen,
  MessageSquare,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react";
import Logo from "../assets/Logo.png";

export const Header: React.FC = () => {
  const auth = useAtomValue(authAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setAuth] = useAtom(authAtomWithStorage);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    setAuth({ user: null, token: null });
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", to: "/", icon: Home },
    { name: "Features", to: "features", icon: Zap, isScroll: true },
    { name: "Resources", to: "/resources", icon: BookOpen },
    { name: "Feed", to: "/feed", icon: MessageSquare },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
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
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <motion.img
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  src={Logo}
                  alt="KMC Hub Logo"
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                KMC Hub
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.isScroll ? (
                  <ScrollLink
                    to={item.to}
                    smooth={true}
                    duration={800}
                    offset={-80}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-all duration-300 cursor-pointer hover:bg-slate-800/50"
                  >
                    <item.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                    <span className="font-medium">{item.name}</span>
                  </ScrollLink>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-cyan-400 bg-cyan-500/10"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {auth.token ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-red-500/25"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Login</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Join</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800/50 shadow-2xl z-50"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      />
                      <Sparkles className="absolute inset-0 w-8 h-8 text-white p-1.5" />
                    </div>
                    <span className="text-lg font-bold text-white">
                      KMC Hub
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.isScroll ? (
                          <ScrollLink
                            to={item.to}
                            smooth={true}
                            duration={800}
                            offset={-80}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </ScrollLink>
                        ) : (
                          <NavLink
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? "text-cyan-400 bg-cyan-500/10"
                                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                              }`
                            }
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </NavLink>
                        )}
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Auth Section */}
                <div className="p-6 border-t border-slate-800/50">
                  {auth.token ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={logout}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-red-500/25"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  ) : (
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-slate-600 text-white rounded-lg font-medium hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Login</span>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Join Now</span>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

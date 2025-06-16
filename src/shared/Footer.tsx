/* eslint-disable @typescript-eslint/no-unused-vars */


import type React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"
import { motion } from "framer-motion"
import { useState } from "react"
import Logo from "../assets/Logo.png"
import { AnimatedCursor } from "../features/home/components/animated-cursor"
import { InteractiveStars } from "../features/home/components/interactive-stars"
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Heart,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
  BookOpen,
  MessageCircle,
} from "lucide-react"

const EnhancedFooter: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const handleSocialClick = (platform: string) => {
    console.log(`Clicked ${platform}`)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
      transition: { duration: 0.6, ease: "easeOut" as const},
    },
  }

  const socialIcons = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "text-blue-400",
      hoverColor: "hover:text-blue-300",
      bgGradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: Twitter,
      name: "Twitter",
      color: "text-sky-400",
      hoverColor: "hover:text-sky-300",
      bgGradient: "from-sky-500/20 to-sky-600/20",
    },
    {
      icon: Facebook,
      name: "Facebook",
      color: "text-blue-500",
      hoverColor: "hover:text-blue-400",
      bgGradient: "from-blue-600/20 to-blue-700/20",
    },
    {
      icon: Instagram,
      name: "Instagram",
      color: "text-pink-400",
      hoverColor: "hover:text-pink-300",
      bgGradient: "from-pink-500/20 to-purple-500/20",
    },
  ]

  const quickLinks = [
    { name: "Features", to: "features", isScroll: true, icon: Sparkles },
    { name: "Join", to: "/signup", isScroll: false, icon: Users },
    { name: "Login", to: "/login", isScroll: false, icon: BookOpen },
    { name: "Contact", to: "/contact", isScroll: false, icon: MessageCircle },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      <InteractiveStars/>
      <AnimatedCursor/>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
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

      {/* Main footer content */}
      <div className="relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-20 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          >
            {/* About Us */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="relative mr-4">
                  <img src={Logo || "/placeholder.svg"} alt="KMC Hub logo" className="w-12 h-12 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg" />
                </motion.div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  KMC Hub
                </h2>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                KMC Hub empowers students and faculty to collaborate, share resources, and communicate seamlessly. Join
                our vibrant academic community and transform your learning experience.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  <span className="text-sm">contact@kmchub.edu</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  <span className="text-sm">Kathmandu, Nepal</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.nav variants={itemVariants} aria-label="Quick links">
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, _index) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    {link.isScroll ? (
                      <ScrollLink
                        to={link.to}
                        smooth={true}
                        duration={800}
                        offset={-80}
                        className="group flex items-center text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        <link.icon className="w-4 h-4 mr-3 group-hover:text-cyan-400 transition-colors" />
                        {link.name}
                      </ScrollLink>
                    ) : (
                      <RouterLink
                        to={link.to}
                        className="group flex items-center text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        <link.icon className="w-4 h-4 mr-3 group-hover:text-cyan-400 transition-colors" />
                        {link.name}
                      </RouterLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Social Media */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialIcons.map((social, _index) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name)}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-4 bg-gradient-to-br ${social.bgGradient} backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all duration-300`}
                  >
                    <social.icon className={`w-6 h-6 ${social.color} ${social.hoverColor} transition-colors mx-auto`} />
                    <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-2 block">
                      {social.name}
                    </span>

                    {/* Hover effect */}
                    {hoveredSocial === social.name && (
                      <motion.div
                        layoutId="socialHover"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Newsletter signup */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Stay Updated
              </h3>
              <p className="text-slate-300 mb-6">
                Get the latest updates about new features, events, and academic resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800/50"
          >
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-slate-400 mr-2">Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span className="text-slate-400 ml-2">by</span>
              <span className="text-cyan-400 font-semibold ml-1">Kasam Thapa Magar</span>
            </div>

            <div className="flex items-center space-x-6">
              <p className="text-slate-400 text-sm">© 2025 KMC Hub. All rights reserved.</p>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-slate-700/50 rounded-full hover:border-cyan-400/50 transition-all duration-300 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default EnhancedFooter

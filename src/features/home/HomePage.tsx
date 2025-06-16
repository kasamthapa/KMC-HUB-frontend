import type React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Element } from "react-scroll";
import { Header } from "../../shared/Header";
import Footer from "../../shared/Footer";
import GroupChat from "../../assets/GroupChat.png";
import Collaboration from "../../assets/Collaboration.png";
import Library from "../../assets/library.png";
import Feed from "../../assets/feed.jpg";
import Mission from "../../assets/Mission.png";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { InteractiveStars } from "./components/interactive-stars";
import { AnimatedCursor } from "./components/animated-cursor";
import {
  ChevronDown,
  Sparkles,
  Users,
  BookOpen,
  MessageCircle,
  Target,
  ArrowRight,
} from "lucide-react";

const Home: React.FC = () => {
  const featuresRef = useRef(null);
  const collaborationRef = useRef(null);
  const joinTodayRef = useRef(null);
  const missionRef = useRef(null);

  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const collaborationInView = useInView(collaborationRef, {
    once: true,
    margin: "-100px",
  });
  const joinTodayInView = useInView(joinTodayRef, {
    once: true,
    margin: "-100px",
  });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    document.body.style.cursor = "none";
    const handleMouseMove = () => {};
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const easingFn = [0.25, 0.1, 0.25, 1] as const;

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easingFn },
    },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easingFn },
    },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easingFn },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easingFn },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easingFn,
    },
  };

  return (
    <>
      <AnimatedCursor />
      <div className="relative z-10 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] min-h-screen">
        <Header />
        <InteractiveStars />
        <main className="relative overflow-hidden">
          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Main Hero Content */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-16 pb-20">
              <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mb-6"
                >
                  <motion.div
                    animate={floatingAnimation}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full mb-6"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
                    <span className="text-cyan-300 font-medium text-sm">
                      Welcome to the Future of Academic Collaboration
                    </span>
                  </motion.div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6"
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                    Empower Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    Academic Journey
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  className="text-lg sm:text-xl leading-relaxed mb-8 max-w-4xl mx-auto text-slate-300"
                >
                  KMC Hub connects students and faculty in a revolutionary
                  platform that enables seamless communication, collaboration,
                  and resource sharing. Join thousands of learners building the
                  future together.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RouterLink
                      to="/signup"
                      className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center"
                    >
                      Get Started Free
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </RouterLink>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="features"
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="px-6 py-3 border-2 border-slate-600 text-white rounded-xl font-semibold text-base hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                    >
                      Explore Features
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="flex justify-center mb-6"
                >
                  <Link to="features" smooth={true} duration={800} offset={-80}>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="cursor-pointer p-2 rounded-full border-2 border-slate-600 hover:border-cyan-400 transition-colors bg-slate-900/50 backdrop-blur-sm"
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Auto-scrolling Text Marquee - */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-0 left-0 right-0 w-full py-7 overflow-hidden border-y border-slate-800/50 bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-slate-900/80 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 via-blue-600/5 to-purple-600/5" />

              <motion.div
                className="flex whitespace-nowrap relative z-10 w-full"
                animate={{ x: [0, -1200] }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                <div className="flex items-center space-x-12 text-slate-200 text-sm font-medium min-w-full">
                  {[
                    {
                      text: "Connect with Students & Faculty",
                      color: "bg-cyan-400",
                      icon: Users,
                    },
                    {
                      text: "Real-time Group Discussions",
                      color: "bg-blue-400",
                      icon: MessageCircle,
                    },
                    {
                      text: "Share Academic Resources",
                      color: "bg-purple-400",
                      icon: BookOpen,
                    },
                    {
                      text: "Collaborative Learning Environment",
                      color: "bg-indigo-400",
                      icon: Target,
                    },
                    {
                      text: "Access Course Materials",
                      color: "bg-teal-400",
                      icon: BookOpen,
                    },
                    {
                      text: "Join Study Groups",
                      color: "bg-emerald-400",
                      icon: Users,
                    },
                    {
                      text: "Engage in Academic Community",
                      color: "bg-green-400",
                      icon: MessageCircle,
                    },
                    {
                      text: "Seamless Communication Platform",
                      color: "bg-yellow-400",
                      icon: Target,
                    },
                    {
                      text: "Enhanced Learning Experience",
                      color: "bg-orange-400",
                      icon: Sparkles,
                    },
                    {
                      text: "Build Academic Networks",
                      color: "bg-pink-400",
                      icon: Users,
                    },
                    {
                      text: "Connect with Students & Faculty",
                      color: "bg-cyan-400",
                      icon: Users,
                    },
                    {
                      text: "Real-time Group Discussions",
                      color: "bg-blue-400",
                      icon: MessageCircle,
                    },
                    {
                      text: "Share Academic Resources",
                      color: "bg-purple-400",
                      icon: BookOpen,
                    },
                    {
                      text: "Collaborative Learning Environment",
                      color: "bg-indigo-400",
                      icon: Target,
                    },
                    {
                      text: "Access Course Materials",
                      color: "bg-teal-400",
                      icon: BookOpen,
                    },
                    {
                      text: "Join Study Groups",
                      color: "bg-emerald-400",
                      icon: Users,
                    },
                    {
                      text: "Engage in Academic Community",
                      color: "bg-green-400",
                      icon: MessageCircle,
                    },
                    {
                      text: "Seamless Communication Platform",
                      color: "bg-yellow-400",
                      icon: Target,
                    },
                    {
                      text: "Enhanced Learning Experience",
                      color: "bg-orange-400",
                      icon: Sparkles,
                    },
                    {
                      text: "Build Academic Networks",
                      color: "bg-pink-400",
                      icon: Users,
                    },
                  ].map((item, index) => (
                    <span
                      key={index}
                      className="flex items-center flex-shrink-0"
                    >
                      <span
                        className={`w-2 h-2 ${item.color} rounded-full mr-3 shadow-lg flex-shrink-0`}
                      />
                      <item.icon className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span className="flex-shrink-0">{item.text}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Enhanced Features Section */}
          <Element name="features" className="relative py-32 px-4 sm:px-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />

            <div
              className="max-w-7xl mx-auto text-center relative z-10"
              ref={featuresRef}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
                  <span className="text-cyan-300 font-medium text-sm uppercase tracking-wider">
                    Features
                  </span>
                </div>

                <h2 className="text-4xl sm:text-6xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Discover the Power
                  </span>
                  <br />
                  <span className="text-white">of KMC Hub</span>
                </h2>

                <p className="text-xl leading-relaxed max-w-3xl mx-auto text-slate-300">
                  Experience next-generation collaboration tools designed to
                  enhance communication and resource sharing in one unified,
                  intelligent platform.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate={featuresInView ? "animate" : "initial"}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              >
                {[
                  {
                    image: GroupChat,
                    title: "Engaging Class Group Chats",
                    description:
                      "Join class-specific group chats for real-time discussions with advanced moderation tools.",
                    gradient: "from-cyan-500/20 to-blue-500/20",
                    border: "border-cyan-500/30",
                    icon: MessageCircle,
                  },
                  {
                    image: Collaboration,
                    title: "Dynamic Collaboration Feed",
                    description:
                      "Share ideas and projects with your peers through our intelligent content discovery system.",
                    gradient: "from-blue-500/20 to-purple-500/20",
                    border: "border-blue-500/30",
                    icon: Users,
                  },
                  {
                    image: Library,
                    title: "Comprehensive Resource Library",
                    description:
                      "Access essential academic materials with AI-powered search and personalized recommendations.",
                    gradient: "from-purple-500/20 to-pink-500/20",
                    border: "border-purple-500/30",
                    icon: BookOpen,
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{
                      y: -15,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-xl border ${feature.border} rounded-2xl p-8 text-white overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm" />

                    <div className="relative z-10">
                      <div className="mb-6 relative overflow-hidden rounded-xl">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="flex items-center mb-4">
                        <feature.icon className="w-6 h-6 text-cyan-400 mr-3" />
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>

                      <p className="text-slate-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RouterLink
                    to="/signup"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                  >
                    Join Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </RouterLink>
                </motion.div>
              </motion.div>
            </div>
          </Element>

          {/* Enhanced Collaboration Section */}
          <section className="relative py-32 px-4 sm:px-20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
            <div
              className="max-w-7xl mx-auto relative z-10"
              ref={collaborationRef}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  {...fadeInLeft}
                  animate={
                    collaborationInView
                      ? fadeInLeft.animate
                      : fadeInLeft.initial
                  }
                >
                  <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-6">
                    <Users className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-medium text-sm uppercase tracking-wider">
                      Collaboration
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                      Dynamic Collaboration
                    </span>
                    <br />
                    <span className="text-white">Feed</span>
                  </h2>

                  <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                    Stay connected with the latest posts from your classmates
                    and faculty. Our AI-powered feed creates a vibrant academic
                    community where breakthrough ideas come to life.
                  </p>

                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={collaborationInView ? "animate" : "initial"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[
                      {
                        title: "Recent Posts",
                        description:
                          "Discover engaging content shared by your peers, including multimedia presentations and research.",
                        icon: MessageCircle,
                      },
                      {
                        title: "Join the Conversation",
                        description:
                          "Contribute your insights and collaborate on projects that shape the future of learning.",
                        icon: Users,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl"
                      >
                        <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                        <h3 className="text-lg font-bold text-white mb-3">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  {...fadeInRight}
                  animate={
                    collaborationInView
                      ? fadeInRight.animate
                      : fadeInRight.initial
                  }
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                  <img
                    src={Feed || "/placeholder.svg"}
                    alt="Collaboration feed preview"
                    className="relative w-full h-auto rounded-2xl shadow-2xl border border-slate-700/30"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Enhanced Join Today Section */}
          <section className="relative py-24 px-4 sm:px-20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10" />

            <div className="max-w-7xl mx-auto relative z-10" ref={joinTodayRef}>
              <motion.div
                {...fadeInUp}
                animate={joinTodayInView ? fadeInUp.animate : fadeInUp.initial}
                className="text-center"
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                    Ready to Transform
                  </span>
                  <br />
                  <span className="text-white">Your Learning Experience?</span>
                </h2>

                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Join thousands of students and educators who are already
                  building the future of academic collaboration.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RouterLink
                      to="/signup"
                      className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center"
                    >
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </RouterLink>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="features"
                      smooth={true}
                      duration={800}
                      offset={-80}
                      className="px-8 py-4 border-2 border-slate-600 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Mission Section */}
          <section className="relative py-32 px-4 sm:px-20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
            <div className="max-w-7xl mx-auto relative z-10" ref={missionRef}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  {...fadeInLeft}
                  animate={
                    missionInView ? fadeInLeft.animate : fadeInLeft.initial
                  }
                >
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6">
                    <Target className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-purple-300 font-medium text-sm uppercase tracking-wider">
                      Our Mission
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                      Empowering Education
                    </span>
                    <br />
                    <span className="text-white">Through Innovation</span>
                  </h2>

                  <p className="text-xl text-slate-300 leading-relaxed">
                    KMC Hub's mission is to revolutionize communication and
                    collaboration in academic environments. By centralizing
                    resources and facilitating secure, intelligent interactions,
                    we're creating the most vibrant learning ecosystem ever
                    built.
                  </p>
                </motion.div>

                <motion.div
                  {...fadeInRight}
                  animate={
                    missionInView ? fadeInRight.animate : fadeInRight.initial
                  }
                  whileHover={{ scale: 1.02, rotateY: -5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
                  <img
                    src={Mission || "/placeholder.svg"}
                    alt="KMC Hub mission overview"
                    className="relative w-full h-auto rounded-2xl shadow-2xl border border-slate-700/30"
                  />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

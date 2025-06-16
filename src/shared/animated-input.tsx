

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Eye, EyeOff, User, Mail, Lock, Hash, UserCheck } from "lucide-react"

interface InputFormProps {
  type?: string
  placeholder?: string
  label: string
  name: string
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error?: string
}

const InputForm: React.FC<InputFormProps> = ({ type, placeholder, label, name, value = "", onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type
  const hasValue = value && value.length > 0
  const isSelect = !type // If no type is provided, render as select

  useEffect(() => {
    if (value) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 500)
      return () => clearTimeout(timer)
    }
  }, [value])

  const getIcon = () => {
    switch (name) {
      case "email":
        return <Mail className="w-5 h-5" />
      case "password":
        return <Lock className="w-5 h-5" />
      case "name":
        return <User className="w-5 h-5" />
      case "idNumber":
        return <Hash className="w-5 h-5" />
      case "role":
        return <UserCheck className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  // Select dropdown component
  if (isSelect) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <motion.div
          className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 ${
            isFocused
              ? "border-cyan-400 shadow-lg shadow-cyan-400/25"
              : error
                ? "border-red-400 shadow-lg shadow-red-400/25"
                : "border-slate-600 hover:border-slate-500"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center p-4">
            <motion.div
              className={`mr-3 transition-colors duration-300 ${
                isFocused ? "text-cyan-400" : error ? "text-red-400" : "text-slate-400"
              }`}
              animate={{ rotate: isFocused ? 360 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {getIcon()}
            </motion.div>
            <div className="flex-1">
              <motion.label
                htmlFor={name}
                className={`block text-sm font-medium transition-colors duration-300 ${
                  isFocused ? "text-cyan-400" : error ? "text-red-400" : "text-slate-300"
                }`}
                animate={{ y: 0 }}
              >
                {label}
              </motion.label>
              <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full mt-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
              >
                <option value="" className="bg-slate-800 text-slate-300">
                  Select Role
                </option>
                <option value="Student" className="bg-slate-800 text-white">
                  Student
                </option>
                <option value="Teacher" className="bg-slate-800 text-white">
                  Teacher
                </option>
                <option value="Admin" className="bg-slate-800 text-white">
                  Admin
                </option>
              </select>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-2 flex items-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-red-400 mr-2 flex items-center justify-center text-white text-xs font-bold"
              >
                !
              </motion.span>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // Input field component
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <motion.div
        className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 ${
          isFocused
            ? "border-cyan-400 shadow-lg shadow-cyan-400/25"
            : error
              ? "border-red-400 shadow-lg shadow-red-400/25"
              : "border-slate-600 hover:border-slate-500"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center p-4">
          <motion.div
            className={`mr-3 transition-colors duration-300 ${
              isFocused ? "text-cyan-400" : error ? "text-red-400" : "text-slate-400"
            }`}
            animate={{ rotate: isFocused ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {getIcon()}
          </motion.div>
          <div className="flex-1 relative">
            <motion.label
              htmlFor={name}
              className={`absolute transition-all duration-300 pointer-events-none ${
                isFocused || hasValue ? "text-xs -top-2 left-0" : "text-base top-1/2 left-0 transform -translate-y-1/2"
              } ${isFocused ? "text-cyan-400" : error ? "text-red-400" : "text-slate-300"}`}
              animate={{
                scale: isFocused || hasValue ? 0.85 : 1,
                y: isFocused || hasValue ? -8 : 0,
              }}
            >
              {label}
            </motion.label>
            <input
              ref={inputRef}
              type={inputType}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isFocused ? placeholder : ""}
              className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none pt-2"
            />
            {isTyping && (
              <motion.div
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </motion.div>
            )}
          </div>
          {isPassword && (
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-sm mt-2 flex items-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 rounded-full bg-red-400 mr-2 flex items-center justify-center text-white text-xs font-bold"
            >
              !
            </motion.span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

InputForm.displayName = "InputForm"

export default InputForm




"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { signup } from "../api/auth"
import type { SignupRequest } from "../types/auth_types"
import { InteractiveStars } from "../../home/components/interactive-stars"
import { AnimatedCursor } from "../../home/components/animated-cursor"
import InputForm from "../../../shared/animated-input"
import { AnimatedButton } from "../../../shared/animated-button"
import { AlertCircle, CheckCircle2, UserPlus } from "lucide-react"

const SignUpForm: React.FC = () => {
  const initialValue: SignupRequest = {
    idNumber: "",
    name: "",
    email: "",
    password: "",
    role: "",
    additionalInfo: ""
  }

  const [formValues, setFormValues] = useState(initialValue)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [apiError, setApiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
    if (apiError) setApiError("")
  }

  const validate = (values: SignupRequest) => {
    const errors: { [key: string]: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!values.name) errors.name = "Name is required"
    if (!values.email) errors.email = "Email is required"
    else if (!emailRegex.test(values.email)) errors.email = "Invalid email format"
    if (!values.password) errors.password = "Password is required"
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters"
    if (!values.role) errors.role = "Role is required"
    else if (!["Student", "Teacher", "Admin"].includes(values.role)) {
      errors.role = "Role must be Student, Teacher, or Admin"
    }
    if (values.role === "Student" && !values.idNumber) {
      errors.idNumber = "ID Number is required for Students"
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setApiError("")
    setIsLoading(true)

    const validationErrors = validate(formValues)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    try {
      const payload: SignupRequest = {
        ...formValues,
        idNumber: formValues.idNumber || undefined,
      }
      await signup(payload)
      setShowSuccess(true)

      // Delay navigation to show success animation
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendError = error?.errors?.[0]?.message || error.message || "Signup failed"
      setApiError(backendError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4 relative overflow-hidden">
      <InteractiveStars />
      <AnimatedCursor />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md max-h-[95vh] overflow-y-auto"
      >
        <motion.div
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          {/* Header - Compact */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <UserPlus className="w-6 h-6 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Join KMC Hub
            </h2>
            <p className="text-slate-400 mt-1 text-sm">Create your account to get started</p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400 text-sm">Account created successfully! Redirecting to login...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form - Compact spacing */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <InputForm
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                error={errors.name}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <InputForm
                type="email"
                label="Email"
                placeholder="Enter your email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                error={errors.email}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <InputForm
                type="text"
                label="ID Number"
                placeholder="Enter ID Number (required for Students)"
                name="idNumber"
                value={formValues.idNumber}
                onChange={handleChange}
                error={errors.idNumber}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <InputForm
                label="Role"
                placeholder="Select your role"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                error={errors.role}
              />
            </motion.div>

            {formValues.role === "Student" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <InputForm
                  type="text"
                  label="Additional Student Info"
                  placeholder="Enter additional student information"
                  name="additionalInfo"
                  value={formValues.additionalInfo || ""}
                  onChange={handleChange}
                  error={errors.additionalInfo}
                />
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <InputForm
                type="password"
                label="Password"
                placeholder="Create a strong password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                error={errors.password}
              />
            </motion.div>

            {/* API Error */}
            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                  <span className="text-red-400 text-sm">{apiError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button - Compact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <AnimatedButton type="submit" loading={isLoading} variant="secondary" className="w-full py-3">
                {isLoading ? "Creating Account..." : "Create Account"}
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Footer - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SignUpForm

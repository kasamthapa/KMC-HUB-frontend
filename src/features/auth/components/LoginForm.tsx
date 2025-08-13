"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { login } from "../api/auth";
import { authAtomWithStorage } from "../../../jotai/auth";
import type { LoginRequest } from "../types/auth_types";
import { InteractiveStars } from "../../home/components/interactive-stars";
import { AnimatedCursor } from "../../home/components/animated-cursor";
import { AnimatedButton } from "../../../shared/animated-button";
import { AlertCircle, CheckCircle2, LogIn } from "lucide-react";
import InputForm from "../../../shared/animated-input";

const LoginForm: React.FC = () => {
  const initialValue: LoginRequest = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [, setAuth] = useAtom(authAtomWithStorage);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (apiError) setApiError("");
  };

  const validate = (values: LoginRequest) => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email))
      errors.email = "Invalid email format";
    if (!values.password) errors.password = "Password is required";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setIsLoading(true);

    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const payload: LoginRequest = { ...formValues };
      const { token, User } = await login(payload);
      setAuth({ user: User, token, isAuthenticated: true });
      setShowSuccess(true);

      // Delay navigation to show success animation
      setTimeout(() => {
        navigate("/feed");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendError =
        error?.errors?.[0]?.message || error.message || "Login failed";
      setApiError(backendError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4 relative overflow-hidden">
      <InteractiveStars />
      <AnimatedCursor />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
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
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <LogIn className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Welcome Back
            </h2>
            <p className="text-slate-400 mt-2">
              Sign in to your KMC Hub account
            </p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-green-400">
                  Login successful! Redirecting...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
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

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InputForm
                type="password"
                label="Password"
                placeholder="Enter your password"
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
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-400">{apiError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatedButton
                type="submit"
                loading={isLoading}
                className="w-full"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;

/* eslint-disable @typescript-eslint/no-explicit-any */


import type React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { signup } from "../api/auth";
import type { SignupRequest } from "../types/auth_types";
import { authAtomWithStorage } from "../../../jotai/auth";
import { InteractiveStars } from "../../home/components/interactive-stars";
import { AnimatedCursor } from "../../home/components/animated-cursor";
import InputForm from "../../../shared/animated-input";
import { AnimatedButton } from "../../../shared/animated-button";
import { AvatarUpload } from "./AvatarUpload";
import { AlertCircle, CheckCircle2, UserPlus } from "lucide-react";

const SignUpForm: React.FC = () => {
  const initialValue: SignupRequest = {
    idNumber: "",
    name: "",
    email: "",
    password: "",
    role: "Student",
    avatar: undefined,
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [, setAuth] = useAtom(authAtomWithStorage);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (apiError) setApiError("");
  };

  const handleAvatarChange = (file: File | null) => {
    setFormValues({ ...formValues, avatar: file || undefined });
    if (errors.avatar) {
      setErrors({ ...errors, avatar: "" });
    }
  };

  const validate = (values: SignupRequest) => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const idNumberRegex = /^\d{8}$/;

    if (!values.name) errors.name = "Name is required";
    if (!values.email) errors.email = "Email is required";
    else if (!emailRegex.test(values.email)) errors.email = "Invalid email format";
    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!values.role) errors.role = "Role is required";
    else if (!["Student", "Teacher", "Admin"].includes(values.role)) {
      errors.role = "Role must be Student, Teacher, or Admin";
    }
    if (values.role === "Student" && !values.idNumber) {
      errors.idNumber = "ID Number is required for Students";
    } else if (values.role === "Student" && !idNumberRegex.test(values.idNumber || "")) {
      errors.idNumber = "ID Number must be an 8-digit number";
    }
    if (values.avatar && values.avatar.size > 2 * 1024 * 1024) {
      errors.avatar = "Image must be less than 2MB";
    }
    if (values.avatar && !values.avatar.type.startsWith("image/")) {
      errors.avatar = "Only image files are allowed";
    }

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
      const payload: SignupRequest = {
        ...formValues,
        idNumber: formValues.role === "Student" ? formValues.idNumber : undefined,
      };
      const response = await signup(payload);
      setAuth({
        user: response.User,
        token: null, // Backend doesn't return token
        isAuthenticated: true,
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      const backendError = error?.errors?.[0]?.message || error.message || "Signup failed";
      setApiError(backendError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <InteractiveStars />
      <AnimatedCursor />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md max-h-[95vh] overflow-y-auto"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl p-6 shadow-md"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-kmcBlue rounded-full mb-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <UserPlus className="w-6 h-6 text-white" />
            </motion.div>
            <h2 className="text-2xl font-roboto font-bold text-kmcBlue dark:text-white">
              Join KMC Hub
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Create your account to get started
            </p>
          </motion.div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center"
              >
                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-600 text-sm">
                  Account created successfully! Redirecting to feed...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <AvatarUpload onFileSelect={handleAvatarChange} error={errors.avatar} />
            </motion.div>

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
                type="password"
                label="Password"
                placeholder="Create a strong password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                error={errors.password}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label
                htmlFor="role"
                className="block text-sm font-roboto text-gray-700 dark:text-gray-300"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-roboto"
                aria-label="Select role"
                required
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
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
                  label="ID Number"
                  placeholder="Enter 8-digit ID Number"
                  name="idNumber"
                  value={formValues.idNumber}
                  onChange={handleChange}
                  error={errors.idNumber}
                />
              </motion.div>
            )}

            <AnimatePresence>
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-red-500 text-sm">{apiError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <AnimatedButton
                type="submit"
                loading={isLoading}
                variant="secondary"
                className="w-full py-3 bg-green-600 hover:bg-green-700 font-roboto"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-kmcBlue hover:text-kmcBlue/80 transition-colors duration-300 font-roboto font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
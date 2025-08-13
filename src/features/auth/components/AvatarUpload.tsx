import type React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, User } from "lucide-react";

interface AvatarUploadProps {
  onFileSelect: (file: File | null) => void;
  currentAvatar?: string;
  error?: string;
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  onFileSelect,
  currentAvatar,
  error,
  className = "",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        onFileSelect(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        onFileSelect(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    } else {
      setPreview(null);
      onFileSelect(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFileSelect(null);
  };

  const displayImage = preview || currentAvatar;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        className={`relative w-24 h-24 rounded-full border-2 border-dashed cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-green-600 bg-green-600/10"
            : error
            ? "border-red-500 bg-red-500/10"
            : "border-gray-600 dark:border-gray-400 hover:border-kmcBlue bg-gray-800/50 dark:bg-gray-700/50"
        }`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {displayImage ? (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full h-full"
            >
              <img
                src={displayImage}
                alt="Avatar preview"
                className="w-full h-full rounded-full object-cover"
              />
              <motion.button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-3 h-3 text-white" />
              </motion.button>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full h-full rounded-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 font-roboto"
            >
              {isDragging ? <Upload className="w-8 h-8 mb-1" /> : <User className="w-8 h-8 mb-1" />}
              <span className="text-xs text-center font-roboto">{isDragging ? "Drop here" : "Add Photo"}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
        className="hidden"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-gray-500 dark:text-gray-400 font-roboto mt-2 text-center max-w-32"
      >
        Click or drag to upload
      </motion.p>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-500 font-roboto mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
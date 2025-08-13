import type React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const statusSizes = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  size = "md",
  className = "",
  showOnlineStatus = false,
  isOnline = false,
}) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const baseUrl = import.meta.env.VITE_STATIC_URL || "http://localhost:3000";
  const avatarSrc = src ? `${baseUrl}${src}` : null;

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-kmcBlue flex items-center justify-center font-roboto font-semibold text-white shadow-lg`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : (
          <span className="select-none">{initials || <User className="w-1/2 h-1/2" />}</span>
        )}
      </motion.div>

      {showOnlineStatus && (
        <motion.div
          className={`absolute -bottom-0.5 -right-0.5 ${statusSizes[size]} rounded-full border-2 border-gray-800 dark:border-gray-900 ${
            isOnline ? "bg-green-600" : "bg-gray-500"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
      )}
    </div>
  );
};
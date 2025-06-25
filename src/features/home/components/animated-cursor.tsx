import type React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface SnakeCursorProps {
  className?: string;
  segmentCount?: number;
  segmentSize?: number;
}

export const AnimatedCursor: React.FC<SnakeCursorProps> = ({
  className = "",
  segmentCount = 12,
  segmentSize = 16,
}) => {
  // Create motion values at the top level
  const segment0 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment1 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment2 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment3 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment4 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment5 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment6 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment7 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment8 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment9 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment10 = { x: useMotionValue(0), y: useMotionValue(0) };
  const segment11 = { x: useMotionValue(0), y: useMotionValue(0) };

  const segments = [
    segment0,
    segment1,
    segment2,
    segment3,
    segment4,
    segment5,
    segment6,
    segment7,
    segment8,
    segment9,
    segment10,
    segment11,
  ].slice(0, segmentCount);

  // Create springs at the top level
  const spring0 = {
    x: useSpring(segment0.x, { damping: 20, stiffness: 400, mass: 0.3 }),
    y: useSpring(segment0.y, { damping: 20, stiffness: 400, mass: 0.3 }),
  };
  const spring1 = {
    x: useSpring(segment1.x, { damping: 22, stiffness: 385, mass: 0.3 }),
    y: useSpring(segment1.y, { damping: 22, stiffness: 385, mass: 0.3 }),
  };
  const spring2 = {
    x: useSpring(segment2.x, { damping: 24, stiffness: 370, mass: 0.3 }),
    y: useSpring(segment2.y, { damping: 24, stiffness: 370, mass: 0.3 }),
  };
  const spring3 = {
    x: useSpring(segment3.x, { damping: 26, stiffness: 355, mass: 0.3 }),
    y: useSpring(segment3.y, { damping: 26, stiffness: 355, mass: 0.3 }),
  };
  const spring4 = {
    x: useSpring(segment4.x, { damping: 28, stiffness: 340, mass: 0.3 }),
    y: useSpring(segment4.y, { damping: 28, stiffness: 340, mass: 0.3 }),
  };
  const spring5 = {
    x: useSpring(segment5.x, { damping: 30, stiffness: 325, mass: 0.3 }),
    y: useSpring(segment5.y, { damping: 30, stiffness: 325, mass: 0.3 }),
  };
  const spring6 = {
    x: useSpring(segment6.x, { damping: 32, stiffness: 310, mass: 0.3 }),
    y: useSpring(segment6.y, { damping: 32, stiffness: 310, mass: 0.3 }),
  };
  const spring7 = {
    x: useSpring(segment7.x, { damping: 34, stiffness: 295, mass: 0.3 }),
    y: useSpring(segment7.y, { damping: 34, stiffness: 295, mass: 0.3 }),
  };
  const spring8 = {
    x: useSpring(segment8.x, { damping: 36, stiffness: 280, mass: 0.3 }),
    y: useSpring(segment8.y, { damping: 36, stiffness: 280, mass: 0.3 }),
  };
  const spring9 = {
    x: useSpring(segment9.x, { damping: 38, stiffness: 265, mass: 0.3 }),
    y: useSpring(segment9.y, { damping: 38, stiffness: 265, mass: 0.3 }),
  };
  const spring10 = {
    x: useSpring(segment10.x, { damping: 40, stiffness: 250, mass: 0.3 }),
    y: useSpring(segment10.y, { damping: 40, stiffness: 250, mass: 0.3 }),
  };
  const spring11 = {
    x: useSpring(segment11.x, { damping: 42, stiffness: 235, mass: 0.3 }),
    y: useSpring(segment11.y, { damping: 42, stiffness: 235, mass: 0.3 }),
  };

  const segmentSprings = [
    spring0,
    spring1,
    spring2,
    spring3,
    spring4,
    spring5,
    spring6,
    spring7,
    spring8,
    spring9,
    spring10,
    spring11,
  ].slice(0, segmentCount);

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Update the first segment immediately
      segments[0].x.set(e.clientX);
      segments[0].y.set(e.clientY);

      // Update subsequent segments with a slight delay to create following effect
      segments.slice(1).forEach((segment, index) => {
        setTimeout(() => {
          segment.x.set(e.clientX);
          segment.y.set(e.clientY);
        }, (index + 1) * 20);
      });

      if (!isVisible) {
        setIsVisible(true);
      }
    },
    [segments, isVisible]
  );

  // Handle mouse enter/leave
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  // Handle mouse down/up for click effect
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  // Handle hover states for interactive elements
  const handleElementHover = useCallback(() => setIsHovering(true), []);
  const handleElementLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleElementHover,
    handleElementLeave,
  ]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className}`}
    >
      {/* Snake segments */}
      {segmentSprings.map((spring, index) => {
        const isHead = index === 0;
        const size = isHead ? segmentSize : segmentSize * (1 - index * 0.05);
        const opacity = 1 - index * 0.06;

        // Create gradient colors from head to tail
        const hue = 120 + index * 15; // Green to blue gradient
        const saturation = 80 - index * 3;
        const lightness = 60 - index * 2;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full will-change-transform"
            style={{
              x: spring.x,
              y: spring.y,
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              zIndex: segmentCount - index, // Head appears on top
            }}
            animate={{
              scale: isClicking
                ? isHead
                  ? 1.3
                  : 1.1
                : isHovering
                ? isHead
                  ? 1.2
                  : 1.05
                : 1,
              opacity: isVisible ? opacity : 0,
            }}
            transition={{
              scale: { duration: 0.2, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
          >
            {isHead ? (
              // Snake head with special styling
              <div
                className="w-full h-full rounded-full border-2 border-white relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 30% 30%, hsl(${hue}, ${saturation}%, ${
                    lightness + 20
                  }%), hsl(${hue}, ${saturation}%, ${lightness}%))`,
                  boxShadow: `0 0 20px hsla(${hue}, ${saturation}%, ${lightness}%, 0.6), 0 0 40px hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`,
                }}
              >
                {/* Snake eyes */}
                <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-red-400 rounded-full" />
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-400 rounded-full" />

                {/* Tongue effect on click */}
                {isClicking && (
                  <motion.div
                    className="absolute top-2/3 left-1/2 w-0.5 h-2 bg-red-500 rounded-full origin-bottom"
                    style={{ marginLeft: -1 }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            ) : (
              // Snake body segments
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, hsl(${hue}, ${saturation}%, ${
                    lightness + 10
                  }%), hsl(${hue}, ${saturation}%, ${lightness}%))`,
                  boxShadow: `0 0 ${
                    10 - index
                  }px hsla(${hue}, ${saturation}%, ${lightness}%, ${
                    0.4 - index * 0.02
                  })`,
                  border:
                    index < 3 ? "1px solid rgba(255,255,255,0.3)" : "none",
                }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Particle effects on click */}
      {isClicking && (
        <motion.div
          className="absolute"
          style={{
            x: segmentSprings[0].x,
            y: segmentSprings[0].y,
            marginLeft: -10,
            marginTop: -10,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: 10,
                top: 10,
                background: `hsl(${120 + i * 20}, 70%, 60%)`,
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 8) * 40,
                y: Math.sin((i * Math.PI * 2) / 8) * 40,
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.03,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

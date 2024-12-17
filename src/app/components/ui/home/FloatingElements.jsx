"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const shapes = [
  { scale: 1, rotate: 0, translateX: -20, translateY: -20 },
  { scale: 0.5, rotate: 45, translateX: 20, translateY: 30 },
  { scale: 0.7, rotate: -30, translateX: -30, translateY: 40 },
  { scale: 0.3, rotate: 15, translateX: 40, translateY: -40 },
];

export default function FloatingElements() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute w-64 h-64"
          style={{
            left: `${50 + shape.translateX}%`,
            top: `${50 + shape.translateY}%`,
          }}
          animate={{
            scale: [shape.scale, shape.scale * 1.1, shape.scale],
            rotate: [shape.rotate, shape.rotate + 10, shape.rotate],
            translateX: [shape.translateX, shape.translateX + 10, shape.translateX],
            translateY: [shape.translateY, shape.translateY - 10, shape.translateY],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-3xl"
            style={{
              transform: `perspective(1000px) rotateX(${45}deg) rotateY(${-45}deg)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
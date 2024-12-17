"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";

export default function GlowingButton({ children, variant = "default" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary opacity-70 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <Button
        variant={variant}
        size="lg"
        className="relative min-w-[200px] h-12 text-lg"
      >
        {children}
      </Button>
    </motion.div>
  );
}

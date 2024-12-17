"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FloatingElements from "@/app/components/ui/home/FloatingElements";
import ParticleField from "@/app/components/ui/home/ParticleField";
import { Button } from "@/app/components/ui/button";
import AnimatedText from "@/app/components/ui/home/AnimatedText";
import AssistantForm from "@/app/components/AssistantForm";

export default function HeroSection({ isDark, toggleDarkMode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <ParticleField />
      <FloatingElements />

      {/* Mouse Cursor Small Radial Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 20%)`,
          opacity: 0.5,
        }}
        transition={{
          type: "tween",
          duration: 0.4,
          ease: "easeOut",
        }}
      />

      {/* Hero Section Content */}
      <div className="container relative px-4 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            {/* Small Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm border rounded-full border-border gap-1.5 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Empowering the next generation of creators</span>
            </motion.div>

            {/* Title */}
            <AnimatedText
              text="we're created to create."
              className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto"
            >
              Transform your ideas into reality with our cutting-edge platform.
              Build projects that matter, learn from industry experts, and
              showcase your talent.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-4 mt-8 sm:flex-row justify-center"
            >
              <AssistantForm />
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className={`min-w-[200px] h-12 text-lg ${
                    isDark ? "hover:text-white" : "hover:text-gray-700"
                  }`}
                >
                  Explore Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

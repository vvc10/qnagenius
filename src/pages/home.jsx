"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeatureSection";
import StatsSection from "@/app/components/StatsSection";
import Faqs from "@/app/components/Faqs";
 

const Home = () => {
  const [isDark, setIsDark] = React.useState(false);
 
 

  React.useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const isDarkMode = savedDarkMode === "true";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDark ? "dark" : "")}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
  
        <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1">
          <HeroSection isDark={isDark} toggleDarkMode={toggleDarkMode} />
          <FeaturesSection />
          <StatsSection />
          <Faqs />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
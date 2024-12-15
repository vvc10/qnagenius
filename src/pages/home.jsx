"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import Faqs from "@/app/components/Faqs";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

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
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/50 bg-[url('https://images.pexels.com/photos/1666315/pexels-photo-1666315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    we're created to create.
                  </h1>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl">
                    Empowering students to create industry-defining projects with real-world applications. Build the next breakthrough today.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8">
                    Get Help
                  </Button>
                  <Link href="/projects">
                    <Button size="lg" variant="outline">
                      Browse Project Ideas
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="py-12 my-12 bg-muted/10">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Innovate. Create. Lead.</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our platform provides you with the tools to build projects that make a difference. Join the next wave of innovation and show the world what you can do.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
                <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-xl font-medium">- 💡 Innovative Ideas</h3>
                  <p className="text-lg text-muted-foreground">
                    Transform your ideas into reality. Explore cutting-edge technologies and concepts.
                  </p>
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-xl font-medium">- 🌐 Real-World Applications</h3>
                  <p className="text-lg text-muted-foreground">
                    Work on projects that address real-world problems and gain valuable experience.
                  </p>
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-xl font-medium">- 🚀 Empower Your Career</h3>
                  <p className="text-lg text-muted-foreground">
                    A final year project that sets you apart. Create something employers will value.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Faqs />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

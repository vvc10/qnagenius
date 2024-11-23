import * as React from "react"
import { ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible"
import { Input } from "@/app/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { cn } from "@/app/lib/utils"
import Faqs from "@/app/components/Faqs"
import Footer from "@/app/components/Footer"
import Navbar from "@/app/components/Navbar"
import { useEffect, useState } from "react"

interface Project {
  title: string;
  category: string;
  enrolled: string;
}

const Home: React.FC = () => {
  const [isDark, setIsDark] = React.useState('dark')
  const [searchTerm, setSearchTerm] = React.useState("")
 
  const projects = [
    {
      title: "Introduction to Programming",
      category: "Programming",
      image: "/placeholder.svg?height=200&width=400",
      enrolled: "50K+",
    },
    {
      title: "Data Science Fundamentals",
      category: "Data Science",
      image: "/placeholder.svg?height=200&width=400",
      enrolled: "30K+",
    },
    {
      title: "Digital Marketing Essentials",
      category: "Marketing",
      image: "/placeholder.svg?height=200&width=400",
      enrolled: "40K+",
    },
    {
      title: "UX Design Principles",
      category: "Design",
      image: "/placeholder.svg?height=200&width=400",
      enrolled: "25K+",
    },
    {
      title: "Business Analytics",
      category: "Business",
      image: "/placeholder.svg?height=200&width=400",
      enrolled: "35K+",
    },
    {
      title: "Machine Learning Basics",
      category: "AI/ML",
      image: "/placeholder.svg?height=200&width=400",
      enrolled: "45K+",
    },
  ]

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }
 
  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDark ? "dark" : "")}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar isDark={isDark}  toggleDarkMode={toggleDarkMode} />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Make Learning a Daily Habit
                  </h1>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl">
                    Access our library of free courses and start your learning journey today. Join millions
                    of learners worldwide.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline">
                    Browse Courses
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <Faqs />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home
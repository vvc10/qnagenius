'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Search, ChevronRight, Eye, Clock } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import Image from "next/image"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { db } from "@/app/db/firebase.config"
import { collection, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"

interface Project {
  id: string
  title: string
  category: string
  enrolled: string
  image?: string
  author: string
  description: string
  duration: string
  lastUpdated: string
  progress: number
  overview: string
  syllabus: string[]
  requirements: string[]
  blogContent: {
    components: string
    circuit: string
    about_circuit: string
    about_programming: string
    conclusion: string
    conclusion_images: string
    programming: string
  }
}

export default function Projects() {
  const [isDark, setIsDark] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"))

        const projectsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const project = doc.data() as Project
            project.id = doc.id

            const blogContentSnapshot = await getDocs(collection(db, "projects", doc.id, "blog_content"))
            const blogContent = blogContentSnapshot.docs[0]?.data() || {}

            return {
              ...project,
              blogContent: {
                components: blogContent.components || "",
                circuit: blogContent.circuit || "",
                about_circuit: blogContent.about_circuit || "",
                about_programming: blogContent.about_programming || "",
                conclusion: blogContent.conclusion || "",
                conclusion_images: blogContent.conclusion_images || "",
                programming: blogContent.programming || "",
              },
            }
          })
        )

        setProjects(projectsData)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setError("Failed to fetch projects.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProjectClick = (project: Project) => {
    router.push({
      pathname: '/projectdetails',
      query: {
        id: project.id,
        title: project.title,
      }
    })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-secondary/10 ${isDark ? 'dark' : ''}`}>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Projects</h1>
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </motion.div>

        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Badge className="absolute top-4 left-4 z-40" variant="secondary">
                        {project.category}
                      </Badge>

                      <Image
                        src={project.image || "/default-project-cover.jpg"}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                      />
                    </div>

                    <CardContent className="p-4">

                      <h3 onClick={() => handleProjectClick(project)} className="text-xl mb-3 font-semibold z-50 hover:font-[600] cursor-pointer">
                        {project.title}</h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {project.duration ? project.duration : "10"} min
                        </div>
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          1k
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className={`text-primary ${isDark ? " bg-[#1f2031]" : "bg-[#ededed]"}`}
                        onClick={() => handleProjectClick(project)}
                      >
                        View Project
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </main>
      <Footer />
    </div>
  )
}


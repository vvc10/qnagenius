'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Search, ChevronRight, Eye, Clock, Loader2 } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import Image from "next/image"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { db } from "@/app/db/firebase.config"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"

export default function Projects() {
  const [isDark, setIsDark] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
          querySnapshot.docs.map(async (docSnap) => {
            const projectData = docSnap.data()
            projectData.id = docSnap.id

            // Fetch category name
            let categoryName = "Unknown Category";
            if (projectData.category) {
              try {
                const categoryDoc = await getDoc(doc(db, "project_categories", projectData.category));
                if (categoryDoc.exists()) {
                  categoryName = categoryDoc.data().category || "Unknown Category";
                }
              } catch (error) {
                console.error("Error fetching category:", error);
              }
            }
            projectData.categoryName = categoryName;

            // Fetch author name
            let authorName = "Unknown Author";
            if (projectData.author) {
              try {
                const authorDoc = await getDoc(doc(db, "authors", projectData.author));
                if (authorDoc.exists()) {
                  authorName = authorDoc.data().author || "Unknown Author";
                }
              } catch (error) {
                console.error("Error fetching author:", error);
              }
            }
            projectData.authorName = authorName;

            return {
              ...projectData,
              blogContent: {
                components: "",
                circuit: "",
                about_circuit: "",
                about_programming: "",
                conclusion: "",
                conclusion_images: "",
                programming: "",
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

  const handleProjectClick = (project) => {
    router.push(`/projectdetails?id=${project.id}&title=${project.title}`);
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-secondary/10 ${isDark ? 'dark' : ''}`}>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Projects</h1>
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute h-4 w-4 left-3 top-1/2 transform  z-50 -translate-y-1/2 text-muted-foreground" />
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

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <ScrollArea className="h-full">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[400px] flex flex-col">
                    <div className="relative h-48">
                      <Badge className="absolute top-4 left-4 z-40" variant="secondary">
                        {project.categoryName}
                      </Badge>

                      <Image
                        src={project.image || "/default-project-cover.jpg"}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                      />
                    </div>

                    <CardContent className="p-4 flex-grow">
                      <h3
                        onClick={() => handleProjectClick(project)}
                        className={`text-xl mb-3 font-semibold z-50 hover:font-[600] cursor-pointer ${isDark ? "hover:text-[#81e6d9]" : "hover:text-[#81e6d9]"} `}
                      >
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: project.description }}></p>
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
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          {project.authorName || "admin"}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className={`text-primary ${isDark ? "bg-[#1f2031] hover:bg-[#1f2031] hover:text-[#81e6d9]" : "hover:text-[#81e6d9]"}`}
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


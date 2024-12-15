'use client'

import React, { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Users, Share, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import Image from "next/image"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { db } from "@/app/db/firebase.config"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"

const sidebarItems = [
  { id: "overview", label: "Overview" },
  { id: "components", label: "Components" },
  { id: "circuit", label: "Circuit" },
  { id: "programming", label: "Programming" },
  { id: "conclusion", label: "Conclusion" },
]

export default function ProjectDetails() {
  const [isDark, setIsDark] = useState(false)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams()
  const projectId = searchParams ? searchParams.get('id') : null

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return

      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId))
        if (projectDoc.exists()) {
          const projectData = projectDoc.data()
          projectData.id = projectDoc.id

          const blogContentSnapshot = await getDocs(collection(db, "projects", projectId, "blog_content"))
          const blogContent = blogContentSnapshot.docs[0]?.data() || {}

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

          setProject({
            ...projectData,
            blogContent: {
              components: blogContent.components || "",
              circuit: blogContent.circuit || "",
              about_circuit: blogContent.about_circuit || "",
              about_programming: blogContent.about_programming || "",
              conclusion: blogContent.conclusion || "",
              conclusion_images: blogContent.conclusion_images || "",
              programming: blogContent.programming || "",
              resources: blogContent.resources || "",
            },
            // Ensure requirements is always an array
            requirements: Array.isArray(projectData.requirements) ? projectData.requirements : [],
            // Ensure syllabus is always an array
            syllabus: Array.isArray(projectData.syllabus) ? projectData.syllabus : [],
          })
        } else {
          console.error("Project not found")
        }
      } catch (error) {
        console.error("Error fetching project details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectDetails()
  }, [projectId])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading project details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4 fixed md:relative bottom-2 md:bottom-0 z-50 w-[90%] md:w-full mx-auto">
            {/* Toggle button for mobile view */}
            <div
              className="lg:hidden flex justify-between items-center px-6 py-2 border-2 md:border-0 bg-secondary/50 backdrop-blur-md text-secondary-foreground rounded-[5px] cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Table of Contents</span>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </div>

            {/* Sidebar content */}
            {(isOpen || window.innerWidth >= 1024) && (
              <Card className={`transition-all duration-300 ${isOpen ? "block" : "hidden"} lg:block`}>
                <CardHeader className="hidden lg:block">
                  <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1 py-2">
                    {sidebarItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeSection === item.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveSection(item.id)}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            )}
          </aside>
          {/* Main content */}
          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex flex-row justify-between">
                <div className="">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={project.authorName || 'Unknown Author'} />
                      <AvatarFallback>{(project.authorName || 'U')[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{project.authorName || 'Unknown Author'}</p>
                      <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {project.duration} min read
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.enrolled}
                    </Badge>
                    <Badge variant="secondary">{project.categoryName}</Badge>
                    <Badge variant="secondary">Last updated {project.lastUpdated}</Badge>
                  </div>
                </div>
                <div className="mx-2">
                  <Button variant="secondary">
                    <Share />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="mb-8 overflow-hidden">
                <Image
                  src={project.image || "/default-project-cover.jpg"}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </Card>
            </motion.div>

            <Tabs defaultValue="content" className="mb-8">
              <TabsList>
                <TabsTrigger value="content">Project</TabsTrigger>
                <TabsTrigger value="overview">Faqs</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <ScrollArea className="h-full w-full rounded-md border p-4">
                  <section id="overview" className="mb-8">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.description }} />
                  </section>

                  <Separator className="my-8" />

                  <section id="components" className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Components</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.blogContent.components }} />
                  </section>

                  <Separator className="my-8" />

                  <section id="circuit" className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Circuit</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.blogContent.circuit }} />
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.blogContent.about_circuit }} />
                  </section>

                  <Separator className="my-8" />

                  <section id="programming" className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Programming</h2>
                    <Tabs defaultValue="code" className="mb-4">
                      <TabsList>
                        <TabsTrigger value="code">Code</TabsTrigger>
                        <TabsTrigger value="explanation">Explanation</TabsTrigger>
                      </TabsList>
                      <TabsContent value="code">
                        <div
                          className="whitespace-pre-wrap overflow-x-auto max-w-full prose max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: `${project.blogContent.programming}`,
                          }}
                        />
                      </TabsContent>
                      <TabsContent value="explanation">
                        <div 
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: project.blogContent.about_programming }}
                        />
                      </TabsContent>
                    </Tabs>
                  </section>

                  <Separator className="my-8" />

                  <section id="conclusion" className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.blogContent.conclusion }} />
                  </section>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Faqs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    No faqs
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="files">
                <Card>
                  <CardHeader>
                    <CardTitle>Get all the code files & libraries </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex flex-row gap-2 bg-secondary px-4 py-2 w-fit rounded-sm ${isDark ? "hover:bg-gray-900 " : "hover:bg-gray-300 "}cursor-pointer`}>
                      <Link href={(new DOMParser().parseFromString(project.blogContent.resources, 'text/html').body.textContent || '').trim()}>
                        Download Files
                        <span>↗️</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


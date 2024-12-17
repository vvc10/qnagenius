'use client'

import React, { useState, useEffect } from "react"
import { db } from "@/app/db/firebase.config"
import { motion } from "framer-motion"
import { Clock, Users, Loader2, Trash2, Delete } from 'lucide-react'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { toast } from 'react-toastify'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import 'react-toastify/dist/ReactToastify.css'
import Link from "next/link"
import Image from "next/image"
import RichTextEditor from '@/app/components/RichTextEditor'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/components/ui/select'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';


const AdminHome = () => {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({
    id: '',
    title: "",
    category: "",
    image: "",
    description: "",
    duration: "",
    enrolled: "",
    author: "",
    requirements: "",
    blogContent: {
      components: "",
      circuit: "",
      about_circuit: "",
      about_programming: "",
      conclusion: "",
      conclusion_images: "",
      programming: "",
      resources: "",
    },
  })
  const [editingProject, setEditingProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [author, setAuthor] = useState([])
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null); // For the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assistanceForms, setAssistanceForms] = useState([]);
  const [isAssistanceDialogOpen, setAssitanceIsDialogOpen] = useState(false);
  const [selectedAssistanceForm, setSelectedAssistanceForm] = useState(null);


  // Fetch data from Firestore
  const fetchContacts = async () => {
    try {
      const contactRef = collection(db, 'contact');
      const snapshot = await getDocs(contactRef);
      const contactsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      toast.error('Failed to fetch contacts.');
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const userRef = collection(db, 'users');
      const snapshot = await getDocs(userRef);
      const usersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Users:', err);
      toast.error('Failed to fetch Users.');
      setLoading(false);
    }
  };

  const fetchAssistanceForms = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'userassistance'));
      setAssistanceForms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      toast.error('Failed to fetch assistance forms.');
    }
  };
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"))
      const projectData = []

      for (const docSnapshot of querySnapshot.docs) {
        const project = { id: docSnapshot.id, ...docSnapshot.data() }

        const blogContentRef = collection(db, "projects", docSnapshot.id, "blog_content")
        const blogContentSnapshot = await getDocs(blogContentRef)
        const blogContentData = blogContentSnapshot.docs.map((doc) => doc.data())[0]

        const blogContent = {
          components: blogContentData?.components || '',
          circuit: blogContentData?.circuit || '',
          about_circuit: blogContentData?.about_circuit || '',
          about_programming: blogContentData?.about_programming || '',
          conclusion: blogContentData?.conclusion || '',
          conclusion_images: blogContentData?.conclusion_images || '',
          programming: blogContentData?.programming || '',
          resources: blogContentData?.resources || '',
        }

        project.blogContent = blogContent
        projectData.push(project)
      }

      setProjects(projectData)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast.error("Failed to fetch projects.")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "project_categories"))
      const categoryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category || "Unnamed Category",
      }))
      setCategories(categoryData)
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Failed to fetch categories.")
    }
  }

  const fetchAuthors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "authors"))
      const authorData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        author: doc.data().author || "Unnamed author",
      }))
      setAuthor(authorData)
    } catch (error) {
      console.error("Error fetching authors:", error)
      toast.error("Failed to fetch authors.")
    }
  }
  // Delete contact
  const handleDelete = async (id) => {
    alert("you can't delete contacts/forms for now.")
    // try {

    //     await deleteDoc(doc(db, 'contact', id));
    //     toast.success('Contact deleted successfully.');
    //     setContacts(contacts.filter((contact) => contact.id !== id));
    // } catch (err) {
    //     console.error('Error deleting contact:', err);
    //     toast.error('Failed to delete contact.');
    // }
  };

  // Open dialog and set the selected contact
  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };
  const handleAssistanceRowClick = (form) => {
    setSelectedAssistanceForm(form); // Use the setter function here
    setAssitanceIsDialogOpen(true);
  };

  useEffect(() => {


    fetchCategories()
    fetchAuthors()
    fetchProjects()
    fetchContacts();
    fetchUsers();
    fetchAssistanceForms();
  }, [])

  const handleAddProject = async () => {
    setLoading(true)
    try {
      const projectDocRef = await addDoc(collection(db, "projects"), {
        title: newProject.title,
        category: newProject.category,
        image: newProject.image || "/default-project-cover.jpg",
        description: newProject.description,
        duration: newProject.duration,
        enrolled: newProject.enrolled,
        author: newProject.author,
        requirements: newProject.requirements,
      })

      const blogContentRef = collection(db, "projects", projectDocRef.id, "blog_content")
      await addDoc(blogContentRef, newProject.blogContent)

      setProjects((prev) => [...prev, { ...newProject, id: projectDocRef.id }])
      setNewProject({
        id: '',
        title: "",
        category: "",
        image: "",
        description: "",
        duration: "",
        enrolled: "",
        author: "",
        requirements: "",
        blogContent: {
          components: "",
          circuit: "",
          about_circuit: "",
          about_programming: "",
          conclusion: "",
          conclusion_images: "",
          programming: "",
          resources: "",
        },
      })
      toast.success("Project and blog content added successfully!")
    } catch (error) {
      console.error("Error adding project:", error)
      toast.error("Failed to add project.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editingProject) return

    setLoading(true)
    try {
      const projectRef = doc(db, "projects", editingProject.id)
      await updateDoc(projectRef, {
        title: editingProject.title,
        category: editingProject.category,
        image: editingProject.image,
        description: editingProject.description,
        duration: editingProject.duration,
        enrolled: editingProject.enrolled,
        author: editingProject.author,
        requirements: editingProject.requirements,
      })

      const blogContentRef = collection(db, "projects", editingProject.id, "blog_content")
      const blogContentSnapshot = await getDocs(blogContentRef)
      const blogContentDocRef = blogContentSnapshot.docs[0]?.ref

      const blogContentToUpdate = editingProject.blogContent

      if (blogContentDocRef) {
        await updateDoc(blogContentDocRef, blogContentToUpdate)
      } else {
        await addDoc(blogContentRef, blogContentToUpdate)
      }

      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id ? editingProject : project
        )
      )
      setEditingProject(null)
      toast.success("Project updated successfully!")
    } catch (error) {
      console.error("Error updating project:", error)
      toast.error("Failed to update project.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId) => {
    setLoading(true)
    try {
      await deleteDoc(doc(db, "projects", projectId))

      const blogContentRef = collection(db, "projects", projectId, "blog_content")
      const blogContentSnapshot = await getDocs(blogContentRef)
      const deletePromises = blogContentSnapshot.docs.map((doc) => deleteDoc(doc.ref))
      await Promise.all(deletePromises)

      setProjects((prev) => prev.filter((project) => project.id !== projectId))
      toast.success("Project deleted successfully!")
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Failed to delete project.")
    } finally {
      setLoading(false)
    }
  }

  const handleContentChange = (fieldName, newContent, isEditing = false) => {
    if (isEditing) {
      setEditingProject((prev) => ({
        ...prev,
        [fieldName]: newContent,
      }))
    } else {
      setNewProject((prev) => ({
        ...prev,
        [fieldName]: newContent,
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Panel: Manage Projects and Blog Content</h1>
      <Tabs defaultValue="add" className="mb-8">
        <TabsList>
          <TabsTrigger value="add">Add New Project</TabsTrigger>
          <TabsTrigger value="list">Project List</TabsTrigger>
          <TabsTrigger value="viewproject">View Project</TabsTrigger>
        </TabsList>

        <TabsList className="float-end">
          <TabsTrigger value="contact">Contacts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="assistantforms">Assistance Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>Fill in the details to add a new project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProject.category}
                    onValueChange={(value) => setNewProject((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="Project Image URL"
                    value={newProject.image}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditor
                    content={newProject.description}
                    onChange={(content) => handleContentChange('description', content)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="Project Duration"
                    value={newProject.duration}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select
                    value={newProject.author}
                    onValueChange={(value) => setNewProject((prev) => ({ ...prev, author: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project Author" />
                    </SelectTrigger>
                    <SelectContent>
                      {author.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Input
                    id="requirements"
                    placeholder="Project Requirements"
                    value={newProject.requirements}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, requirements: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Blog Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(newProject.blogContent).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{key.replace('_', ' ').charAt(0).toUpperCase() + key.slice(1)}</Label>
                      <RichTextEditor
                        content={value}
                        onChange={(content) => handleContentChange(`blogContent.${key}`, content)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddProject}>Add Project</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    {categories.find(c => c.id === project.category)?.category || "Unknown Category"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    width={200}
                    height={300}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2">Duration: {project.duration}</p>
                  <p className="text-sm text-gray-600 mb-2">Author: {author.find(a => a.id === project.author)?.author || "Unknown Author"}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Blog Content Preview:</h4>
                    <div className="text-sm text-gray-600 truncate" dangerouslySetInnerHTML={{ __html: project.blogContent.components }} />
                    <div className="text-sm text-gray-600 truncate" dangerouslySetInnerHTML={{ __html: project.blogContent.circuit }} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setEditingProject(project)}>Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>Make changes to your project here. Click save when you are done.</DialogDescription>
                      </DialogHeader>
                      {editingProject && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editingProject.title}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                              value={editingProject.category}
                              onValueChange={(value) => setEditingProject((prev) => ({ ...prev, category: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Project Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                              id="edit-image"
                              value={editingProject.image}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev, image: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <RichTextEditor
                              content={editingProject.description}
                              onChange={(content) => handleContentChange('description', content, true)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-duration">Duration</Label>
                            <Input
                              id="edit-duration"
                              value={editingProject.duration}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev, duration: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-enrolled">Enrolled</Label>
                            <Input
                              id="edit-enrolled"
                              value={editingProject.enrolled}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev, enrolled: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-author">Author</Label>
                            <Select
                              value={editingProject.author}
                              onValueChange={(value) => setEditingProject((prev) => ({ ...prev, author: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Project Author" />
                              </SelectTrigger>
                              <SelectContent>
                                {author.map((author) => (
                                  <SelectItem key={author.id} value={author.id}>
                                    {author.author}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-requirements">Requirements</Label>
                            <Input
                              id="edit-requirements"
                              value={editingProject.requirements}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev, requirements: e.target.value }))}
                            />
                          </div>
                          {Object.entries(editingProject.blogContent).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <Label htmlFor={`edit-${key}`}>{key.replace('_', ' ').charAt(0).toUpperCase() + key.slice(1)}</Label>
                              <RichTextEditor
                                content={value}
                                onChange={(content) => handleContentChange(`blogContent.${key}`, content, true)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the project
                          and all of its associated data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="viewproject">
          <Card>
            <CardHeader>
              <CardTitle>Project Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-3/4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h1 className="text-4xl font-bold mb-4">{newProject.title || "Project Title"}</h1>
                      <div className="flex flex-row justify-between mb-6">
                        <div className="">
                          <div className="flex items-center mb-4">
                            <Avatar className="h-10 w-10 mr-2">
                              <AvatarImage src="/placeholder-avatar.jpg" alt={author.find(a => a.id === newProject.author)?.author || 'Unknown Author'} />
                              <AvatarFallback>{(author.find(a => a.id === newProject.author)?.author || 'U')[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{author.find(a => a.id === newProject.author)?.author || 'Unknown Author'}</p>
                              <p className="text-sm text-muted-foreground">Author</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {newProject.duration || "Project Duration"} min read
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {newProject.enrolled || "Enrolled count"}
                            </Badge>
                            <Badge variant="secondary">Category: {categories.find(c => c.id === newProject.category)?.category || "Unknown Category"}</Badge>
                          </div>
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
                          src={newProject.image || "/default-project-cover.jpg"}
                          alt={newProject.title || "Project Title"}
                          width={1200}
                          height={600}
                          className="w-full h-64 object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </Card>
                    </motion.div>
                    <Tabs defaultValue="content" className="mb-8">
                      <TabsList>
                        <TabsTrigger value="content">Project</TabsTrigger>
                        <TabsTrigger value="overview">Requirements</TabsTrigger>
                        <TabsTrigger value="files">Files</TabsTrigger>
                      </TabsList>
                      <TabsContent value="content">
                        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                          <section id="overview" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.description || "Add a description for the project." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="components" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Components</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.components || "List the project components." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="circuit" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Circuit</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.circuit || "Describe the circuit here." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="about-circuit" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">About Circuit</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.about_circuit || "Provide information about the circuit." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="about-programming" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">About Programming</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.about_programming || "Explain the programming aspects." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="programming" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Programming</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.programming || "Provide programming details." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="conclusion" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.conclusion || "Add conclusion here." }} />
                          </section>
                          <Separator className="my-8" />
                          <section id="conclusion-images" className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Conclusion Images</h2>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.blogContent.conclusion_images || "Add conclusion images here." }} />
                          </section>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="overview">
                        <Card>
                          <CardHeader>
                            <CardTitle>Requirements</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newProject.requirements || "No requirements specified." }} />
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="files">
                        <Card>
                          <CardHeader>
                            <CardTitle>Get all the code files & libraries</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className={`flex flex-row gap-2 bg-secondary px-4 py-2 w-fit rounded-sm cursor-pointer`}>
                              <Link href={(new DOMParser().parseFromString(newProject.blogContent.resources || '', 'text/html').body.textContent || '').trim()}>
                                Download Files ↗️
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </main>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Forms Submitted by users</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : contacts.length === 0 ? (
                <p>No contacts found.</p>
              ) : (
                <Table>
                  {/* <TableCaption>List of submitted contact forms.</TableCaption> */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.message ? contact.message.slice(0, 20) : "No message"}...</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" onClick={() => handleRowClick(contact)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          {/* Dialog to show contact details */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Details</DialogTitle>
              </DialogHeader>
              {selectedContact && (
                <div className="space-y-4">
                  <p>
                    <strong>Name:</strong> {selectedContact.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedContact.email}
                  </p>
                  <p>
                    <strong>Message:</strong> {selectedContact.message}
                  </p>
                  <p>
                    <strong>Submitted on:</strong> {new Date(selectedContact.timestamp?.toDate()).toLocaleString()}
                  </p>
                  <p>
                    <Button className="bg-transparent text-red-600" onClick={handleDelete}>

                      <Delete />Delete

                    </Button>

                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Users on QnaGenius</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <Table>
                  {/* <TableCaption>List of submitted contact forms.</TableCaption> */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell></TableCell>
                        {/* <TableCell className="text-right">
                                                    <Button variant="outline" onClick={() => handleRowClick(user)}>
                                                        View Details
                                                    </Button>
                                                </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="assistantforms">
          <Card>
            <CardHeader>
              <CardTitle>Assistance Forms</CardTitle>
              <CardDescription>Requests for Assistance</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : assistanceForms.length === 0 ? (
                <p>No assistance forms found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Submitted on</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assistanceForms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell>{form.name}</TableCell>
                        <TableCell>{form.email}</TableCell>
                        <TableCell>{form.contact}</TableCell>
                        <TableCell>
                          {form.timestamp
                            ? new Date(form.timestamp.seconds * 1000).toLocaleString()
                            : 'No timestamp'}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleAssistanceRowClick(form)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Dialog to show full form details */}
          <Dialog open={isAssistanceDialogOpen} onOpenChange={setAssitanceIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assistance Form Details</DialogTitle>
              </DialogHeader>
              {selectedAssistanceForm && (
                <div className="space-y-4">
                  <p>
                    <strong>Name:</strong> {selectedAssistanceForm.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedAssistanceForm.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedAssistanceForm.contact}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedAssistanceForm.description}
                  </p>
                  <p>
                    <strong>Submitted on:</strong> {new Date(selectedAssistanceForm.timestamp?.seconds * 1000).toLocaleString()}
                  </p>
                  <p>
                    <Button className="bg-transparent text-red-600" onClick={handleDelete}>
                      <Trash2 /> Delete
                    </Button>
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

      </Tabs>

    </div>
  )
}

export default AdminHome


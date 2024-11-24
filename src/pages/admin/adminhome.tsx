import React, { useState, useEffect } from "react"
import { db } from "@/app/db/firebase.config"
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Loader2, Trash2 } from 'lucide-react'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/components/ui/select';

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { RichTextEditor } from "@/app/components/RichTextEditor"
import Image from "next/image"

// Define the types
interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  enrolled: string;
  instructor: string;
  requirements: string;
  blogContent: FirestoreBlogContent; // Ensure blogContent is always of type BlogContent
}

// Define your types
type FirestoreBlogContent = {
  components: string;
  circuit: string;
  about_circuit: string;
  about_programming: string;
  conclusion: string;
  conclusion_images: string;
  programming: string;
};

 // eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogContent extends FirestoreBlogContent {
  // Placeholder to satisfy ESLint
  _futureExtension?: never;
  
}


interface Category {
  id: string;
  name: string;
}
interface Author {
  id: string;
  name: string;
}
const AdminHome: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: "",
    category: "",
    image: "",
    description: "",
    duration: "",
    enrolled: "",
    instructor: "",
    requirements: "",
    blogContent: {
      components: "",
      circuit: "",
      about_circuit: "",
      about_programming: "",
      conclusion: "",
      conclusion_images: "",
      programming: "",
    },
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const [categories, setCategories] = useState<Category[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"))
        const projectData: Project[] = []

        for (const docSnapshot of querySnapshot.docs) {
          const project = { id: docSnapshot.id, ...docSnapshot.data() } as Project

          const blogContentRef = collection(db, "projects", docSnapshot.id, "blog_content")
          const blogContentSnapshot = await getDocs(blogContentRef)
          const blogContentData = blogContentSnapshot.docs.map((doc) => doc.data())[0]

          // Ensure blogContent matches the BlogContent type with default empty values
          const blogContent: BlogContent = {
            components: blogContentData?.components || '',
            circuit: blogContentData?.circuit || '',
            about_circuit: blogContentData?.about_circuit || '',
            about_programming: blogContentData?.about_programming || '',
            conclusion: blogContentData?.conclusion || '',
            conclusion_images: blogContentData?.conclusion_images || '',
            programming: blogContentData?.programming || '',
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
        const querySnapshot = await getDocs(collection(db, "project_categories"));
        const categoryData: Category[] = [];

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          categoryData.push({
            id: doc.id,   // Firebase document ID
            name: data.category || "Unnamed Category",  // Provide a fallback if 'name' is missing
          });
        });

        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    const fetchAuthors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "authors"));
        const authorData: Author[] = [];

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          authorData.push({
            id: doc.id,   // Firebase document ID
            name: data.author || "Unnamed author",  // Provide a fallback if 'name' is missing
          });
        });

        setAuthor(authorData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };


    fetchCategories();
    fetchAuthors();
    fetchProjects();
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
        instructor: newProject.instructor,
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
        instructor: "",
        requirements: "",
        blogContent: {
          components: "",
          circuit: "",
          about_circuit: "",
          about_programming: "",
          conclusion: "",
          conclusion_images: "",
          programming: "",
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
    if (!editingProject) return;

    setLoading(true);
    try {
      const projectRef = doc(db, "projects", editingProject.id);
      await updateDoc(projectRef, {
        title: editingProject.title,
        category: editingProject.category,
        image: editingProject.image,
        description: editingProject.description,
        duration: editingProject.duration,
        enrolled: editingProject.enrolled,
        instructor: editingProject.instructor,
        requirements: editingProject.requirements,
      });

      const blogContentRef = collection(db, "projects", editingProject.id, "blog_content");
      const blogContentSnapshot = await getDocs(blogContentRef);
      const blogContentDocRef = blogContentSnapshot.docs[0]?.ref;

      // Using the FirestoreBlogContent type instead of any
      const blogContentToUpdate: FirestoreBlogContent = editingProject.blogContent;

      if (blogContentDocRef) {
        await updateDoc(blogContentDocRef, blogContentToUpdate);
      } else {
        await addDoc(blogContentRef, blogContentToUpdate);
      }

      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id ? editingProject : project
        )
      );
      setEditingProject(null);
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteProject = async (projectId: string) => {
    setLoading(true)
    try {
      // Delete the main project document
      await deleteDoc(doc(db, "projects", projectId))

      // Delete the associated blog content
      const blogContentRef = collection(db, "projects", projectId, "blog_content")
      const blogContentSnapshot = await getDocs(blogContentRef)
      const deletePromises = blogContentSnapshot.docs.map((doc) => deleteDoc(doc.ref))
      await Promise.all(deletePromises)

      // Update the local state
      setProjects((prev) => prev.filter((project) => project.id !== projectId))
      toast.success("Project deleted successfully!")
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Failed to delete project.")
    } finally {
      setLoading(false)
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
                  {loading ? (
                    <p>Loading categories...</p>
                  ) : (
                    <Select
                      id="category"
                      value={newProject.category}
                      onValueChange={(value) => setNewProject((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
                    onChange={(content) => setNewProject((prev) => ({ ...prev, description: content }))}
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
                  <Label htmlFor="instructor">Instructor</Label>
                  {loading ? (
                    <p>Loading categories...</p>
                  ) : (
                    <Select
                      id="author"
                      value={newProject.author}
                      onValueChange={(value) => setNewProject((prev) => ({ ...prev, author: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project author" />
                      </SelectTrigger>
                      <SelectContent>
                        {author.map((author) => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
                        onChange={(content) =>
                          setNewProject((prev) => ({
                            ...prev,
                            blogContent: { ...prev.blogContent, [key]: content },
                          }))
                        }
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
                  <CardDescription>{project.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    width={200}
                    height={300}
                    src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Duration: {project.duration}</p>
                  {/* <p className="text-sm text-gray-600 mb-2">Enrolled: </p> */}
                  <p className="text-sm text-gray-600 mb-2">Instructor: {project.instructor}</p>
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
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, title: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Input
                              id="edit-category"
                              value={editingProject.category}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, category: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                              id="edit-image"
                              value={editingProject.image}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, image: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <RichTextEditor
                              content={editingProject.description}
                              onChange={(content) => setEditingProject((prev) => ({ ...prev!, description: content }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-duration">Duration</Label>
                            <Input
                              id="edit-duration"
                              value={editingProject.duration}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, duration: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-enrolled">Enrolled</Label>
                            <Input
                              id="edit-enrolled"
                              value={editingProject.enrolled}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, enrolled: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-instructor">Instructor</Label>
                            <Input
                              id="edit-instructor"
                              value={editingProject.instructor}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, instructor: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-requirements">Requirements</Label>
                            <Input
                              id="edit-requirements"
                              value={editingProject.requirements}
                              onChange={(e) => setEditingProject((prev) => ({ ...prev!, requirements: e.target.value }))}
                            />
                          </div>
                          {Object.entries(editingProject.blogContent).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <Label htmlFor={`edit-${key}`}>{key.replace('_', ' ').charAt(0).toUpperCase() + key.slice(1)}</Label>
                              <RichTextEditor
                                content={value}
                                onChange={(content) =>
                                  setEditingProject((prev) => ({
                                    ...prev!,
                                    blogContent: { ...prev!.blogContent, [key]: content },
                                  }))
                                }
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
      </Tabs>
    </div>
  )
}

export default AdminHome


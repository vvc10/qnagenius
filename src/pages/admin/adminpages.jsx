'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/app/db/firebase.config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/app/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import { Delete, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog"

const AdminPages = () => {
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        fetchContacts();
        fetchUsers();
        fetchAssistanceForms();
    }, []);

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
    
    return (
        <>
            <TabsList className="float-end">
                <TabsTrigger value="contact">Contacts</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="assistantforms">Assistance Forms</TabsTrigger>
            </TabsList>

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

        </>
    );
};

export default AdminPages;

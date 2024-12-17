import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { useForm } from "react-hook-form";
import { db } from "@/app/db/firebase.config"; // Path to your firebase config
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";


const AssistantForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            contact_number: "",
            description: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const docRef = await addDoc(collection(db, "userassistance"), {
                name: data.username,
                email: data.email,
                contact: data.contact_number,
                description: data.description,
                timestamp: new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Form Submitted and Saved Successfully!");
            setIsDialogOpen(false); 
            form.reset();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting the form. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Dialog className="z-[9000]" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                    <Button
                        size="lg"
                        className="min-w-[200px] h-12 text-lg"
                    >
                        Get Assistant
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="sm:max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-center">
                            Get Complete Personalized Assistance
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter your contact number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write about your project or assistance needed.."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AssistantForm;

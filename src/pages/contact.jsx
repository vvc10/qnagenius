import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button'; // Assuming Button from ShadCN UI
import { Input } from '@/app/components/ui/input'; // Assuming Input from ShadCN UI
import { Textarea } from '@/app/components/ui/textarea'; // Assuming Textarea from ShadCN UI
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/db/firebase.config'; // Path to your Firebase config

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactCollection = collection(db, 'contact');

    try {
      await addDoc(contactCollection, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      console.error('Error saving contact details to Firestore:', err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-secondary/10 ${isDark ? 'dark' : ''}`}>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">Contact Us</h2>
            <p className="max-w-[85%] my-2 mx-auto text-muted-foreground sm:text-lg sm:leading-7">
              Have a question or feedback? We&apos;d love to hear from you! Fill out the form below, and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-8 rounded-md"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>

              {submitSuccess && (
                <div className="text-green-600 text-center mt-4">Your message has been sent successfully!</div>
              )}
              {submitError && (
                <div className="text-red-600 text-center mt-4">Oops! Something went wrong. Please try again later.</div>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;

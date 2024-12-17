"use client";

import { motion } from "framer-motion";
import { Code2, Globe2, Rocket, Users2 } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Advanced Development",
    description: "Access cutting-edge tools and frameworks to build sophisticated applications.",
  },
  {
    icon: Globe2,
    title: "Global Impact",
    description: "Create solutions that address real-world challenges and make a difference.",
  },
  {
    icon: Users2,
    title: "Community Driven",
    description: "Join a thriving community of developers, mentors, and industry experts.",
  },
  {
    icon: Rocket,
    title: "Career Launch",
    description: "Build a portfolio that showcases your skills and launches your career.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/5">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform provides all the tools and resources you need to turn your ideas into reality
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <feature.icon className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
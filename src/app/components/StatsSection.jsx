"use client";

import { motion } from "framer-motion";
import { Award, Users, Code, GitPullRequest } from "lucide-react";

const stats = [
  { icon: Users, value: "5k+", label: "Active Users" },
  { icon: Code, value: "50+", label: "Projects Created" },
  { icon: Award, value: "100+", label: "Success Stories" },
  { icon: GitPullRequest, value: "1k+", label: "Contributions" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 text-center"
            >
              <stat.icon className="w-8 h-8 mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
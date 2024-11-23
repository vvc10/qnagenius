import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 mx-auto">
                <div className="flex-1 space-y-4">
                    <div className="text-xl font-bold">LearnHub</div>
                    <p className="text-sm text-muted-foreground">
                        Making education accessible to everyone, everywhere.
                    </p>
                </div>
                {[
                    {
                        title: "Product",
                        items: ["Courses", "Pricing", "Features", "Updates"],
                    },
                    {
                        title: "Company",
                        items: ["About", "Blog", "Careers", "Press"],
                    },
                    {
                        title: "Legal",
                        items: ["Terms", "Privacy", "Guidelines", "Licensing"],
                    },
                ].map((section) => (
                    <div key={section.title} className="flex-1 space-y-4">
                        <h4 className="text-sm font-medium">{section.title}</h4>
                        <nav className="flex flex-col gap-2">
                            {section.items.map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-sm hover:text-primary text-muted-foreground"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>
                ))}
            </div>
        </footer>
    )
}

export default Footer

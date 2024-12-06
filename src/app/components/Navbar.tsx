import React from 'react';
import { Button } from "@/app/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet";
import { Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

// Define props interface
interface NavbarProps {
    isDark: boolean;
    toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleDarkMode }) => {
    return (
        <header className="sticky top-0 z-50 w-full px-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-1 md:px-2 flex h-16 items-center w-full">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle className='text-left'>Qnagenius</SheetTitle>
                        </SheetHeader>
                        <nav className="grid gap-4 py-4">
                            {["Projects", "About", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="text-sm font-medium hover:text-primary"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-xl">QnaGenius</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium hidden lg:flex">
                    {["Projects", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="transition-colors hover:text-primary"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center ml-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2"
                        onClick={toggleDarkMode}
                    >
                        {isDark ? <span className="h-5 w-5" >☀️</span> : <span className="h-5 w-5" >🌒</span>}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <Button className="hidden lg:flex">Get Help </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

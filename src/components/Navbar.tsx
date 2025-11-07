// src/components/Navbar.tsx
import SignInButton from "@/components/SignInButton";
import Link from "next/link";
import React from "react";

import { getAuthSession } from "@/lib/nextauth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

import AdminToggleButton from "./Admin/AdminToggleButton";
// Import needed components/utilities for the new link
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Navbar = async () => {
  const session = await getAuthSession();
  
  // Check if the user is logged in AND their email matches the admin email
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const isAdmin = session?.user?.email === ADMIN_EMAIL;
    
  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Moneta
          </p>
        </Link>
        
        <div className="flex items-center gap-2">

            {/* Conditional Admin/Dashboard Toggle Button */}
            <AdminToggleButton isAdmin={isAdmin} />
            
            {/* NEW: Subtle About Us Link (before Theme Toggle) */}
            <Link 
                href="/about" 
                className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-muted-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700 h-9 px-3"
                )}
            >
                About Us
            </Link>

            {/* Theme Toggle Button */}
            <ThemeToggle className="mr-3" />
            
            {/* User Profile Dropdown */}
            <div className="flex items-center">
                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ) : (
                    <SignInButton text="Sign In" />
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
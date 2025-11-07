// src/components/Admin/AdminToggleButton.tsx
"use client";

import React from 'react';
import Link from 'next/link';
// We need this hook to check the current URL path
import { usePathname } from 'next/navigation'; 

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
    isAdmin: boolean;
};

const AdminToggleButton = ({ isAdmin }: Props) => {
    // Only render the button if the user is authenticated as an admin
    if (!isAdmin) return null;

    const pathname = usePathname();
    const isShowingAdmin = pathname === '/admin';

    // Determine link and text based on the current page
    const href = isShowingAdmin ? '/dashboard' : '/admin';
    const text = isShowingAdmin ? 'Dashboard' : 'Admin Console';
    
    // Apply styling: Red for 'Admin Console' button, Blue for 'Dashboard' button
    const variantClass = isShowingAdmin ? 
        // When on Admin Page, show Dashboard link (BLUE colour - using primary variant styling)
        "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90" : 
        // When on any other page, show Admin Console link (destructive/red colour)
        "bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/70 dark:hover:bg-destructive/90";

    return (
        <Link 
            href={href} 
            className={cn(
                buttonVariants({ size: "default" }), 
                variantClass,
                "transition-all mr-3" 
            )}
        >
            {text}
        </Link>
    );
};

export default AdminToggleButton;
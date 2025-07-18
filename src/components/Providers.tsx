"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

const Providers = ({ children }: ThemeProviderProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
        
    )
}

export default Providers;
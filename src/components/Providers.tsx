"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, ThemeProviderProps } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

const Providers = ({ children }: ThemeProviderProps) => {
    return (
        <QueryClientProvider client = {queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
        </QueryClientProvider>
        
        
    )
}

export default Providers;
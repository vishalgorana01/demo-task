"use client";
import "./globals.css";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

//shadcn
import { Toaster } from "@/components/ui/toaster";
import SideBarComponent from "@/components/sideBarComponent";

//for next-theme
import {  ThemeProvider as ThemeProviderContext } from '@/context/theme-context';
import { ThemeProvider } from "@/components/theme-provider";


export default function RootLayout({ children }: { children: React.ReactNode }) {  
  return (
  <html lang="en" suppressHydrationWarning >
    <head>
      <title>Task Management</title>
    </head>
    <body className='m-0 p-0 '>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem> 
        <ThemeProviderContext>
        <div 
          className={cn(
            "rounded-md flex flex-1 flex-col md:flex-row bg-zinc-200 dark:bg-zinc-900 w-full max-w-full border border-neutral-200 dark:border-neutral-700 overflow-hidden",
            "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
          )}
        >
          <SideBarComponent/>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <Toaster />
        </div>
        </ThemeProviderContext> 
      </ThemeProvider>

    </body>
  </html>
  );
}

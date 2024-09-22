"use client";
import "./globals.css";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

//shadcn
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

//components
import { Logo, LogoIcon } from "@/components/sideBarComponent";
import ProtectedRoute from '@/components/auth/ProtectedRoute';

//for next-theme
import {  ThemeProvider as ThemeProviderContext } from '@/context/theme-context';
import { ThemeProvider } from "@/components/theme-provider";
import {HomeIcon, ListTodoIcon, Columns3Icon } from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle";




export default function DashboardLayout({ children }: { children: React.ReactNode }) {


  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <HomeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: "Task List",
      href: "/task-list",
      icon: (
        <ListTodoIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Kanban Board",
      href: "/kanban",
      icon: (
        <Columns3Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
  ];
  const [open, setOpen] = useState(false);
  return (
  <html lang="en" suppressHydrationWarning >
    <head>
      <title>Task Management</title>
    </head>
    <body className='m-0 p-0 '>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div 
          className={cn(
            "rounded-md flex flex-1 flex-col md:flex-row bg-gray-100 dark:bg-zinc-900 w-full max-w-full border border-neutral-200 dark:border-neutral-700 overflow-hidden",
            "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
          )}
        >
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>

              {/* Dark-Light Mode */}
              <div className="flex align-center flex-start ">
                <ThemeProviderContext>
                  <ThemeToggle/>
                </ThemeProviderContext>
              </div>
              
              <div>
                <SidebarLink
                  link={{
                    label: "Manu Arora",
                    href: "#",
                    icon: (
                      <Image
                        src="https://assets.aceternity.com/manu.png"
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
          <Toaster />
        </div> 
      </ThemeProvider>

    </body>
  </html>
  );
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

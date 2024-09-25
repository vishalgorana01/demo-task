'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const router = useRouter()
  

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'login' | 'signup')
    router.push(`/${value}`)
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-[350px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one.</CardDescription>
          </div>
          
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="login"
                className={`${activeTab === 'login' ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800' : ''} transition-colors`}
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className={`${activeTab === 'signup' ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800' : ''} transition-colors`}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              {activeTab === 'login' && children}
            </TabsContent>
            <TabsContent value="signup">
              {activeTab === 'signup' && children}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
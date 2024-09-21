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
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in to your account or create a new one.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
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
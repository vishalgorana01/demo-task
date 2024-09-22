'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token)
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })
        router.push('/')
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: data.message || "Invalid credentials",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "An unexpected error occurred",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background text-foreground"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="bg-background text-foreground"
        />
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "Please log in with your new account",
        })
        router.push('/login')
      } else {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: data.message || "Unable to create account",
        })
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Signup Error",
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
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
  )
}
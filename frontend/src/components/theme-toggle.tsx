'use client'

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from 'lucide-react'
import { useThemeContext } from '@/context/theme-context'

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <MoonIcon className=" text-neutral-700 dark:text-neutral-200 h-5 w-5" /> : <SunIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
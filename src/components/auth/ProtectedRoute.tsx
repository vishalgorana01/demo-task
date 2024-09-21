'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Replacing useRouter with the modern Next.js hook
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Used to access the current route

  useEffect(() => {
    console.log(isLoading, isAuthenticated);
    if (!isLoading && !isAuthenticated ) {
      router.replace('/login'); // Redirects and includes current route for better UX
    }
  }, [isLoading, isAuthenticated]);
  
  if (isLoading) {
    return <div>Loading...</div>; // Optional: replace with a loading spinner
  }

  // return isAuthenticated ? <>{children}</> : null;
  return <>{children}</> 
};

export default ProtectedRoute;

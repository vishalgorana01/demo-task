'use client';

import { useEffect } from 'react';
import { useRouter} from 'next/navigation'; 
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter(); 

  useEffect(() => {
    console.log(isLoading, isAuthenticated);
    if (!isLoading && !isAuthenticated ) {
      router.replace('/login'); 
    }
  }, [isLoading, isAuthenticated]);
  
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</> 
};

export default ProtectedRoute;

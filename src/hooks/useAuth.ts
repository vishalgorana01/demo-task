
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Modern router
import {jwtDecode} from 'jwt-decode'; // Optional: Validate JWT token structure client-side

// type DecodedToken = {
//   exp?: number; // Marking exp as optional in case it's missing
// };

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null; // Prevent SSR issues

      if (token) {
        try {
          // Optionally, decode the JWT on the client to check expiration
          const decodedToken = jwtDecode(token);
          if(!decodedToken){
            return;
          }
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp && (decodedToken.exp < currentTime)) {
            throw new Error('Token expired');
          }

          // Verify token with the backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_ADDR}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            throw new Error('Token invalid');
          }
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
          router.replace('/login');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
};

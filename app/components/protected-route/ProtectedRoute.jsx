"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
  // Initialize isAuthenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get the router object
  const router = useRouter();

  useEffect(() => {
    // Check if the code is running in the browser environment
    if (typeof window !== 'undefined') {
      // Parse the stored user information from localStorage
      const storedUser = localStorage.getItem('user');

      // Update isAuthenticated state based on the stored user information
      setIsAuthenticated(JSON.parse(storedUser));
    }
  }, []); // Run this effect only once after the initial render

  // Redirect to the home page if not authenticated
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  // Render the children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;


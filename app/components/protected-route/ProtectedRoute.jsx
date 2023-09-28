import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();


  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

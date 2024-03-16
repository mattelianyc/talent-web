// pages/dashboard.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../redux/store/store'; // Adjust the path as needed
import { logout } from '../redux/slices/userSlice'; // Adjust the import path to your logout action

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push('/auth/login'); // Redirect to the login page
  };

  // Redirect to the login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
        <p className="mt-4">You are now logged in!</p>
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

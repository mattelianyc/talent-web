import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import Link from 'next/link';
import { AppDispatch } from '@/redux/store/store';
import Router, { useRouter } from 'next/router';


interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'regular' | 'talent';
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'regular',
  });

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
  
    dispatch(registerUser({
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
    }))
      .unwrap()
      .then(() => {
        // Redirect to the dashboard after successful registration
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Registration error', error);
        // Handle registration error (e.g., show an error message)
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="userType" className="text-sm font-medium text-gray-700">I am registering as a:</label>
            <select
              name="userType"
              id="userType"
              value={formData.userType}
              onChange={handleChange}
              className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="regular">Regular User</option>
              <option value="talent">Talent</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

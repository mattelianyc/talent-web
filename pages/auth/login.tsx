import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice'; // Ensure this path is correct
import { AppDispatch } from '../../redux/store/store';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('form data ', formData)
    e.preventDefault();
    dispatch(loginUser(formData));
  };


  useEffect(() => {
    console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL);

  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-6 text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 text-gray-700 bg-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

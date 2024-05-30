import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useAuth } from './AuthContext';
import AuthService from './AuthService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const role = await AuthService.signup(formData);
    setLoading(false);

    if (role) {
      handleLogin(role);
      navigate('/');
    } else {
      console.log('Unsuccessful signup');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {loading ? (
          <div className="flex items-center justify-center">
            <button type="button" className="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
              <div className="flex items-center justify-center m-[10px]"> 
                <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                <div className="ml-2">Processing...Free Hosting<br />Response Takes Time</div>
              </div>
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center border border-gray-300 p-2 rounded-md hover:border-blue-500">
              <MdPerson className="text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 p-2 rounded-md hover:border-blue-500">
              <MdEmail className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 p-2 rounded-md hover:border-blue-500">
              <MdLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 p-2 rounded-md hover:border-blue-500">
              <MdLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Signup
            </button>
            <div className="text-center">
              Already have an account? <Link to="/login" className="text-blue-500">Login</Link> instead.
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Signup;
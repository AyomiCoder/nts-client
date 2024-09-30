import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/passwordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter a valid password');
      return;
    }
    setError('');
    setLoading(true); // Show loader when login starts

    // Login API Call
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/notes');
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please Try again');
      }
    } finally {
      setLoading(false); // Hide loader after the API response
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-16 md:mt-28 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm lg:max-w-md border rounded bg-white px-6 py-8 lg:px-10 lg:py-12">
          <form onSubmit={handleLogin}>
            <h4 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4 lg:mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable input while loading
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 lg:mb-6"
              disabled={loading} // Disable input while loading
            />

            {error && <p className="text-red-500 text-xs lg:text-sm mb-2">{error}</p>}

            {/* Loader or button */}
            {loading ? (
              <div className="flex justify-center py-2 lg:py-3">
                <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </div>
            ) : (
              <button
                type="submit"
                className="btn-primary w-full py-2 lg:py-3 text-sm lg:text-base"
                disabled={loading} // Disable button while loading
              >
                Login
              </button>
            )}

            <p className="text-sm lg:text-base text-center mt-4 lg:mt-6">
              Not registered yet?{' '}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

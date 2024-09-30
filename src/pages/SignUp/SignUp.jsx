import React, { useState } from 'react';
import PasswordInput from '../../components/Input/passwordInput';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    // Signup API Call
    try {
      const response = await axiosInstance.post('/auth/register', {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/notes');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Hide SearchBar in the Navbar for SignUp page */}
      <Navbar />

      <div className="flex items-center justify-center mt-16 md:mt-28 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm lg:max-w-md border rounded bg-white px-6 py-8 lg:px-10 lg:py-12">
          <form onSubmit={handleSignUp}>
            <h4 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box w-full mb-4 lg:mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4 lg:mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 lg:mb-6"
            />

            {error && <p className="text-red-500 text-xs lg:text-sm mb-2">{error}</p>}

            <button type="submit" className="btn-primary w-full py-2 lg:py-3 text-sm lg:text-base">
              Create Account
            </button>

            <p className="text-sm lg:text-base text-center mt-4 lg:mt-6">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

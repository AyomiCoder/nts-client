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
  const [loading, setLoading] = useState(false); // Loader state

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
    setLoading(true); // Start the loader when the sign-up process begins

    try {
      const response = await axiosInstance.post('/auth/register', {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        setLoading(false); // Stop the loader if there's an error
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
    } finally {
      setLoading(false); // Stop the loader when request is complete
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
              disabled={loading} // Disable input during loading
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4 lg:mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable input during loading
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 lg:mb-6"
              disabled={loading} // Disable input during loading
            />

            {error && <p className="text-red-500 text-xs lg:text-sm mb-2">{error}</p>}

            {/* Display loader or button */}
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
                disabled={loading} // Disable button during loading
              >
                Create Account
              </button>
            )}

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

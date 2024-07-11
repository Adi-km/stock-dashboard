import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import '../styles/transition.css'; 
import '../styles/bg.css';


const API_URL = process.env.USER_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [pageLoaded, setPageLoaded] = useState(false); 
  const [formLoaded, setFormLoaded] = useState(false); 
  const [shiftLeft, setShiftLeft] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
      setTimeout(() => {
        setFormLoaded(true);
        // Activate shiftLeft effect only if not on mobile
        if (!isMobileDevice()) {
          setTimeout(() => {
            setShiftLeft(true);
          }, 1000); // Adjust the delay as needed
        }
      }, 500); // Adjust the delay as needed
    }, 500); // Adjust the delay as needed
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true); 
      let email = username;
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem('accessToken', response.data.access_token);
      handleVerifyToken(response.data.access_token);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleVerifyToken = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/verify-token`, config);
      if (response.data.valid) {
        navigate('/');
      } else {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  const isMobileDevice = () => {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };

  return (
    <section className="h-screen relative flex items-center justify-center">
      
      <div className="background-image"></div>
      <div className="black-overlay"></div>
      
      {/* Login form */}
      <div className={`relative z-10 bg-gray-800 p-10 rounded-lg shadow-lg max-w-md w-full max-h-[40rem] md:max-h-[50rem] overflow-y-auto transition-popup ${pageLoaded ? 'active' : ''} ${shiftLeft && !isMobileDevice() ? 'transition-shift shift-left' : ''}`}>
        <h2 className={`text-3xl font-semibold text-white text-center mb-6 transition-opacity ${formLoaded ? 'active' : ''}`}>Login to Your Account</h2>
        <div className="flex flex-col gap-6">
          <input
            className={`text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded transition-opacity ${formLoaded ? 'active' : ''} focus:outline-none focus:border-blue-500`}
            type="text"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={`text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded transition-opacity ${formLoaded ? 'active' : ''} focus:outline-none focus:border-blue-500`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className={`text-red-500 text-sm mt-3 transition-opacity ${formLoaded ? 'active' : ''}`}>{message}</p>
        <div className={`text-center md:text-left mt-6 transition-opacity ${formLoaded ? 'active' : ''}`}>
          <button
            className={`bg-green-400 transition ease-in-out duration-300 hover:bg-green-500 px-6 py-3 text-white uppercase border-2 rounded text-sm tracking-wider w-full font-bold ${isLoading ? 'opacity-50 pointer-events-none' : ''} ${formLoaded ? 'active' : ''}`}
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </div>
        <div className={`mt-4 font-semibold text-sm text-gray-300 text-center md:text-left transition-opacity ${formLoaded ? 'active' : ''}`}>
          Don&apos;t have an account?{' '}
          <Link
            className="text-red-600 hover:underline"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;



















import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

export const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('user', JSON.stringify(user));
      
      // If remember me is checked, store credentials in localStorage
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      toast.success("Welcome back! Successfully signed in.");
      
      // Redirect to home page
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred during sign in';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google response:', credentialResponse); // Debug log
      
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        credential: credentialResponse.credential
      });

      console.log('Backend response:', response.data); // Debug log

      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success("Welcome back! Successfully signed in with Google.");
      navigate('/');
    } catch (err: any) {
      console.error('Google sign-in error:', err); // Debug log
      const errorMessage = err.response?.data?.message || 'Error signing in with Google';
      toast.error(errorMessage);
    }
  };

  const handleGoogleError = () => {
    console.error('Google sign-in failed'); // Debug log
    toast.error("Google sign in was unsuccessful");
  };

  const handleAppleSignIn = async () => {
    try {
      // Initialize Apple Sign In
      const response = await axios.post('http://localhost:5000/api/auth/apple');
      const { url } = response.data;
      
      // Redirect to Apple's sign-in page
      window.location.href = url;
    } catch (err: any) {
      toast.error("Error initiating Apple sign in");
    }
  };

  // Check for remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-slate-950/85 to-slate-950 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[450px] m-4 glass text-white rounded-lg p-8 font-[Montserrat] text-sm">
          <div className="welcome flex flex-col items-start">
            <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
            <p className="text-center text-gray-300 mb-6">
              Don't have an account?
              <Link to="/signup" className="px-1 text-purple-400 hover:underline hover:text-purple-500 transition-all duration-200">Sign up</Link>
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••"
                className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="remember"
                >
                  <input
                    type="checkbox"
                    id="remember"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded shadow border border-gray-500 bg-transparent checked:bg-purple-500"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
                <label
                  className="cursor-pointer ml-2 text-gray-300 text-sm"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-400 hover:underline hover:text-purple-500 transition-all duration-200"
              >
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in to your account'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <span className="w-full h-px bg-gray-600" />
            <span className="px-3 text-gray-400 text-sm">or</span>
            <span className="w-full h-px bg-gray-600" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_black"
                text="signin_with"
                shape="rectangular"
                width="100%"
              />
            </div>
            <button
              type="button"
              onClick={handleAppleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow bg-black text-white font-semibold hover:bg-gray-700 font-[Montserrat]"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
                alt="Apple"
                className="w-4 h-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
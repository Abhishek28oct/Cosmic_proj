import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../utils/api';

interface PasswordStrength {
  score: number;
  feedback: string;
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  let feedback = [];

  if (password.length >= 8) score += 1;
  if (password.match(/[A-Z]/)) score += 1;
  if (password.match(/[a-z]/)) score += 1;
  if (password.match(/[0-9]/)) score += 1;
  if (password.match(/[^A-Za-z0-9]/)) score += 1;

  if (password.length < 8) feedback.push("At least 8 characters");
  if (!password.match(/[A-Z]/)) feedback.push("One uppercase letter");
  if (!password.match(/[a-z]/)) feedback.push("One lowercase letter");
  if (!password.match(/[0-9]/)) feedback.push("One number");
  if (!password.match(/[^A-Za-z0-9]/)) feedback.push("One special character");

  return {
    score,
    feedback: feedback.join(", ")
  };
};

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, feedback: "" });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // Validate password strength
    if (passwordStrength.score < 3) {
      setError("Password is too weak. Please use a stronger password.");
      toast.error("Password is too weak. Please use a stronger password.");
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting signup with:', { username: formData.username, email: formData.email });
      
      const response = await api.post('/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      console.log('Signup response:', response.data);

      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success("Account created successfully! Welcome aboard!");
      
      // Redirect to home page
      navigate('/');
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.message || 'An error occurred during sign up';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-slate-950/85 to-slate-950 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[450px] m-4 glass text-white rounded-lg p-8 font-[Montserrat] text-sm">
          <div className="welcome flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-4">Create Your Account</h2>
            <p className="text-gray-300 mb-6">
              Already have an account?
              <a
                href="/signin"
                className="text-purple-400 hover:underline hover:text-purple-500 transition-all duration-200"
              >
                Sign in
              </a>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="johndoe"
                className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                minLength={3}
              />
            </div>

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
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 rounded-full ${
                          index < passwordStrength.score
                            ? index < 2
                              ? "bg-red-500"
                              : index < 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs mt-1 text-gray-400">
                    {passwordStrength.score < 3
                      ? "Weak password"
                      : passwordStrength.score < 4
                      ? "Medium strength"
                      : "Strong password"}
                  </p>
                  {passwordStrength.feedback && (
                    <p className="text-xs mt-1 text-gray-400">
                      Add: {passwordStrength.feedback}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="••••••••••"
                className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <span className="w-full h-px bg-gray-600" />
            <span className="px-3 text-gray-400 text-sm">or</span>
            <span className="w-full h-px bg-gray-600" />
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow ring-1 ring-gray-500 bg-gray-800/50 text-white font-semibold hover:bg-gray-700"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow bg-black text-white font-semibold hover:bg-gray-700"
            >
              <img
                src="/apple-logo-svgrepo-com.svg"
                alt="Apple"
                className="w-5 h-5 mr-2 invert"
              />
              Sign up with Apple
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
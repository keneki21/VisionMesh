import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, redirect to login
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(data.msg || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen flex relative bg-gray-950 overflow-hidden">
      {/* Cool Background Designs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/60 to-pink-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-cyan-500/65 to-blue-500/55 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/55 to-purple-500/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-[380px] h-[380px] bg-gradient-to-bl from-teal-500/50 to-cyan-400/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}></div>
        
        <div className="absolute top-1/2 left-1/6 w-[350px] h-[350px] bg-gradient-to-br from-fuchsia-600/45 to-purple-600/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/5 right-1/3 w-[420px] h-[420px] bg-gradient-to-bl from-blue-500/50 to-indigo-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/5 right-1/5 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/45 to-teal-500/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-[320px] h-[320px] bg-gradient-to-br from-pink-500/50 to-rose-600/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gradient-to-br from-violet-600/45 to-fuchsia-500/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-tl from-cyan-600/50 to-blue-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Left Side - Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-20">
        <div className="w-full max-w-[450px]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-2 text-center text-white font-extrabold">
            Vision<span className="text-cyan-400">Mesh</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#b3b3b3] mb-8 sm:mb-12 text-center">Create your account</p>

          <div className="bg-white/5 backdrop-blur-md border-b rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="sr-only">Username</label>
                <input 
                  name="username" 
                  type="text" 
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username" 
                  required 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <div>
                <label className="sr-only">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  required 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <div>
                <label className="sr-only">Password</label>
                <input 
                  name="password" 
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  required 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <div>
                <label className="sr-only">Confirm Password</label>
                <input 
                  name="confirmPassword" 
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password" 
                  required 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

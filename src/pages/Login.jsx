import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = `${API_BASE_URL}/api`;

  // Check for OAuth token in URL on component mount
  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    
    if (token) {
      // OAuth login successful
      handleLogin(token);
    } else if (error === 'oauth_failed') {
      setError('Google login failed. Please try again.');
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (token) => {
    try { 
      localStorage.setItem('vm_auth', 'true');
      localStorage.setItem('vm_token', token);
    } catch (e) {
      console.error('Local storage error:', e);
    }
    navigate('/home');
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) return 'Email is required.';
    if (!emailRegex.test(formData.email.trim())) return 'Please enter a valid email address.';
    if (!formData.password) return 'Password is required.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters.';

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
      if (formData.password.length < 8) return 'Password must be at least 8 characters for signup.';
    }

    return null;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login request with credentials to receive cookies
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        }, {
          withCredentials: true // Important: allows cookies to be set
        });
        
        if (response.data.token) {
          // Store user data
          localStorage.setItem('vm_user', JSON.stringify(response.data.user));
          handleLogin(response.data.token);
        } else {
          setError(response.data.msg || 'Login failed');
        }
      } else {
        // Signup request - need username, email, password
        const response = await axios.post(`${API_URL}/auth/register`, {
          username: formData.email.split('@')[0], // Use email prefix as username
          email: formData.email,
          password: formData.password
        }, {
          withCredentials: true // Important: allows cookies to be set
        });
        
        if (response.data.token) {
          // Registration now returns token directly
          localStorage.setItem('vm_user', JSON.stringify(response.data.user));
          handleLogin(response.data.token);
        } else {
          setError(response.data.msg || 'Signup failed');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Handle Google OAuth
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleGitHubLogin = async () => {
    // Handle GitHub OAuth
    window.location.href = `${API_URL}/auth/github`;
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    // <div className="min-h-screen flex relative bg-linear-to-r from-black via-gray-900 to-black">
    <div className="min-h-screen h-screen flex relative bg-gray-950 overflow-hidden">
      {/* Cool Background Designs - Full Page - MUCH MORE VISIBLE */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Colorful gradient blobs - ENHANCED VISIBILITY */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/60 to-pink-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-cyan-500/65 to-blue-500/55 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/55 to-purple-500/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-[380px] h-[380px] bg-gradient-to-bl from-teal-500/50 to-cyan-400/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}></div>
        
        {/* Additional gradient blobs for richness */}
        <div className="absolute top-1/2 left-1/6 w-[350px] h-[350px] bg-gradient-to-br from-fuchsia-600/45 to-purple-600/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/5 right-1/3 w-[420px] h-[420px] bg-gradient-to-bl from-blue-500/50 to-indigo-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/5 right-1/5 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/45 to-teal-500/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-[320px] h-[320px] bg-gradient-to-br from-pink-500/50 to-rose-600/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gradient-to-br from-violet-600/45 to-fuchsia-500/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-tl from-cyan-600/50 to-blue-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        
        {/* Flowing wave lines with gradient - MUCH MORE VISIBLE */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="loginGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.9 }} />
            </linearGradient>
            <linearGradient id="loginGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(20, 184, 166)', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path d="M0,200 Q250,150 500,200 T1000,200" stroke="url(#loginGrad1)" strokeWidth="4" fill="none" className="animate-pulse" style={{ animationDuration: '4s' }}/>
          <path d="M0,400 Q250,500 500,400 T1000,400" stroke="url(#loginGrad1)" strokeWidth="4" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
          <path d="M0,600 Q250,550 500,600 T1000,600" stroke="url(#loginGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}/>
          <path d="M0,300 Q200,250 400,300 T800,300" stroke="url(#loginGrad2)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}/>
          <path d="M200,100 Q400,50 600,100 T1000,100" stroke="url(#loginGrad2)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }}/>
          <path d="M0,800 Q300,750 600,800 T1000,800" stroke="url(#loginGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '2.5s' }}/>
        </svg>
        
        {/* Scattered light particles - Balanced */}
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() > 0.75 ? '168, 85, 247' : Math.random() > 0.5 ? '34, 211, 238' : Math.random() > 0.25 ? '236, 72, 153' : '59, 130, 246'}, ${0.3 + Math.random() * 0.4})`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
            boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(${Math.random() > 0.5 ? '168, 85, 247' : '34, 211, 238'}, 0.6)`,
            }}
          />
        ))}
        
        {/* Radial burst effects - MUCH MORE VISIBLE */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/60 to-transparent animate-ping" style={{ animationDuration: '5s' }}></div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] opacity-35">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/60 to-transparent animate-ping" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] opacity-35">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/55 to-transparent animate-ping" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-[380px] h-[380px] opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/55 to-transparent animate-ping" style={{ animationDuration: '6.5s', animationDelay: '0.8s' }}></div>
        </div>
        
        {/* Geometric accents - MUCH MORE VISIBLE */}
        <div className="absolute top-1/3 left-1/5 w-40 h-40 border-3 border-cyan-400/50 rounded-lg rotate-12 animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 border-3 border-purple-400/50 rounded-full animate-pulse opacity-55" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/5 left-1/3 w-36 h-36 border-3 border-pink-400/50 rounded-lg -rotate-12 animate-pulse opacity-58" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 right-1/3 w-28 h-28 border-3 border-indigo-400/50 rounded-full animate-pulse opacity-60" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-44 h-44 border-2 border-fuchsia-400/45 rounded-lg rotate-45 animate-pulse opacity-55" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
        
        {/* Color streaks - MUCH MORE VISIBLE */}
        <div className="absolute top-1/4 left-1/3 w-3 h-64 bg-gradient-to-b from-purple-500/60 to-transparent opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-56 bg-gradient-to-t from-cyan-500/60 to-transparent opacity-60 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-72 bg-gradient-to-b from-pink-500/55 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-60 bg-gradient-to-t from-indigo-500/55 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/5 w-80 h-3 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/6 w-72 h-2.5 bg-gradient-to-l from-transparent via-purple-500/50 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}></div>
        
        {/* Additional sparkle effects - Subtle */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse" style={{ animationDuration: `${2 + Math.random() * 3}s`, animationDelay: `${Math.random() * 3}s` }}>
              <path d="M12 2L15 9L22 9L16.5 14L19 21L12 16.5L5 21L7.5 14L2 9L9 9L12 2Z" 
                fill={`rgba(${Math.random() > 0.5 ? '168, 85, 247' : Math.random() > 0.25 ? '34, 211, 238' : '236, 72, 153'}, ${0.5 + Math.random() * 0.5})`}
              />
            </svg>
          </div>
        ))}
        
        {/* Mesh grid pattern overlay - Subtle */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-12" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Dark overlay for subtle effect */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Full Background Video - YouTube Embed */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          className="absolute w-full h-full object-cover scale-150"
          src="https://www.youtube.com/embed/xJ_fFLgGHiU?autoplay=1&mute=1&loop=1&playlist=xJ_fFLgGHiU&controls=0&showinfo=0&modestbranding=1&rel=0&fs=0&start=305"
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div> */}

      {/* Full Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <img 
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL8AzQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAACAwEABQQHBv/EAB4QAQEBAAMBAQEBAQAAAAAAAAIAAQMEYRESUSET/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APl1U9VmqnqgSUEopU0oElTSilTSgSVNKKVNKBJU0opU0oElTSilTSgSVNKKVNKBJQSjqp6oElT1RShqgWqnqs1Q1Qbqhu2ao7sC3Ybtm7Hdg3dj9utzIP0tKmlFKmlAkqaUUqaUCSppRSppQJKmlFKmlAkqaUUqaUCSppRSppQJKGqOqnqgWqGqOqGqBaqeqzVHdg7VZux3Y7sG7sd2zdsg77d8tzJZkGZksy3MnmQf3CVNKKVNKBJU0opU0oElTSilTSgSVNKKVNKBJU0opQSgSVNKOqGqBaqeqzVDVBuqG7duw3YFuw3bN2O7Bv2O7dbmQZ8lmSzLcyDsyWZbmTwwZhlhnmSwwf0aVNKKVNKBJU0opU0oElTSilTSgSUNUdVNKBaoao6oaoN1Q3bNUd2DtVm7Hdjuwbux3bN2yDvt1uZPMgOZPMuzJ5kGZk8NuGphgOGeGRM8MGYZYZ4Z4YPsSppRSppQJKmlFKCUC1U9UdUNUC1U9VmqGqDd2G7duw3YN3Y7sd2zdg3dj9utzIMzJZksy3Mg7MlmW5k8MGYZ4ZYZkwHDUw24amGA4amGRMyYCTUwyJqYYPjSppWaqeqBaqeqzVT1QLVDVZqjuwdux3bN2O7Bu7Hds3bIOuzLcyeZAcyeZdmTzIMzJZk8M8MBwzwywzwwZhnhkTUJgOGoTaTUJgJNQmRNQmAkz/MyamGD+c1Q1R1R1Qbqhu3bsN2DtVm7Zux3YN3Y/brcyDMyWZLMtzIOzJZluZUwwHDPDLDPDAcNTDbhqEwHDUwywzJgwmZMiahMBJqEyJqEwEmoTImoTASamGRNTDB/D7sd2zdjuwbux3bN2yDt275bmTzIDmTzJZluZB2ZLDbmVMMBwzwywzJgzDMmRNQmA4ahMsMyYCTUJkTUJgJNQmRNQmAk1CZE1CYCTUJkTUJgJM/zMmeGD823Y/brcyDPksyWZPMgOZLMtzKmGA5k8MsM8MGYZ4ZYZ4YCTUwyJqYYCTPDImoTASahMiahMBJqEyJqkwAmoTMmoTASZkyJqEwEmoTImeGDCZYZ4ZfmD8szJZk8yWGA5k8yWGeGA4amG3DUJgOGZMiahMBJqYZE1CYCTMmRNQmAk1CZk1CYCTUJkTUJgJNQmRNQmAE1CZE1CYCTUJkTPDASZ4ZYZ4YMwywyzJZkH5XmVMMM5MnnJkDwzwwzkNTOQwImoTA8hqHkP9yBk1CYHkPkzyHyBk1CYHkPlQ8uQUJqE0zymoeU+QUJqEwPIfJnkPkFCahMDyHyZ5D5AyahMM5DUPIfIHhnhgeQ1M5D5A8M8MM5DPOQwPDLMjnJk8eQbmTzI4zL95B+P/Fd9V9m8OR3iyD585NtzmqbxZT3iyB5zSzmo/8APY/nYPrzn2pnPfB/v9u/S/sHonsbUzse3mZy7bnLsHqnse1D2Pbyc5dnnNsHrns7/ah7Pt4+c2zzm2D2T2fah7Pt4uc+1M59g9o9n2oe17eKefZnn2D2z2fah7Pt4h7G1D2Ng9s9n2Z7Ht4p7G1D2Ng9o9j2pnY9vFPY2oexsHtZ2PZZ2Pbxz2NqZz7B/9k=" 
          alt="" 
          
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div> */}

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-20">
        <div className="w-full max-w-[450px]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-2 text-center text-white font-extrabold">
            Vision<span className="text-cyan-400">Mesh</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#b3b3b3] mb-8 sm:mb-12 text-center">Analyzing and Weaving Better Visuals</p>

          <div className="bg-white/5 backdrop-blur-md border-b rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/5">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-l-lg transition-all ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-r-lg transition-all ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="sr-only">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <div>
                <label className="sr-only">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="sr-only">Confirm Password</label>
                  <input 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    required 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                  />
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_4px_20px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Continue with email' : 'Create Account'
                )}
              </button>

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Don't have an account? Sign up
                  </button>
                </div>
              )}

              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-black/30 text-[#666]">OR</span>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <button 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 text-white rounded-lg font-medium transition-all duration-300 hover:border-white hover:shadow-[0_4px_15px_rgba(229,9,20,0.2)]" 
                  onClick={handleGoogleLogin}
                >
                  <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.9 0 7.3 1.4 10 3.9l7.5-7.5C36.8 2.7 30.8 0 24 0 14.9 0 6.9 5 2.7 12.5l8.8 6.8C12.8 15 17.9 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.6H24v9h12.7c-.5 2.6-2 4.8-4.1 6.3l6.3 4.9C44.1 36.2 46.5 30.5 46.5 24z"/>
                    <path fill="#4A90E2" d="M11.5 28.3c-.6-1.9-.6-3.9 0-5.8L2.7 15.7C1 19.5.2 23.7.2 28c0 4.2.8 8.3 2.5 12.1l8.8-6.8z"/>
                    <path fill="#FBBC05" d="M24 48c6.1 0 11.4-2 15.2-5.5l-7.5-6.1C30.7 37.9 27.5 39 24 39c-6.1 0-11.2-5.5-12.8-12.9L2.7 31.9C6.9 39 14.9 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 text-white rounded-lg font-medium transition-all duration-300 hover:border-white hover:shadow-[0_4px_15px_rgba(229,9,20,0.2)]" 
                  onClick={handleGitHubLogin}
                >
                  <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.64 3.01 8.57 7.19 9.96.53.1.72-.23.72-.51 0-.25-.01-.92-.01-1.8-2.92.64-3.53-1.4-3.53-1.4-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.07-.65.07-.65 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.14 3.07.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.2 0-1.15.41-2.09 1.09-2.82-.11-.27-.48-1.36.1-2.83 0 0 .89-.29 2.92 1.08a10.2 10.2 0 012.66-.36c.9 0 1.8.12 2.66.36 2.03-1.37 2.92-1.08 2.92-1.08.58 1.47.21 2.56.1 2.83.68.73 1.09 1.67 1.09 2.82 0 4.04-2.46 4.92-4.8 5.18.38.33.72.98.72 1.98 0 1.43-.01 2.58-.01 2.93 0 .28.19.62.73.51C20.1 20.17 23.1 16.24 23.1 11.6 23.1 5.33 18.27.5 12 .5z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </form>
            <p className="mt-4 sm:mt-6 text-xs text-gray-200 text-center">By continuing, you acknowledge our Privacy Policy.</p>
          </div>
        </div>
      </div>

      {/* Right Side - 16:9 Image Container*/}
      {/* <div className="hidden lg:flex flex-1 items-center justify-center p-8 pt-20 relative z-10">
        <div className="w-full max-w-[800px] aspect-video bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <img 
            src="https://4kwallpapers.com/images/wallpapers/earth-sunrise-2732x2732-12523.jpg" 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>  */}
    </div>
  );
}

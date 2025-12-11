import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('vm_user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Pre-fill form with user data
        setFormData(prev => ({
          ...prev,
          fullName: parsedUser.username || '',
          email: parsedUser.email || '',
          username: parsedUser.username || '',
        }));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', formData);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // Handle password update logic here
    console.log('Password updated');
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError('');

    try {
      const token = localStorage.getItem('vm_token');
      
      if (!token) {
        setDeleteError('Not authenticated');
        return;
      }

      const response = await axios.delete(`${API_BASE_URL}/auth/delete-account`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      if (response.data) {
        // Clear all localStorage
        localStorage.removeItem('vm_auth');
        localStorage.removeItem('vm_token');
        localStorage.removeItem('vm_user');
        
        // Redirect to login
        navigate('/login');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      setDeleteError(error.response?.data?.msg || 'Failed to delete account. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-16 sm:pt-20 relative overflow-hidden">
      {/* Cool Background Designs - Full Page */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Colorful gradient blobs */}
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
        
        {/* Flowing wave lines with gradient */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="settingsGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.9 }} />
            </linearGradient>
            <linearGradient id="settingsGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(20, 184, 166)', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path d="M0,200 Q250,150 500,200 T1000,200" stroke="url(#settingsGrad1)" strokeWidth="4" fill="none" className="animate-pulse" style={{ animationDuration: '4s' }}/>
          <path d="M0,400 Q250,500 500,400 T1000,400" stroke="url(#settingsGrad1)" strokeWidth="4" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
          <path d="M0,600 Q250,550 500,600 T1000,600" stroke="url(#settingsGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}/>
          <path d="M0,300 Q200,250 400,300 T800,300" stroke="url(#settingsGrad2)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}/>
          <path d="M200,100 Q400,50 600,100 T1000,100" stroke="url(#settingsGrad2)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }}/>
          <path d="M0,800 Q300,750 600,800 T1000,800" stroke="url(#settingsGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '2.5s' }}/>
        </svg>
        
        {/* Scattered light particles */}
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
        
        {/* Radial burst effects */}
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
        
        {/* Geometric accents */}
        <div className="absolute top-1/3 left-1/5 w-40 h-40 border-3 border-cyan-400/50 rounded-lg rotate-12 animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 border-3 border-purple-400/50 rounded-full animate-pulse opacity-55" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/5 left-1/3 w-36 h-36 border-3 border-pink-400/50 rounded-lg -rotate-12 animate-pulse opacity-58" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 right-1/3 w-28 h-28 border-3 border-indigo-400/50 rounded-full animate-pulse opacity-60" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-44 h-44 border-2 border-fuchsia-400/45 rounded-lg rotate-45 animate-pulse opacity-55" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
        
        {/* Color streaks */}
        <div className="absolute top-1/4 left-1/3 w-3 h-64 bg-gradient-to-b from-purple-500/60 to-transparent opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-56 bg-gradient-to-t from-cyan-500/60 to-transparent opacity-60 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-72 bg-gradient-to-b from-pink-500/55 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-60 bg-gradient-to-t from-indigo-500/55 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/5 w-80 h-3 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/6 w-72 h-2.5 bg-gradient-to-l from-transparent via-purple-500/50 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}></div>
        
        {/* Additional sparkle effects */}
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
        
        {/* Mesh grid pattern overlay */}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-1 sm:p-2 flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 sm:gap-0">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-300 flex items-center gap-2 sm:gap-3 whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-sm sm:text-base">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('account')}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-300 flex items-center gap-2 sm:gap-3 mt-0 lg:mt-1 whitespace-nowrap ${
                  activeTab === 'account'
                    ? 'bg-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-sm sm:text-base">Account</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-300 flex items-center gap-2 sm:gap-3 mt-0 lg:mt-1 whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Security</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-300 flex items-center gap-2 sm:gap-3 mt-0 lg:mt-1 whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'bg-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="font-medium text-sm sm:text-base">Notifications</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Profile Information</h2>
                
                {/* Profile Picture */}
                <div className="mb-6 sm:mb-8">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">Profile Picture</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                      {user && user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.username || 'User'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {user && user.authProvider !== 'local' && (
                        <p className="text-xs text-gray-400">
                          Profile picture from {user.authProvider === 'google' ? 'Google' : 'GitHub'}
                        </p>
                      )}
                      <div className="flex gap-2 sm:gap-3">
                        <button type="button" className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium transition-colors">
                          Upload New
                        </button>
                        <button type="button" className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg font-medium transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="johndoe"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-600/30"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Account Settings</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Account Type */}
                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Account Type</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Your current account type and authentication method</p>
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                      {user?.authProvider === 'google' && (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-white text-sm">Connected with Google</span>
                        </>
                      )}
                      {user?.authProvider === 'github' && (
                        <>
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-white text-sm">Connected with GitHub</span>
                        </>
                      )}
                      {user?.authProvider === 'local' && (
                        <>
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-white text-sm">Email/Password Account</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Account Created */}
                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Account Created</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Member since</p>
                    <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-white text-sm">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Connected Accounts */}
                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Connected Accounts</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Link additional accounts for easier sign-in</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-white text-sm">Google</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${user?.googleId ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {user?.googleId ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-white text-sm">GitHub</span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${user?.githubId ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {user?.githubId ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email Preferences */}
                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Email Preferences</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Manage your email notifications</p>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white text-sm">Analysis complete notifications</span>
                        <input type="checkbox" className="w-4 h-4 text-cyan-400 rounded focus:ring-cyan-500" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white text-sm">Product updates and news</span>
                        <input type="checkbox" className="w-4 h-4 text-cyan-400 rounded focus:ring-cyan-500" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-white text-sm">Tips and tutorials</span>
                        <input type="checkbox" className="w-4 h-4 text-cyan-400 rounded focus:ring-cyan-500" />
                      </label>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Permanently delete your account and all associated data</p>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Security Settings</h2>
                
                <form onSubmit={handlePasswordUpdate} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter current password"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-600/30"
                    >
                      Update Password
                    </button>
                  </div>
                </form>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Add an extra layer of security to your account</p>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Notification Preferences</h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-4 sm:pb-6 border-b border-white/10">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Email Notifications</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Receive email updates about your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-4 sm:pb-6 border-b border-white/10">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Push Notifications</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Receive push notifications on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-4 sm:pb-6 border-b border-white/10">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Analysis Updates</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Get notified when analysis is complete</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Marketing Emails</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Receive updates about new features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-500/30 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-red-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Delete Account</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot be undone. All your data, including analysis history and settings, will be permanently deleted.
            </p>

            {deleteError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{deleteError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteError('');
                }}
                disabled={deleteLoading}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 border-2 border-white/20 flex items-center justify-center">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium transition-colors">
                        Upload New
                      </button>
                      <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg font-medium transition-colors">
                        Remove
                      </button>
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
                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Language</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Select your preferred language</p>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Timezone</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Set your timezone</p>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors">
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Time</option>
                      <option value="pst">Pacific Time</option>
                      <option value="gmt">GMT</option>
                    </select>
                  </div>

                  <div className="pb-4 sm:pb-6 border-b border-white/10">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Delete Account</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Permanently delete your account and all data</p>
                    <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
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
    </div>
  );
}

export default Settings;

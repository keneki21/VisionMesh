import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    try { localStorage.setItem('vm_auth', 'true'); } catch (e) {}
    navigate('/home');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    // <div className="min-h-screen flex relative bg-linear-to-r from-black via-gray-900 to-black">
    <div className="min-h-screen flex relative bg-gray-950">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://4kwallpapers.com/images/wallpapers/earth-sunrise-2732x2732-12523.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 relative z-10">
        <div className="w-full max-w-[450px]">
          <h1 className="text-5xl mb-2 text-center text-white font-extrabold">
            Vision<span className="text-[#e50914]">Mesh</span>
          </h1>
          <p className="text-lg text-[#b3b3b3] mb-12 text-center">Analyzing and Weaving Better Visuals</p>

          <div className="bg-white/5 backdrop-blur-md border-b  rounded-2xl p-8 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-[#e50914] focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <div>
                <label className="sr-only">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  required 
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-[#e50914] focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-[#e50914] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#b20710] hover:shadow-[0_4px_20px_rgba(229,9,20,0.4)]"
              >
                Continue with email
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black/30 text-[#666]">OR</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  type="button" 
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#2a2a2a] border border-white/10 text-white rounded-lg font-medium transition-all duration-300 hover:border-[#e50914] hover:shadow-[0_4px_15px_rgba(229,9,20,0.2)]" 
                  onClick={handleLogin}
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.9 0 7.3 1.4 10 3.9l7.5-7.5C36.8 2.7 30.8 0 24 0 14.9 0 6.9 5 2.7 12.5l8.8 6.8C12.8 15 17.9 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.6H24v9h12.7c-.5 2.6-2 4.8-4.1 6.3l6.3 4.9C44.1 36.2 46.5 30.5 46.5 24z"/>
                    <path fill="#4A90E2" d="M11.5 28.3c-.6-1.9-.6-3.9 0-5.8L2.7 15.7C1 19.5.2 23.7.2 28c0 4.2.8 8.3 2.5 12.1l8.8-6.8z"/>
                    <path fill="#FBBC05" d="M24 48c6.1 0 11.4-2 15.2-5.5l-7.5-6.1C30.7 37.9 27.5 39 24 39c-6.1 0-11.2-5.5-12.8-12.9L2.7 31.9C6.9 39 14.9 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  type="button" 
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#2a2a2a] border border-white/10 text-white rounded-lg font-medium transition-all duration-300 hover:border-[#e50914] hover:shadow-[0_4px_15px_rgba(229,9,20,0.2)]" 
                  onClick={handleLogin}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.64 3.01 8.57 7.19 9.96.53.1.72-.23.72-.51 0-.25-.01-.92-.01-1.8-2.92.64-3.53-1.4-3.53-1.4-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.07-.65.07-.65 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.14 3.07.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.2 0-1.15.41-2.09 1.09-2.82-.11-.27-.48-1.36.1-2.83 0 0 .89-.29 2.92 1.08a10.2 10.2 0 012.66-.36c.9 0 1.8.12 2.66.36 2.03-1.37 2.92-1.08 2.92-1.08.58 1.47.21 2.56.1 2.83.68.73 1.09 1.67 1.09 2.82 0 4.04-2.46 4.92-4.8 5.18.38.33.72.98.72 1.98 0 1.43-.01 2.58-.01 2.93 0 .28.19.62.73.51C20.1 20.17 23.1 16.24 23.1 11.6 23.1 5.33 18.27.5 12 .5z"/>
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </form>
            <p className="mt-6 text-xs text-[#666] text-center">By continuing, you acknowledge our Privacy Policy.</p>
          </div>
        </div>
      </div>

      {/* Right Side - 16:9 Image Container */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 pt-20 relative z-10">
        <div className="w-full max-w-[800px] aspect-video bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <img 
            src="https://4kwallpapers.com/images/wallpapers/earth-sunrise-2732x2732-12523.jpg" 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

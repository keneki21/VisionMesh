
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const textVariations = [
    "What Vision will you transform into design today?",
    "Transform Ideas into Stunning Designs",
    "Where Vision Meets Innovation",
    "Design Beyond Imagination"
  ];

  useEffect(() => {
    // Check for OAuth token and fetch user data
    const handleOAuthCallback = async () => {
      const token = searchParams.get('token');
      const google = searchParams.get('google');
      const github = searchParams.get('github');

      if (token && (google === 'success' || github === 'success')) {
        // Store token
        localStorage.setItem('vm_auth', 'true');
        localStorage.setItem('vm_token', token);

        // Fetch user profile data from backend
        try {
          const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          });

          if (response.data.user) {
            // Store user data including profile picture
            localStorage.setItem('vm_user', JSON.stringify(response.data.user));
          }

          // Clean up URL
          window.history.replaceState({}, document.title, '/home');
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    handleOAuthCallback();

    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textVariations.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [searchParams]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadError(null);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setUploadError('Please select a screenshot first.');
      return;
    }
    setLoading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('screenshot', file);
      const token = localStorage.getItem('vm_token');
      const { data: report } = await axios.post(
        `${API_BASE_URL}/api/evaluate`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const imageUrl = URL.createObjectURL(file);
      navigate('/evaluation', { state: { report, imageUrl } });
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Analysis failed. Please try again.';
      setUploadError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeUrl = async () => {
    if (!urlInput.trim()) {
      setUploadError('Please enter a URL.');
      return;
    }
    setLoading(true);
    setUploadError(null);
    try {
      const token = localStorage.getItem('vm_token');
      const { data } = await axios.post(
        `${API_BASE_URL}/api/evaluate-url`,
        { url: urlInput.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const imageUrl = data.imageBase64
        ? `data:${data.imageMimeType};base64,${data.imageBase64}`
        : data.historyId
          ? `${API_BASE_URL}/api/history/${data.historyId}/image?token=${token}`
          : null;

      navigate('/evaluation', { state: { report: data.report, imageUrl } });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Analysis failed. Please try again.';
      setUploadError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Beautiful Black Background with White Particles */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-black">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* White geometric patterns for contrast */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-gray-300 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-bounce delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gray-200 rounded-full mix-blend-overlay filter blur-3xl opacity-80 animate-pulse delay-500"></div>
        </div>

        {/* Grid overlay in white for subtle structure */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Beautiful White Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${1 + Math.random() * 4}px`,
                height: `${1 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                opacity: 0.2 + Math.random() * 0.4,
                backgroundColor: '#ffffff',
                boxShadow: `0 0 ${4 + Math.random() * 8}px rgba(255,255,255,0.5)`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>

        {/* Subtle glow effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        
        {/* Central focus effect in white */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>

        {/* Subtle white lines for accent */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-px bg-white animate-pulse"></div>
          <div className="absolute top-20 right-0 w-px h-64 bg-gray-300 animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-10 w-0.5 h-32 bg-gray-200 animate-pulse delay-700"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-px bg-gray-400 transform rotate-45 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-24 sm:pb-32">
        
        {/* Main Headline */}
        <div className="h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center mb-4 sm:mb-6 max-w-5xl px-4 relative z-10">
          {/* Cool Background Designs for Hero Section - Start from here */}
          <div className="absolute inset-0 z-0 overflow-hidden" style={{ width: '200vw', height: '300vh', left: '-50vw', top: '-100vh' }}>
          {/* Colorful gradient blobs - Enhanced with more layers */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-cyan-500/25 to-blue-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-tr from-indigo-600/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-teal-500/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}></div>
          
          {/* Additional gradient blobs for richness */}
          <div className="absolute top-1/2 left-1/6 w-56 h-56 bg-gradient-to-br from-fuchsia-600/15 to-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/5 right-1/3 w-64 h-64 bg-gradient-to-bl from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '0.8s' }}></div>
          <div className="absolute bottom-1/5 right-1/5 w-72 h-72 bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}></div>
          <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
          
          {/* Flowing wave lines with gradient - Multiple layers */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.6 }} />
              </linearGradient>
              <linearGradient id="heroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.5 }} />
                <stop offset="50%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(20, 184, 166)', stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>
            <path d="M0,200 Q250,150 500,200 T1000,200" stroke="url(#heroGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '4s' }}/>
            <path d="M0,400 Q250,500 500,400 T1000,400" stroke="url(#heroGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
            <path d="M0,600 Q250,550 500,600 T1000,600" stroke="url(#heroGrad1)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}/>
            <path d="M0,300 Q200,250 400,300 T800,300" stroke="url(#heroGrad2)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}/>
            <path d="M200,100 Q400,50 600,100 T1000,100" stroke="url(#heroGrad2)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }}/>
          </svg>
          
          {/* Scattered light particles - Increased count */}
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${2 + Math.random() * 7}px`,
                height: `${2 + Math.random() * 7}px`,
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                background: `rgba(${Math.random() > 0.75 ? '168, 85, 247' : Math.random() > 0.5 ? '34, 211, 238' : Math.random() > 0.25 ? '236, 72, 153' : '59, 130, 246'}, ${0.3 + Math.random() * 0.6})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(${Math.random() > 0.5 ? '168, 85, 247' : '34, 211, 238'}, 0.7)`,
              }}
            />
          ))}
          
          {/* Radial burst effects - Enhanced with more layers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-15">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/40 to-transparent animate-ping" style={{ animationDuration: '5s' }}></div>
          </div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-transparent animate-ping" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 opacity-12">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/35 to-transparent animate-ping" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
          </div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 opacity-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/35 to-transparent animate-ping" style={{ animationDuration: '6.5s', animationDelay: '0.8s' }}></div>
          </div>
          
          {/* Geometric accents - More variety */}
          <div className="absolute top-1/3 left-1/5 w-32 h-32 border-2 border-cyan-400/20 rounded-lg rotate-12 animate-pulse opacity-30"></div>
          <div className="absolute bottom-1/3 right-1/5 w-24 h-24 border-2 border-purple-400/20 rounded-full animate-pulse opacity-25" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/5 left-1/3 w-28 h-28 border-2 border-pink-400/20 rounded-lg -rotate-12 animate-pulse opacity-28" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/5 right-1/3 w-20 h-20 border-2 border-indigo-400/20 rounded-full animate-pulse opacity-30" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 left-2/3 w-36 h-36 border border-fuchsia-400/15 rounded-lg rotate-45 animate-pulse opacity-25" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
          
          {/* Color streaks - More dynamic */}
          <div className="absolute top-1/4 left-1/3 w-2 h-48 bg-gradient-to-b from-purple-500/30 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-40 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-56 bg-gradient-to-b from-pink-500/25 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-44 bg-gradient-to-t from-indigo-500/25 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/5 w-64 h-2 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
          <div className="absolute top-2/3 right-1/6 w-56 h-1.5 bg-gradient-to-l from-transparent via-purple-500/20 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}></div>
          
          {/* Additional sparkle effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="animate-pulse" style={{ animationDuration: `${2 + Math.random() * 3}s`, animationDelay: `${Math.random() * 3}s` }}>
                <path d="M12 2L15 9L22 9L16.5 14L19 21L12 16.5L5 21L7.5 14L2 9L9 9L12 2Z" 
                  fill={`rgba(${Math.random() > 0.5 ? '168, 85, 247' : Math.random() > 0.25 ? '34, 211, 238' : '236, 72, 153'}, ${0.2 + Math.random() * 0.3})`}
                />
              </svg>
            </div>
          ))}
          
          {/* Mesh grid pattern overlay */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-8" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(236, 72, 153, 0.25) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '25px 25px',
            }}
          />
        </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center relative z-10">
            <span className="text-white">What </span>
            <span className="italic bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent animate-gradient bg-300%">
              Vision
            </span>
            <span className="text-white"> will you transform into design today?</span>
          </h1>
        </div>

        {/* Animated Text Variations */}
        <div className="h-12 sm:h-14 md:h-16 -mb-10 sm:-mb-16 overflow-hidden relative z-10">
          <div className="relative">
            {textVariations.map((text, index) => (
              <p
                key={index}
                className={`text-base sm:text-lg md:text-xl text-gray-300 text-center mb-8 sm:mb-12 max-w-2xl px-4 absolute inset-0 transition-all duration-500 ${
                  index === textIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="w-full  max-w-2xl px-4 relative z-10">
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/30 shadow-xl shadow-black/30 overflow-hidden transition-all duration-300">
            {/* Tabs */}
            <div className="flex border-b border-white/20">
              <button
                onClick={() => setActiveTab('upload')}
                className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 sm:after:w-16 after:h-0.5 after:bg-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Upload Screenshot
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'url'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 sm:after:w-16 after:h-0.5 after:bg-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Enter URL
              </button>
            </div>

            {/* Upload Area */}
            <div className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'upload' ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${
                    dragActive
                      ? 'border-white bg-white/10 backdrop-blur-sm'
                      : 'border-white/30 hover:border-white/60 bg-white/5'
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileInput}
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                  />
                  
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {/* Upload Icon with White Style */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-50"></div>
                        <svg
                          className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                    </div>

                    {file ? (
                      <p className="text-green-400 text-sm sm:text-base mb-1 sm:mb-2 font-medium truncate px-4">
                        {file.name}
                      </p>
                    ) : (
                      <p className="text-white text-sm sm:text-base mb-1 sm:mb-2">
                        Click to upload or drag and drop
                      </p>
                    )}
                    <p className="text-gray-300 text-xs sm:text-sm">
                      PNG, JPG, or JPEG (max. 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="Enter website URL..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && handleAnalyzeUrl()}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50 transition-colors"
                  />
                </div>
              )}

              {uploadError && (
                <p className="mt-3 text-red-400 text-sm text-center">{uploadError}</p>
              )}

              {/* Start Analysis Button */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button
                  onClick={activeTab === 'url' ? handleAnalyzeUrl : handleAnalyze}
                  disabled={loading}
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-white text-black font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? (activeTab === 'url' ? 'Capturing screenshot…' : 'Analyzing…') : 'Start Analysis'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center mb-4 sm:mb-6 max-w-5xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            <span className="text-white">Enabling </span>
            <span className="italic bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent animate-gradient bg-300%">
              creators
            </span>
            <span className="text-white"> through advanced AI-driven design analysis</span>
          </h1>
        </div>
        <div className="w-full -mt-6 sm:-mt-8 md:-mt-10 max-w-7xl px-4 relative">

          {/* Glowing Background SVG */}
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none ">
            <div className="absolute inset-0 rounded-full animate-glow-pulse blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 20%, rgba(96, 165, 250, 0.5) 40%, rgba(34, 211, 238, 0.2) 100%)',
                boxShadow: '0 0 60px rgba(34, 211, 238, 0.7), 0 0 90px rgba(96, 165, 250, 0.3), inset 0 0 60px rgba(34, 211, 238, 0.4)'
              }}
            />
          </div> */}
          
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl  hover:border-white/30 shadow-xl shadow-black/30 overflow-hidden transition-all duration-300 z-40"></div>
          <div className="absolute -inset-20 pointer-events-none opacity-60 animate-glow-pulse">
            <img 
              src="/glow.svg" 
              alt="glow" 
              className="w-full h-full object-contain"
            />
          </div> 
      </div>
      <div className="h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center px-4">
          <h1 className="text-xl text-white sm:text-2xl md:text-3xl lg:text-xl font-bold text-center">
            Let VisionMesh do the heavy work, freeing you to<br />focus on creativity instead of chasing UI issues.
          </h1>
      </div>

      {/* Feature Showcase Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-2 space-y-6">
        {/* Top Card - Full Width */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 relative overflow-hidden">
          {/* Cool Background Designs with Unique Patterns */}
          <div className="absolute inset-0">
            {/* Gradient mesh effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-transparent"></div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-600/20 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-pink-600/15 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-600/15 via-transparent to-transparent"></div>
            </div>
            
            {/* Flowing wave lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.6 }} />
                  <stop offset="50%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.6 }} />
                </linearGradient>
              </defs>
              <path d="M0,100 Q250,50 500,100 T1000,100" stroke="url(#grad1)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '3s' }}/>
              <path d="M0,150 Q250,200 500,150 T1000,150" stroke="url(#grad1)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }}/>
              <path d="M0,250 Q250,300 500,250 T1000,250" stroke="url(#grad1)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
            </svg>
            
            {/* Scattered light particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(${Math.random() > 0.5 ? '168, 85, 247' : Math.random() > 0.5 ? '34, 211, 238' : '236, 72, 153'}, ${0.3 + Math.random() * 0.4})`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                  boxShadow: `0 0 ${8 + Math.random() * 12}px rgba(${Math.random() > 0.5 ? '168, 85, 247' : '34, 211, 238'}, 0.5)`,
                }}
              />
            ))}
            
            {/* Radial burst effect */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-transparent animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>
            <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-15">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-transparent animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            </div>
            
            {/* Color streaks */}
            <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-purple-500/40 to-transparent opacity-40 animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-0 right-1/3 w-1 h-24 bg-gradient-to-t from-cyan-500/40 to-transparent opacity-40 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-0 w-24 h-1 bg-gradient-to-l from-pink-500/40 to-transparent opacity-40 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
          </div>
          
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 relative z-10">Always the best, without switching tools</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed relative z-10">
            VisionMesh integrates the frontier design analysis tools from the AI labs directly inside one familiar visual interface. 
            No more AI anxiety or juggling multiple platforms.
          </p>
        </div>

        {/* Bottom - Two Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 98% less errors */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Unique Background Designs */}
            <div className="absolute inset-0">
              {/* Liquid gradient blobs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/25 to-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/20 to-cyan-500/25 rounded-full blur-3xl" style={{ animationDuration: '5s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-lime-400/15 to-emerald-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
              
              {/* Checkmark trail effect */}
              <svg className="absolute top-8 right-8 w-16 h-16 opacity-20 text-green-400" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"/>
              </svg>
              <svg className="absolute bottom-12 left-12 w-12 h-12 opacity-15 text-emerald-400" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Ripple effect */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-green-400/30 opacity-40 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full border-2 border-emerald-400/30 opacity-30 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
              
              {/* Success sparkles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    background: `rgba(${Math.random() > 0.5 ? '16, 185, 129' : '20, 184, 166'}, ${0.4 + Math.random() * 0.3})`,
                    boxShadow: `0 0 ${6 + Math.random() * 10}px rgba(16, 185, 129, 0.4)`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                />
              ))}
              
              {/* Wave pattern */}
              <svg className="absolute bottom-0 left-0 w-full h-20 opacity-15" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path d="M0,20 Q50,10 100,20 T200,20 L200,40 L0,40 Z" fill="url(#greenGrad)" className="animate-pulse" style={{ animationDuration: '4s' }}/>
                <defs>
                  <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'rgb(16, 185, 129)', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(20, 184, 166)', stopOpacity: 0.3 }} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Glow orbs */}
              <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-400/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>
            </div>
            
            <div className="mb-6 relative z-10">
              <div className="text-7xl sm:text-8xl font-bold text-white mb-2" style={{ textShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>98%</div>
              <div className="text-2xl sm:text-3xl text-gray-400 font-semibold">less errors</div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-sm relative z-10">
              VisionMesh automatically analyzes, refines, and improves your designs, minimizing errors so you can focus on creating instead of debugging.
            </p>
          </div>

          {/* Build big without breaking */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col relative overflow-hidden">
            {/* Unique Background Designs */}
            <div className="absolute inset-0">
              {/* Deep blue gradient blobs - strength/stability theme */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-600/25 to-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-navy-900/20 to-blue-700/25 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
              
              {/* Expanding circles - scaling metaphor */}
              <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full border-2 border-blue-400/30 opacity-30 animate-ping" style={{ animationDuration: '4s' }}></div>
              <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full border-2 border-indigo-400/20 opacity-20 animate-ping" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full border-2 border-blue-500/10 opacity-10 animate-ping" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
              
              {/* Upward arrows - growth symbolism */}
              <svg className="absolute top-8 right-8 w-12 h-12 opacity-20 text-blue-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"/>
              </svg>
              <svg className="absolute bottom-12 left-12 w-10 h-10 opacity-15 text-indigo-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Building blocks pattern */}
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-blue-500/20 rounded opacity-30"></div>
              <div className="absolute top-1/4 right-1/4 translate-x-10 w-8 h-8 bg-blue-500/20 rounded opacity-30"></div>
              <div className="absolute top-1/4 right-1/4 translate-y-10 w-8 h-8 bg-indigo-500/20 rounded opacity-30"></div>
              <div className="absolute top-1/4 right-1/4 translate-x-10 translate-y-10 w-8 h-8 bg-indigo-500/20 rounded opacity-30"></div>
              
              {/* Scale particles */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '99, 102, 241'}, ${0.4 + Math.random() * 0.3})`,
                    boxShadow: `0 0 ${8 + Math.random() * 12}px rgba(59, 130, 246, 0.4)`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                />
              ))}
              
              {/* Foundation grid pattern */}
              <div className="absolute bottom-0 left-0 w-full h-24 opacity-15"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Growth spiral effect */}
              <svg className="absolute top-0 left-0 w-full h-full opacity-15" viewBox="0 0 200 200" preserveAspectRatio="none">
                <path d="M100,100 Q120,80 140,100 T180,100" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '4s' }}/>
                <path d="M100,100 Q80,120 100,140 T100,180" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}/>
              </svg>
              
              {/* Glow orbs */}
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>
            </div>
            
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4 relative z-10">Evaluate big without Stress</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6 relative z-10">
              Whether your project grows tenfold or a thousandfold, VisionMesh stays steady—with advanced AI Engine that keeps complexity under control.
            </p>
            <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mt-4 flex items-center justify-center relative overflow-hidden">
              {/* Additional background glow for 1000x text */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
              <div className="text-6xl sm:text-7xl font-bold text-white/30 relative z-10" style={{ textShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>1000x</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
          {/* Left Column - 70% width - Contains 2 rows */}
          <div className="md:col-span-7 grid grid-cols-1 gap-6">
            {/* Unlimited databases */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
              {/* Cool Background Designs with Colors */}
              <div className="absolute inset-0">
                {/* Colorful gradient blobs */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-cyan-500/25 to-blue-500/25 rounded-full blur-2xl" style={{ animationDuration: '4s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-green-400/15 to-cyan-400/15 rounded-full blur-xl"></div>
                
                {/* Floating geometric shapes with colors */}
                <div className="absolute top-4 left-4 w-20 h-20 border-2 border-cyan-400 rounded-lg rotate-12 animate-pulse opacity-40"></div>
                <div className="absolute top-12 right-8 w-16 h-16 border-2 border-purple-400 rounded-full animate-bounce opacity-40" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-8 left-12 w-24 h-24 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-2xl -rotate-12 opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-blue-400 rounded-full opacity-30"></div>
                <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-green-400/40 to-cyan-400/40 rounded-lg rotate-45 opacity-50"></div>
                
                {/* Grid pattern overlay with color */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />
                
                {/* Curved lines with multiple colors */}
                <svg className="absolute bottom-0 left-0 w-full h-32 opacity-40" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path d="M 0 25 Q 50 10, 100 25 T 200 25" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" fill="none"/>
                  <path d="M 0 35 Q 50 20, 100 35 T 200 35" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" fill="none"/>
                  <path d="M 0 15 Q 50 5, 100 15 T 200 15" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              
              <div className="w-full h-40 mb-6 flex items-center justify-center relative z-10">
                <div className="text-[10rem] sm:text-[12rem] md:text-[14rem] text-cyan-400" style={{ textShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}>∞</div>
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold text-center relative z-10">Unlimited Design Evaluations</h3>
              <h4 className="text-gray-300 text-sm sm:text-base text-center mt-2 relative z-10">Analyze as many UI screens, wireframes, and prototypes as you want — without limits.</h4>
            </div>

            {/* Optimized UX Insights from the Start */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
              {/* Cool Background Designs with Colors */}
              <div className="absolute inset-0">
                {/* Colorful gradient blobs */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-yellow-500/25 to-amber-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3.5s' }}></div>
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-cyan-500/20 to-blue-500/25 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-r from-indigo-400/15 to-cyan-400/15 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5.5s' }}></div>
                
                {/* Geometric shapes */}
                <div className="absolute top-6 left-6 w-16 h-16 border-2 border-yellow-400 rounded-full animate-pulse opacity-30"></div>
                <div className="absolute bottom-10 right-10 w-14 h-14 border-2 border-cyan-400 rounded-lg rotate-45 opacity-40"></div>
                <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-gradient-to-br from-amber-400/40 to-yellow-500/40 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '4s' }}></div>
                
                {/* Trophy/Achievement elements */}
                <div className="absolute top-1/3 left-1/4 w-10 h-12 border-2 border-yellow-400 rounded-t-full opacity-25"></div>
                <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-cyan-400/30 rounded-full opacity-40"></div>
                
                {/* Star shapes */}
                <div className="absolute top-8 right-8 opacity-30">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
                    <path d="M12 2L15 9L22 9L16.5 14L19 21L12 16.5L5 21L7.5 14L2 9L9 9L12 2Z" fill="currentColor" opacity="0.4"/>
                  </svg>
                </div>
                <div className="absolute bottom-12 left-12 opacity-25">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                    <path d="M12 2L15 9L22 9L16.5 14L19 21L12 16.5L5 21L7.5 14L2 9L9 9L12 2Z" fill="currentColor" opacity="0.4"/>
                  </svg>
                </div>
                
                {/* Progress bars effect */}
                <div className="absolute bottom-4 left-4 w-20 h-1 bg-gradient-to-r from-yellow-400/40 to-cyan-400/40 rounded-full opacity-40"></div>
                <div className="absolute top-12 right-12 w-16 h-1 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full opacity-35"></div>
                
                {/* Dots pattern */}
                <div className="absolute top-4 left-4 flex gap-2 opacity-30">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                
                {/* Curved accent lines */}
                <svg className="absolute bottom-0 right-0 w-full h-24 opacity-20" viewBox="0 0 200 50" preserveAspectRatio="none">
                  <path d="M 0 30 Q 50 15, 100 30 T 200 30" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="2" fill="none"/>
                  <path d="M 0 40 Q 50 25, 100 40 T 200 40" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-cyan-600 flex items-center justify-center mb-6 relative z-10 shadow-lg" style={{ boxShadow: '0 0 35px rgba(251, 191, 36, 0.3), 0 0 20px rgba(34, 211, 238, 0.3)' }}>
                <div className="text-4xl font-bold text-white">100</div>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold text-center relative z-10">Optimized UX Insights from the Start.</h3>
              <h4 className="text-gray-300 text-sm text-center mt-2 relative z-10">Receive high-accuracy usability scores and improvement insights the moment you upload a design.</h4>
            </div>
          </div>

          {/* Right Column - 30% width - Contains 3 rows */}
          <div className="md:col-span-3 grid grid-cols-1 grid-rows-1 gap-6">
            {/* Design Reports with Analytics & Export Options */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-cyan-500/30 to-blue-600/30 rounded-tl-full"></div>
              <h3 className="text-white text-xl sm:text-2xl font-bold text-center relative z-10 mb-4">Design Reports with Analytics & Export Options</h3>
              <div className="relative z-10 text-white">View detailed UX metrics, AI feedback, and export full reports</div>
            </div>

            {/* Professional-Level UX Analysis */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
              {/* Cool Background Designs with Colors */}
              <div className="absolute inset-0">
                {/* Colorful gradient blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/25 to-red-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-cyan-500/25 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>
                
                {/* Geometric shapes */}
                <div className="absolute top-8 left-8 w-16 h-16 border-2 border-orange-400 rounded-lg rotate-45 animate-pulse opacity-30"></div>
                <div className="absolute bottom-12 right-8 w-20 h-20 border-2 border-cyan-400 rounded-full opacity-40"></div>
                <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-gradient-to-br from-red-400/40 to-orange-500/40 rounded-full opacity-50"></div>
                
                {/* Multiple concentric circles */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <div className="w-48 h-48 rounded-full border-2 border-cyan-400"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-32 h-32 rounded-full border-2 border-orange-400 animate-ping" style={{ animationDuration: '3s' }}></div>
                </div>
                
                {/* Dots pattern */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-30">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
                
                {/* Diagonal lines */}
                <div className="absolute bottom-0 right-0 w-full h-full opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1"/>
                    <line x1="20" y1="100" x2="100" y2="20" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1"/>
                    <line x1="0" y1="80" x2="80" y2="0" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-white text-xl sm:text-2xl font-bold text-center relative z-10 mb-2">Professional-Level UX Analysis</h3>
              <h4 className="text-gray-300 text-sm text-center relative z-10">Backed by robust AI models and heuristic engines for reliable, scalable evaluation.</h4>
            </div>

            {/* Secure User Access & Authentication */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
              {/* Cool Background Designs with Colors */}
              <div className="absolute inset-0">
                {/* Colorful gradient blobs */}
                <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-teal-500/25 to-cyan-500/20 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-r from-blue-400/15 to-green-400/15 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s' }}></div>
                
                {/* Geometric shapes */}
                <div className="absolute top-6 right-6 w-14 h-14 border-2 border-green-400 rounded-lg rotate-12 animate-pulse opacity-30"></div>
                <div className="absolute bottom-8 left-8 w-18 h-18 border-2 border-teal-400 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '3.5s' }}></div>
                <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-gradient-to-br from-emerald-400/40 to-green-500/40 rounded-lg -rotate-12 opacity-50"></div>
                
                {/* Lock icon shapes */}
                <div className="absolute top-1/3 right-1/4 w-8 h-10 border-2 border-cyan-400 rounded-t-lg opacity-30"></div>
                <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-green-400/30 rounded-full opacity-40"></div>
                
                {/* Shield pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg width="120" height="120" viewBox="0 0 100 100" className="text-teal-400">
                    <path d="M50 10 L85 25 L85 50 Q85 75, 50 90 Q15 75, 15 50 L15 25 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                
                {/* Dots pattern */}
                <div className="absolute top-4 left-4 flex gap-2 opacity-30">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
                
                {/* Grid pattern */}
                <div className="absolute bottom-0 left-0 w-32 h-32 opacity-15"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px',
                  }}
                />
              </div>
              
              <div className="w-full h-40 mb-6 flex items-center justify-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)' }}>
                  <div className="w-8 h-8 bg-cyan-400 rounded-full" style={{ boxShadow: '0 0 15px rgba(34, 211, 238, 0.6)' }}></div>
                </div>
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold text-center relative z-10">Secure User Access & Authentication</h3>
              <h4 className="text-gray-300 text-sm text-center mt-2 relative z-10">Role-based login, protected evaluations, and encrypted user accounts for complete trust.</h4>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-16 pt-10 pb-0 text-center">
          <p className="text-white text-xl sm:text-2xl lg:text-2xl font-semibold max-w-4xl mx-auto leading-relaxed">
            VisionMesh gives you everything you need inside one familiar interface. Instantly preview your AI-enhanced UI design in real time — no setup required.
          </p>
        </div>
      </div>
          
      </div>
      

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-20px) translateX(10px) rotate(120deg); 
          }
          66% { 
            transform: translateY(10px) translateX(-10px) rotate(240deg); 
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
}

export default Home;
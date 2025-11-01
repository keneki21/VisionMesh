import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);

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
      // Handle file upload
      console.log(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload
      console.log(e.target.files[0]);
    }
  };

  const icons = [
    { id: 1, src: '/images/image1.png', alt: 'VisionMesh Icon 1 - Dashboard Preview' },
    { id: 2, src: '/images/image2.png', alt: 'VisionMesh Icon 2 - Report Generator' },
    { id: 3, src: '/images/image3.png', alt: 'VisionMesh Icon 3 - AI Analysis Tool' },
    { id: 4, src: '/images/image4.png', alt: 'VisionMesh Icon 4 - Code Preview' },
    { id: 5, src: '/images/image5.png', alt: 'VisionMesh Icon 5 - Accessibility Checker' },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Red and Black Abstract Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0000] to-[#330000]" />
        
        {/* Animated fluid red shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-800 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-bounce delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-red-900 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse delay-500"></div>
        </div>

        {/* Geometric red patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
          <div className="absolute top-20 right-0 w-1 h-64 bg-red-600 animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-10 w-2 h-32 bg-red-700 animate-pulse delay-700"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-1 bg-red-600 transform rotate-45 animate-pulse delay-1000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glowing horizon effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent"></div>
        
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* Badge */}
        <div className="mb-8 sm:mb-12">
          {/* Optional badge can be added here */}
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6 max-w-5xl px-4">
          <span className="text-white">What </span>
          <span className="italic bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">Vision</span>
          <span className="text-white">  will you transform into design today?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center mb-8 sm:mb-12 max-w-2xl px-4">
          Upload. Design. VisionMesh makes it stunning
        </p>

        {/* Upload Section */}
        <div className="w-full max-w-2xl px-4">
          <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl border-2 border-red-900/50 hover:border-red-600 shadow-2xl shadow-red-900/20 overflow-hidden transition-all duration-300">
            {/* Tabs */}
            <div className="flex border-b border-red-900/30">
              <button
                onClick={() => setActiveTab('upload')}
                className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 sm:after:w-16 after:h-0.5 after:bg-red-600'
                    : 'text-red-300/70 hover:text-red-200'
                }`}
              >
                Upload Screenshot
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'url'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 sm:after:w-16 after:h-0.5 after:bg-red-600'
                    : 'text-red-300/70 hover:text-red-200'
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
                      ? 'border-red-500 bg-red-500/10 backdrop-blur-sm'
                      : 'border-red-800/50 hover:border-red-500 bg-red-900/10'
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
                    {/* Upload Icon with Red Glow */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-600/30 blur-2xl rounded-full"></div>
                        <svg
                          className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 relative z-10"
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

                    <p className="text-white text-sm sm:text-base mb-1 sm:mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-red-300/70 text-xs sm:text-sm">
                      PNG, JPG, or JPEG (max. 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="Enter website URL..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-red-900/20 border border-red-800/50 rounded-lg text-white placeholder-red-300/50 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              )}

              {/* Start Analysis Button */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button 
                  onClick={() => navigate('/evaluation')}
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transform hover:scale-105"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;
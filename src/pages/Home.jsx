import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const textVariations = [
    "What Vision will you transform into design today?",
    "Transform Ideas into Stunning Designs",
    "Where Vision Meets Innovation",
    "Design Beyond Imagination"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textVariations.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

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
      {/* Sky Blue and Dark Blue Abstract Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d]" />
        
        {/* Animated fluid blue shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-sky-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-bounce delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse delay-500"></div>
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1500"></div>
        </div>

        {/* Geometric blue patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-pulse"></div>
          <div className="absolute top-20 right-0 w-1 h-64 bg-sky-500 animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-10 w-2 h-32 bg-blue-600 animate-pulse delay-700"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-1 bg-sky-400 transform rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 right-20 w-32 h-1 bg-cyan-300 transform -rotate-45 animate-pulse delay-1200"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.4 + Math.random() * 0.5,
                backgroundColor: Math.random() > 0.5 ? '#22d3ee' : '#0ea5e9',
                boxShadow: `0 0 ${5 + Math.random() * 10}px ${Math.random() > 0.5 ? '#22d3ee' : '#0ea5e9'}`
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glowing horizon effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a192f] to-transparent"></div>
        
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

        {/* Wave-like patterns */}
        <div className="absolute bottom-0 w-full h-32">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-blue-900/30"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-blue-800/30"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-blue-700/20"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* Badge */}
        <div className="mb-8 sm:mb-12">
          {/* Optional badge can be added here */}
        </div>

        {/* Animated Main Headline */}
        <div className="h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center mb-4 sm:mb-6 max-w-5xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <span className="text-white">What </span>
            <span className="italic bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
              Vision
            </span>
            <span className="text-white"> will you transform into design today?</span>
          </h1>
        </div>

        {/* Animated Text Variations */}
        <div className="h-12 sm:h-14 md:h-16 mb-6 sm:mb-8 overflow-hidden">
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
        <div className="w-full max-w-2xl px-4">
          <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border-2 border-blue-800/50 hover:border-blue-500 shadow-2xl shadow-blue-900/20 overflow-hidden transition-all duration-300">
            {/* Tabs */}
            <div className="flex border-b border-blue-900/30">
              <button
                onClick={() => setActiveTab('upload')}
                className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 sm:after:w-16 after:h-0.5 after:bg-blue-500'
                    : 'text-blue-300/70 hover:text-blue-200'
                }`}
              >
                Upload Screenshot
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`relative flex-1 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'url'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 sm:after:w-16 after:h-0.5 after:bg-blue-500'
                    : 'text-blue-300/70 hover:text-blue-200'
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
                      ? 'border-blue-400 bg-blue-500/20 backdrop-blur-sm'
                      : 'border-blue-700/50 hover:border-blue-400 bg-blue-900/10'
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
                    {/* Upload Icon with Blue Glow */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full"></div>
                        <svg
                          className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 relative z-10"
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
                    <p className="text-blue-300/70 text-xs sm:text-sm">
                      PNG, JPG, or JPEG (max. 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="Enter website URL..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-900/20 border border-blue-800/50 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              )}

              {/* Start Analysis Button */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button 
                  onClick={() => navigate('/evaluation')}
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 animate-pulse"
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
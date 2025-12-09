import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* Main Headline */}
        <div className="h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center mb-4 sm:mb-6 max-w-5xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <span className="text-white">What </span>
            <span className="italic bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent animate-gradient bg-300%">
              Vision
            </span>
            <span className="text-white"> will you transform into design today?</span>
          </h1>
        </div>

        {/* Animated Text Variations */}
        <div className="h-12 sm:h-14 md:h-16 -mb-10 sm:-mb-16 overflow-hidden">
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
        <div className="w-full  max-w-2xl px-4">
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

                    <p className="text-white text-sm sm:text-base mb-1 sm:mb-2">
                      Click to upload or drag and drop
                    </p>
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50 transition-colors"
                  />
                </div>
              )}

              {/* Start Analysis Button */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button 
                  onClick={() => navigate('/evaluation')}
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-white text-black font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Start Analysis
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
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">Always the best, without switching tools</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            VisionMesh integrates the frontier design analysis tools from the AI labs directly inside one familiar visual interface. 
            No more AI anxiety or juggling multiple platforms.
          </p>
        </div>

        {/* Bottom - Two Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 98% less errors */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <div className="text-7xl sm:text-8xl font-bold text-white mb-2">98%</div>
              <div className="text-2xl sm:text-3xl text-gray-400 font-semibold">less errors</div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base max-w-sm">
              VisionMesh automatically tests, refactors, and iterates reducing errors so you keep building instead of fixing.
            </p>
          </div>

          {/* Build big without breaking */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-10 flex flex-col">
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4">Build big without breaking</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              VisionMesh handles <span className="text-white font-semibold">projects 1,000 times larger</span> than before. 
              It's improved built-in context management can handle complexity and keep your projects running smoothly.
            </p>
            <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mt-4 flex items-center justify-center">
              <div className="text-6xl sm:text-7xl font-bold text-white/30">1000x</div>
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
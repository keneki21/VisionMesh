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
      {/* Curved Horizon with Glowing Edge */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1b2a] to-black" />
        
        {/* Curved horizon element */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh]">
          {/* The curved surface */}
          <div 
            className="absolute inset-x-0 bottom-0 h-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, #000000 50%)',
            }}
          />
          
          {/* SVG for the curved glowing edge */}
          <svg 
            className="absolute inset-x-0 bottom-0 w-full h-full"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0 }} />
                <stop offset="15%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                <stop offset="85%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0 }} />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Curved path for the horizon */}
            <path
              d="M0,280 Q360,80 720,60 T1440,280 L1440,800 L0,800 Z"
              fill="#000000"
            />
            
            {/* Glowing edge line */}
            <path
              d="M0,280 Q360,80 720,60 T1440,280"
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              filter="url(#glow)"
            />
            
            {/* Stars under the horizon */}
            <g>
              {/* Create random-looking stars with varying sizes and opacity */}
              <circle cx="120" cy="250" r="1.5" fill="white" opacity="0.8" />
              <circle cx="280" cy="320" r="1" fill="white" opacity="0.6" />
              <circle cx="450" cy="280" r="1.2" fill="white" opacity="0.9" />
              <circle cx="580" cy="350" r="0.8" fill="white" opacity="0.5" />
              <circle cx="720" cy="240" r="1.5" fill="white" opacity="0.8" />
              <circle cx="850" cy="310" r="1" fill="white" opacity="0.7" />
              <circle cx="980" cy="270" r="1.3" fill="white" opacity="0.8" />
              <circle cx="1150" cy="340" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1280" cy="290" r="1.2" fill="white" opacity="0.7" />
              
              <circle cx="200" cy="380" r="1" fill="white" opacity="0.5" />
              <circle cx="350" cy="420" r="1.2" fill="white" opacity="0.7" />
              <circle cx="520" cy="450" r="0.8" fill="white" opacity="0.6" />
              <circle cx="680" cy="390" r="1.4" fill="white" opacity="0.8" />
              <circle cx="820" cy="460" r="1" fill="white" opacity="0.6" />
              <circle cx="950" cy="410" r="1.1" fill="white" opacity="0.7" />
              <circle cx="1100" cy="480" r="0.9" fill="white" opacity="0.5" />
              <circle cx="1240" cy="430" r="1.3" fill="white" opacity="0.8" />
              
              <circle cx="90" cy="520" r="1.2" fill="white" opacity="0.6" />
              <circle cx="240" cy="560" r="0.9" fill="white" opacity="0.7" />
              <circle cx="410" cy="590" r="1.1" fill="white" opacity="0.6" />
              <circle cx="560" cy="540" r="1.4" fill="white" opacity="0.9" />
              <circle cx="740" cy="580" r="0.8" fill="white" opacity="0.5" />
              <circle cx="890" cy="620" r="1.2" fill="white" opacity="0.7" />
              <circle cx="1030" cy="570" r="1" fill="white" opacity="0.8" />
              <circle cx="1180" cy="610" r="1.3" fill="white" opacity="0.7" />
              <circle cx="1320" cy="550" r="0.9" fill="white" opacity="0.6" />
              
              {/* <circle cx="160" cy="680" r="1.1" fill="white" opacity="0.6" />
              <circle cx="310" cy="720" r="1.3" fill="white" opacity="0.8" />
              <circle cx="480" cy="690" r="0.9" fill="white" opacity="0.5" />
              <circle cx="640" cy="740" r="1.2" fill="white" opacity="0.7" />
              <circle cx="780" cy="710" r="1.4" fill="white" opacity="0.9" />
              <circle cx="920" cy="760" r="1" fill="white" opacity="0.6" />
              <circle cx="1070" cy="700" r="1.2" fill="white" opacity="0.7" />
              <circle cx="1210" cy="730" r="0.8" fill="white" opacity="0.5" /> */}
            </g>
          </svg>
          
          {/* Additional glow overlay */}
          <div 
            className="absolute inset-x-0 top-1/2 h-32 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(96, 165, 250, 0.15), transparent)',
            }}
          />
        </div>
      </div>

      {/* Sun in top right corner with rays */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] overflow-visible pointer-events-none z-[5]">
        {/* Sun glow */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-gradient-radial from-yellow-300/50 via-orange-400/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-radial from-yellow-200/60 via-orange-300/40 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        {/* Sun rays */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px]">
          <div className="absolute inset-0 opacity-40">
            {/* Multiple light rays at different angles */}
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[20deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[35deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[50deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[65deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[80deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[95deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[110deg] blur-md"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-[1000px] bg-gradient-to-b from-yellow-200/80 via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-[125deg] blur-md"></div>
          </div>
        </div>
        
        {/* Actual sun circle */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Main sun gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-100 via-orange-400 to-orange-500 shadow-2xl shadow-orange-400/80"></div>
            
            {/* Sunspots - darker areas */}
            <div className="absolute top-8 right-12 w-6 h-6 rounded-full bg-orange-600/40 blur-[2px]"></div>
            <div className="absolute top-16 right-20 w-4 h-4 rounded-full bg-orange-700/30 blur-[1px]"></div>
            <div className="absolute bottom-20 left-16 w-8 h-8 rounded-full bg-orange-600/35 blur-[3px]"></div>
            <div className="absolute bottom-12 right-16 w-5 h-5 rounded-full bg-orange-700/40 blur-[2px]"></div>
            <div className="absolute top-20 left-14 w-3 h-3 rounded-full bg-orange-600/30 blur-[1px]"></div>
            <div className="absolute top-12 left-20 w-7 h-7 rounded-full bg-orange-700/35 blur-[2px]"></div>
            
            {/* Brighter highlights for texture */}
            <div className="absolute top-10 left-10 w-10 h-10 rounded-full bg-yellow-200/30 blur-md"></div>
            <div className="absolute bottom-14 right-14 w-8 h-8 rounded-full bg-yellow-100/25 blur-md"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32">
        {/* Badge */}
        <div className="mb-12">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-blue-300 font-medium">Introducing Bolt V2</span>
          </div> */}
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-4xl font-bold text-center mb-6 max-w-5xl">
          <span className="text-white">What </span>
          <span className="italic bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">Vision</span>
          <span className="text-white">  will you transform into design today?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 text-center mb-12 max-w-2xl">
          Upload. Design. VisionMesh makes it stunning
        </p>

        {/* Upload Section */}
        <div className="w-full max-w-2xl">
          <div className="relative bg-[#1a1a1a] backdrop-blur-xl rounded-2xl border-2 border-gray-700 hover:border-red-600 shadow-2xl overflow-hidden transition-colors">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setActiveTab('upload')}
                className={`relative flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-red-600'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Upload Screenshot
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`relative flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'url'
                    ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-red-600'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Enter URL
              </button>
            </div>

            {/* Upload Area */}
            <div className="p-8">
              {activeTab === 'upload' ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-red-500 bg-red-500/5'
                      : 'border-gray-700 hover:border-red-500'
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
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full"></div>
                        <svg
                          className="w-16 h-16 text-red-600 relative z-10"
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

                    <p className="text-white text-base mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG, or JPEG (max. 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="Enter website URL..."
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              )}
              

              {/* Start Analysis Button */}
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={() => navigate('/evaluation')}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

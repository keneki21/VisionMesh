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
    <div className="min-h-screen h-screen flex relative bg-gray-950 overflow-hidden">
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
            <path
              d="M0,300 Q360,80 720,60 T1440,300"
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              filter="url(#glow)"
              
            />
            <path
              d="M0,290 Q360,80 720,60 T1440,290"
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              filter="url(#glow)"
            />
            <path
              d="M0,295 Q360,80 720,60 T1440,295"
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              filter="url(#glow)"
            />
            <path
              d="M0,299 Q360,80 720,60 T1440,299"
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              filter="url(#glow)"
            />
            {/* Stars under the horizon */}
            <g>
              {/* Stars above horizon line (cy < 280) */}
              <circle cx="100" cy="50" r="1.2" fill="white" opacity="0.8" />
              <circle cx="250" cy="80" r="0.9" fill="white" opacity="0.6" />
              <circle cx="380" cy="120" r="1.4" fill="white" opacity="0.9" />
              <circle cx="520" cy="90" r="1.1" fill="white" opacity="0.7" />
              <circle cx="670" cy="140" r="0.8" fill="white" opacity="0.5" />
              <circle cx="800" cy="100" r="1.3" fill="white" opacity="0.8" />
              <circle cx="940" cy="160" r="1.0" fill="white" opacity="0.7" />
              <circle cx="1080" cy="110" r="1.2" fill="white" opacity="0.8" />
              <circle cx="1220" cy="180" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1350" cy="130" r="1.1" fill="white" opacity="0.7" />
              
              <circle cx="150" cy="200" r="1.3" fill="white" opacity="0.8" />
              <circle cx="300" cy="220" r="1.0" fill="white" opacity="0.7" />
              <circle cx="460" cy="190" r="0.8" fill="white" opacity="0.6" />
              <circle cx="600" cy="240" r="1.4" fill="white" opacity="0.9" />
              <circle cx="750" cy="210" r="1.1" fill="white" opacity="0.7" />
              <circle cx="890" cy="260" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1030" cy="230" r="1.2" fill="white" opacity="0.8" />
              <circle cx="1170" cy="250" r="1.0" fill="white" opacity="0.7" />
              <circle cx="1310" cy="200" r="1.3" fill="white" opacity="0.8" />
              
              <circle cx="70" cy="150" r="0.9" fill="white" opacity="0.6" />
              <circle cx="180" cy="60" r="1.1" fill="white" opacity="0.7" />
              <circle cx="340" cy="170" r="1.3" fill="white" opacity="0.8" />
              <circle cx="490" cy="140" r="0.8" fill="white" opacity="0.5" />
              <circle cx="630" cy="70" r="1.4" fill="white" opacity="0.9" />
              <circle cx="770" cy="180" r="1.0" fill="white" opacity="0.7" />
              <circle cx="910" cy="120" r="1.2" fill="white" opacity="0.8" />
              <circle cx="1050" cy="160" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1190" cy="90" r="1.1" fill="white" opacity="0.7" />
              <circle cx="1330" cy="270" r="1.3" fill="white" opacity="0.8" />
              
              {/* Additional dense star layer above horizon */}
              <circle cx="45" cy="100" r="0.8" fill="white" opacity="0.5" />
              <circle cx="125" cy="135" r="1.0" fill="white" opacity="0.7" />
              <circle cx="210" cy="110" r="0.9" fill="white" opacity="0.6" />
              <circle cx="285" cy="155" r="1.1" fill="white" opacity="0.7" />
              <circle cx="365" cy="95" r="0.8" fill="white" opacity="0.5" />
              <circle cx="420" cy="145" r="1.3" fill="white" opacity="0.8" />
              <circle cx="505" cy="175" r="1.0" fill="white" opacity="0.7" />
              <circle cx="575" cy="115" r="0.9" fill="white" opacity="0.6" />
              <circle cx="655" cy="165" r="1.2" fill="white" opacity="0.8" />
              <circle cx="715" cy="135" r="0.8" fill="white" opacity="0.5" />
              <circle cx="835" cy="85" r="1.1" fill="white" opacity="0.7" />
              <circle cx="875" cy="195" r="1.0" fill="white" opacity="0.7" />
              <circle cx="965" cy="105" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1015" cy="185" r="1.3" fill="white" opacity="0.8" />
              <circle cx="1105" cy="145" r="1.1" fill="white" opacity="0.7" />
              <circle cx="1155" cy="65" r="0.8" fill="white" opacity="0.5" />
              <circle cx="1245" cy="125" r="1.2" fill="white" opacity="0.8" />
              <circle cx="1295" cy="155" r="1.0" fill="white" opacity="0.7" />
              <circle cx="1375" cy="95" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1415" cy="235" r="1.1" fill="white" opacity="0.7" />
              
              <circle cx="55" cy="185" r="1.0" fill="white" opacity="0.7" />
              <circle cx="135" cy="225" r="0.9" fill="white" opacity="0.6" />
              <circle cx="225" cy="245" r="1.2" fill="white" opacity="0.8" />
              <circle cx="315" cy="265" r="0.8" fill="white" opacity="0.5" />
              <circle cx="405" cy="215" r="1.1" fill="white" opacity="0.7" />
              <circle cx="535" cy="255" r="1.0" fill="white" opacity="0.7" />
              <circle cx="645" cy="235" r="0.9" fill="white" opacity="0.6" />
              <circle cx="695" cy="195" r="1.3" fill="white" opacity="0.8" />
              <circle cx="825" cy="245" r="1.1" fill="white" opacity="0.7" />
              <circle cx="955" cy="225" r="0.8" fill="white" opacity="0.5" />
              <circle cx="995" cy="265" r="1.2" fill="white" opacity="0.8" />
              <circle cx="1115" cy="205" r="1.0" fill="white" opacity="0.7" />
              <circle cx="1205" cy="235" r="0.9" fill="white" opacity="0.6" />
              <circle cx="1265" cy="245" r="1.1" fill="white" opacity="0.7" />
              <circle cx="1385" cy="175" r="1.3" fill="white" opacity="0.8" />
              
              {/* Original stars below horizon */}
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
              
              <circle cx="160" cy="680" r="1.1" fill="white" opacity="0.6" />
              <circle cx="310" cy="720" r="1.3" fill="white" opacity="0.8" />
              <circle cx="480" cy="690" r="0.9" fill="white" opacity="0.5" />
              <circle cx="640" cy="740" r="1.2" fill="white" opacity="0.7" />
              <circle cx="780" cy="710" r="1.4" fill="white" opacity="0.9" />
              <circle cx="920" cy="760" r="1" fill="white" opacity="0.6" />
              <circle cx="1070" cy="700" r="1.2" fill="white" opacity="0.7" />
              <circle cx="1210" cy="730" r="0.8" fill="white" opacity="0.5" />
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
      <div className="absolute inset-0 z-0">
        <img 
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL8AzQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAACAwEABQQHBv/EAB4QAQEBAAMBAQEBAQAAAAAAAAIAAQMEYRESUSET/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APl1U9VmqnqgSUEopU0oElTSilTSgSVNKKVNKBJU0opU0oElTSilTSgSVNKKVNKBJQSjqp6oElT1RShqgWqnqs1Q1Qbqhu2ao7sC3Ybtm7Hdg3dj9utzIP0tKmlFKmlAkqaUUqaUCSppRSppQJKmlFKmlAkqaUUqaUCSppRSppQJKGqOqnqgWqGqOqGqBaqeqzVHdg7VZux3Y7sG7sd2zdsg77d8tzJZkGZksy3MnmQf3CVNKKVNKBJU0opU0oElTSilTSgSVNKKVNKBJU0opQSgSVNKOqGqBaqeqzVDVBuqG7duw3YFuw3bN2O7Bv2O7dbmQZ8lmSzLcyDsyWZbmTwwZhlhnmSwwf0aVNKKVNKBJU0opU0oElTSilTSgSUNUdVNKBaoao6oaoN1Q3bNUd2DtVm7Hdjuwbux3bN2yDvt1uZPMgOZPMuzJ5kGZk8NuGphgOGeGRM8MGYZYZ4Z4YPsSppRSppQJKmlFKCUC1U9UdUNUC1U9VmqGqDd2G7duw3YN3Y7sd2zdg3dj9utzIMzJZksy3Mg7MlmW5k8MGYZ4ZYZkwHDUw24amGA4amGRMyYCTUwyJqYYPjSppWaqeqBaqeqzVT1QLVDVZqjuwdux3bN2O7Bu7Hds3bIOuzLcyeZAcyeZdmTzIMzJZk8M8MBwzwywzwwZhnhkTUJgOGoTaTUJgJNQmRNQmAkz/MyamGD+c1Q1R1R1Qbqhu3bsN2DtVm7Zux3YN3Y/brcyDMyWZLMtzIOzJZluZUwwHDPDLDPDAcNTDbhqEwHDUwywzJgwmZMiahMBJqEyJqEwEmoTImoTASamGRNTDB/D7sd2zdjuwbux3bN2yDt275bmTzIDmTzJZluZB2ZLDbmVMMBwzwywzJgzDMmRNQmA4ahMsMyYCTUJkTUJgJNQmRNQmAk1CZE1CYCTUJkTUJgJM/zMmeGD823Y/brcyDPksyWZPMgOZLMtzKmGA5k8MsM8MGYZ4ZYZ4YCTUwyJqYYCTPDImoTASahMiahMBJqEyJqkwAmoTMmoTASZkyJqEwEmoTImeGDCZYZ4ZfmD8szJZk8yWGA5k8yWGeGA4amG3DUJgOGZMiahMBJqYZE1CYCTMmRNQmAk1CZk1CYCTUJkTUJgJNQmRNQmAE1CZE1CYCTUJkTPDASZ4ZYZ4YMwywyzJZkH5XmVMMM5MnnJkDwzwwzkNTOQwImoTA8hqHkP9yBk1CYHkPkzyHyBk1CYHkPlQ8uQUJqE0zymoeU+QUJqEwPIfJnkPkFCahMDyHyZ5D5AyahMM5DUPIfIHhnhgeQ1M5D5A8M8MM5DPOQwPDLMjnJk8eQbmTzI4zL95B+P/Fd9V9m8OR3iyD585NtzmqbxZT3iyB5zSzmo/8APY/nYPrzn2pnPfB/v9u/S/sHonsbUzse3mZy7bnLsHqnse1D2Pbyc5dnnNsHrns7/ah7Pt4+c2zzm2D2T2fah7Pt4uc+1M59g9o9n2oe17eKefZnn2D2z2fah7Pt4h7G1D2Ng9s9n2Z7Ht4p7G1D2Ng9o9j2pnY9vFPY2oexsHtZ2PZZ2Pbxz2NqZz7B/9k=" 
          alt="" 
          
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="w-full max-w-[450px]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-2 text-center text-white font-extrabold">
            Vision<span className="text-[#e50914]">Mesh</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#b3b3b3] mb-8 sm:mb-12 text-center">Analyzing and Weaving Better Visuals</p>

          <div className="bg-white/5 backdrop-blur-md border-b rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="sr-only">Email</label>
                <input 
                  name="email" 
                  type="email" 
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
                  placeholder="Enter your password" 
                  required 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-[#666] transition-all duration-300 focus:outline-none focus:border-white focus:shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#e50914] text-white rounded-lg font-medium transition-all duration-300 hover:bg-[#b20710] hover:shadow-[0_4px_20px_rgba(229,9,20,0.4)]"
              >
                Continue with email
              </button>

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
                  onClick={handleLogin}
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
                  onClick={handleLogin}
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

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

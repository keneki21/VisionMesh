import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Evaluation() {
  const navigate = useNavigate();
  const [selectedHistory, setSelectedHistory] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      name: 'E-commerce Homepage Analysis',
      date: 'Nov 15, 2024',
      time: '14:30 PM',
      thumbnail: '🛒',
      score: 87,
      category: 'E-commerce'
    },
    {
      id: 2,
      name: 'Portfolio Website Review',
      date: 'Nov 14, 2024',
      time: '10:15 AM',
      thumbnail: '💼',
      score: 92,
      category: 'Portfolio'
    },
    {
      id: 3,
      name: 'SaaS Dashboard Design',
      date: 'Nov 12, 2024',
      time: '16:45 PM',
      thumbnail: '📊',
      score: 78,
      category: 'SaaS'
    }
  ]);

  const [designs, setDesigns] = useState([
    { 
      id: 1, 
      title: 'Current Design', 
      score: 78, 
      category: 'Current',
      description: 'Original website design analysis',
      issues: ['Slow loading images', 'Poor mobile layout', 'Low contrast ratios'],
      improvements: ['Image optimization', 'Responsive grid', 'Accessibility fixes']
    },
    { 
      id: 2, 
      title: 'Optimized Performance', 
      score: 92, 
      category: 'Enhanced',
      description: 'Performance-focused improvements',
      issues: ['Fixed all performance issues', 'Enhanced loading speed'],
      improvements: ['Compressed assets', 'Lazy loading', 'Better caching']
    },
    { 
      id: 3, 
      title: 'Modern Redesign', 
      score: 85, 
      category: 'Redesigned',
      description: 'Complete visual overhaul',
      issues: ['Updated color scheme', 'Improved typography'],
      improvements: ['Modern aesthetics', 'Better user flow', 'Enhanced branding']
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0a1628] flex overflow-hidden pt-16">
      {/* Floating History Button */}
      <button
        onMouseEnter={() => setShowSidebar(true)}
        className="fixed left-4 bottom-6 z-40 w-12 h-12 rounded-xl bg-black hover:bg-[#e50914] border-2 border-white/20 hover:border-white/40 shadow-lg shadow-red-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Left Sidebar - History */}
      <div 
        className={`fixed left-0 top-16 bottom-0 bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-300 z-50 ${
          showSidebar ? 'translate-x-0 w-80' : '-translate-x-full w-80'
        }`}
        onMouseLeave={() => setShowSidebar(false)}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search analysis history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm text-gray-400 font-semibold">Recent Analysis Sessions</p>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {historyItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedHistory(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  selectedHistory === index
                    ? 'bg-[#e50914] border-red-500 shadow-lg shadow-red-600/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl bg-white/10 rounded-lg p-2">{item.thumbnail}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold text-sm truncate ${
                        selectedHistory === index ? 'text-white' : 'text-gray-200'
                      }`}>
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span className="text-white text-xs font-bold">{item.score}</span>
                      </div>
                    </div>
                    <p className={`text-xs ${
                      selectedHistory === index ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {item.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${
                        selectedHistory === index ? 'text-white/70' : 'text-gray-600'
                      }`}>
                        {item.date}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className={`text-xs ${
                        selectedHistory === index ? 'text-white/70' : 'text-gray-600'
                      }`}>
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Analysis Button */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={() => navigate('/home')}
            className="w-full px-4 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Website Analysis
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-black overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                Website Analysis Report
              </h1>
              {historyItems.length > 0 ? (
                <p className="text-gray-400 text-lg">
                  {historyItems[selectedHistory].name} • Analyzed on {historyItems[selectedHistory].date}
                </p>
              ) : (
                <p className="text-gray-400 text-lg">
                  Upload a website screenshot or URL to begin analysis
                </p>
              )}
            </div>
            
            {historyItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => navigate('/code-generation')}
                  className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-white/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Generate Frontend Code
                </button>
                <button className="px-6 py-3 bg-[#e50914] hover:bg-[#b20710] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-600/30">
                  Apply Optimized Design
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Content */}
        <div className="p-8">
          {designs.length > 0 ? (
            <>
              {/* Design Analysis Cards */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300 group"
                  >
                    {/* Design Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{design.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            design.category === 'Current'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : design.category === 'Enhanced'
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {design.category}
                          </span>
                          <div className="bg-black/60 rounded-full px-3 py-1 border border-white/20">
                            <span className="text-white font-bold text-sm">{design.score}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">{design.description}</p>
                    </div>

                    {/* Design Preview */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl opacity-40">🌐</div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Preview Design
                        </button>
                      </div>
                    </div>

                    {/* Analysis Details */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-red-400 font-semibold text-sm mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Issues Fixed
                          </h4>
                          <ul className="text-xs text-gray-400 space-y-1">
                            {design.issues.map((issue, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-red-400 mt-0.5">•</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-green-400 font-semibold text-sm mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Improvements
                          </h4>
                          <ul className="text-xs text-gray-400 space-y-1">
                            {design.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-green-400 mt-0.5">•</span>
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-300 text-sm border border-white/10">
                          Compare
                        </button>
                        <button className="flex-1 px-4 py-2.5 bg-[#e50914] hover:bg-[#b20710] text-white rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg shadow-red-600/20">
                          Select Design
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Analysis Section */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Technical Analysis Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Loading Speed</span>
                            <span className="text-green-400">3.2s → 1.4s</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Mobile Responsiveness</span>
                            <span className="text-green-400">72% → 95%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-3">Code Quality</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Accessibility Score</span>
                            <span className="text-green-400">A+</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">SEO Optimization</span>
                            <span className="text-yellow-400">B+</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-8xl mb-6 opacity-30">🌐</div>
              <h3 className="text-2xl font-bold text-white mb-3">No Website Analysis Yet</h3>
              <p className="text-gray-400 text-center text-lg mb-8 max-w-md">
                Upload a website screenshot or enter a URL to analyze and get optimization suggestions
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/home')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border border-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Screenshot
                </button>
                <button
                  onClick={() => navigate('/code-generation')}
                  className="px-6 py-3 bg-[#e50914] hover:bg-[#b20710] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Generate Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Evaluation;
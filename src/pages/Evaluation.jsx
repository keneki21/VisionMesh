import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Evaluation() {
  const navigate = useNavigate();
  const [selectedHistory, setSelectedHistory] = useState(0);
   // Sample design data
  const designs = [
    { id: 1, title: 'Original Design', score: 78, category: 'Current' },
    { id: 2, title: 'Improved Layout', score: 92, category: 'Suggested' },
    { id: 3, title: 'Color Variant', score: 85, category: 'Suggested' },
    { id: 4, title: 'Modern Style', score: 88, category: 'Suggested' },
  ];

  const [historyItems, setHistoryItems] = useState([]);
//   const [designs, setDesigns] = useState([]);

  return (
    <div className="min-h-screen bg-black flex overflow-hidden pt-20">
      {/* Left Sidebar - History (20%) */}
      <div className="w-[20%] bg-[#0a0a0a] border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">History</h2>
            <button
              onClick={() => navigate('/home')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-400 font-bold">Your analysis history</p>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {historyItems.length > 0 ? (
              historyItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedHistory(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedHistory === index
                      ? 'bg-[#e50914] shadow-lg shadow-red-600/30'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{item.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate ${
                        selectedHistory === index ? 'text-white' : 'text-gray-200'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-xs mt-1 ${
                        selectedHistory === index ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {item.date}
                      </p>
                      <p className={`text-xs ${
                        selectedHistory === index ? 'text-white/70' : 'text-gray-600'
                      }`}>
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-5xl mb-4 opacity-30">📂</div>
                <p className="text-gray-500 text-sm text-center">No analysis history yet</p>
                <p className="text-gray-600 text-xs text-center mt-1">Start a new analysis to see results here</p>
              </div>
            )}
          </div>
        </div>

        {/* New Analysis Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate('/home')}
            className="w-full px-4 py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </button>
        </div>
      </div>

      {/* Right Side - Designs (70%) */}
      <div className="flex-1 bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-black overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-white">
              Design Evaluation
            </h1>
            {historyItems.length > 0 && (
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
                <button className="px-4 py-2 bg-[#e50914] hover:bg-[#b20710] text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-red-600/30">
                  Apply Design
                </button>
              </div>
            )}
          </div>
          {historyItems.length > 0 ? (
            <p className="text-gray-400">
              {historyItems[selectedHistory].name} - Analyzed on {historyItems[selectedHistory].date}
            </p>
          ) : (
            <p className="text-gray-400">
              Upload a design to start analyzing
            </p>
          )}
        </div>

        {/* Designs Grid */}
        <div className="p-8">
          {designs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300 group"
                  >
                    {/* Design Preview */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-50">🎨</div>
                      </div>
                      
                      {/* Score Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-white font-bold text-lg">{design.score}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          design.category === 'Current'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {design.category}
                        </span>
                      </div>
                    </div>

                    {/* Design Info */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2">{design.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        AI-generated design based on best practices and modern trends
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-400 mb-1">Layout</div>
                          <div className="text-lg font-bold text-white">A+</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-400 mb-1">Colors</div>
                          <div className="text-lg font-bold text-white">A</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-400 mb-1">UX</div>
                          <div className="text-lg font-bold text-white">A+</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg font-medium transition-all duration-300 text-sm">
                          View Details
                        </button>
                        <button className="flex-1 px-4 py-2 bg-[#e50914] hover:bg-[#b20710] text-white rounded-lg font-medium transition-all duration-300 text-sm shadow-lg shadow-red-600/20">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Analysis Insights */}
              <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Strong Points</h4>
                        <p className="text-gray-400 text-sm">Clear hierarchy, consistent spacing, modern color palette</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Improvements</h4>
                        <p className="text-gray-400 text-sm">Enhance contrast ratios, optimize mobile layout, add micro-interactions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-8xl mb-6 opacity-30">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Designs Yet</h3>
              <p className="text-gray-400 text-center mb-8 max-w-md">
                Upload a screenshot or enter a URL from the home page to start analyzing and get design suggestions
              </p>
              <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 bg-[#e50914] hover:bg-[#b20710] text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-red-600/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start New Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Evaluation;

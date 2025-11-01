import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CodeGeneration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('code');
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  // State for steps - will be populated from backend
  const [steps, setSteps] = useState([]);

  // State for file structure - will be populated from backend
  const [fileStructure, setFileStructure] = useState([]);

  // State for generated code - will be populated from backend
  const [generatedCode, setGeneratedCode] = useState('');

  // Fetch data from backend when component mounts
  useEffect(() => {
    // TODO: Replace with actual API call
    // Example:
    // const fetchCodeGenerationData = async () => {
    //   try {
    //     const response = await fetch('/api/code-generation/session-id');
    //     const data = await response.json();
    //     setSteps(data.steps);
    //     setFileStructure(data.fileStructure);
    //     setGeneratedCode(data.code);
    //   } catch (error) {
    //     console.error('Error fetching code generation data:', error);
    //   }
    // };
    // fetchCodeGenerationData();
  }, []);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsGenerating(false);
            clearInterval(interval);
            return prev;
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'in-progress';
    return 'pending';
  };

  const renderFileTree = (files, level = 0) => {
    return files.map((file, index) => (
      <div key={index} style={{ marginLeft: `${level * 16}px` }}>
        <div className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-500/10 cursor-pointer transition-all duration-300 ${
          file.status === 'in-progress' ? 'bg-red-500/20 border border-red-500/30' : ''
        }`}>
          {file.type === 'folder' ? (
            <>
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="text-red-100 text-sm font-medium">{file.name}</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-red-200 text-sm">{file.name}</span>
              {file.status === 'completed' && (
                <svg className="w-4 h-4 text-green-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {file.status === 'in-progress' && (
                <svg className="w-4 h-4 text-red-400 ml-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </>
          )}
        </div>
        {file.children && file.expanded && (
          <div>{renderFileTree(file.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0000] to-[#2a0000] flex flex-col lg:flex-row pt-20">
      {/* Left Side - Process */}
      <div className="w-full lg:w-[350px] bg-gradient-to-b from-black to-[#1a0000] border-b lg:border-b-0 lg:border-r border-red-500/20 flex flex-col overflow-y-auto max-h-[50vh] lg:max-h-none">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-red-500/20 bg-black/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Code Generation
            </h2>
            <button
              onClick={() => navigate('/evaluation')}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 border border-red-500/20 hover:border-red-500/40"
            >
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {isGenerating ? (
            <div className="flex items-center gap-2 text-red-400">
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm font-medium bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
                Generating...
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Completed!</span>
            </div>
          )}
        </div>

        {/* Process Steps */}
        <div className="p-4 sm:p-6 border-b border-red-500/20 bg-black/30">
          <h3 className="text-xs sm:text-sm font-semibold text-red-300 mb-3 sm:mb-4 uppercase tracking-wide">Process</h3>
          <div className="space-y-4">
            {steps.length > 0 ? (
              steps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="flex items-start gap-3 group">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      status === 'completed' ? 'bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/25' :
                      status === 'in-progress' ? 'bg-red-500/20 border-2 border-red-500 shadow-lg shadow-red-500/25 animate-pulse' :
                      'bg-red-500/10 border-2 border-red-500/30 group-hover:border-red-500/50'
                    }`}>
                      {status === 'completed' ? (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : status === 'in-progress' ? (
                        <svg className="w-4 h-4 text-red-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-red-400/40 rounded-full group-hover:bg-red-400/60 transition-colors"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.icon}</span>
                        <h4 className={`font-medium transition-colors ${
                          status === 'completed' ? 'text-green-300' :
                          status === 'in-progress' ? 'text-red-300' :
                          'text-red-200/60 group-hover:text-red-200'
                        }`}>
                          {step.name}
                        </h4>
                      </div>
                      {status === 'in-progress' && (
                        <div className="mt-2 w-full bg-red-500/10 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-red-400 to-red-600 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <div className="text-4xl mb-3 opacity-30">⚙️</div>
                <p className="text-red-300/60 text-sm text-center">Waiting for generation to start...</p>
              </div>
            )}
          </div>
        </div>

        {/* File Structure */}
        <div className="p-4 sm:p-6 flex-1">
          <h3 className="text-xs sm:text-sm font-semibold text-red-300 mb-3 sm:mb-4 uppercase tracking-wide">File Structure</h3>
          <div className="bg-black/40 rounded-xl p-3 border border-red-500/20 backdrop-blur-sm">
            {fileStructure.length > 0 ? (
              renderFileTree(fileStructure)
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <div className="text-4xl mb-3 opacity-30">📂</div>
                <p className="text-red-300/60 text-sm text-center">No files created yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-red-500/20 space-y-3 bg-black/40">
          <button
            disabled={isGenerating}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm ${
              isGenerating
                ? 'bg-red-500/10 text-red-400/50 cursor-not-allowed border border-red-500/20'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-600/30 border border-red-500/30 hover:scale-105 transform transition-transform'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Project
          </button>
          <button
            disabled={isGenerating}
            className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border backdrop-blur-sm ${
              isGenerating
                ? 'bg-red-500/10 text-red-400/50 cursor-not-allowed border-red-500/20'
                : 'bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/30 hover:border-red-500/50 hover:scale-105 transform transition-transform'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy to Clipboard
          </button>
        </div>
      </div>

      {/* Right Side - Code/Preview */}
      <div className="flex-1 bg-gradient-to-br from-black via-[#1a0000] to-[#2a0000] flex flex-col min-h-[50vh]">
        {/* Tabs */}
        <div className="border-b border-red-500/20 bg-black/50 backdrop-blur-md">
          <div className="flex items-center px-3 sm:px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === 'code'
                  ? 'text-white border-red-500 bg-red-500/10'
                  : 'text-red-300 border-transparent hover:text-white hover:bg-red-500/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code
              </div>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'text-white border-red-500 bg-red-500/10'
                  : 'text-red-300 border-transparent hover:text-white hover:bg-red-500/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'code' && (
            <div className="h-full overflow-y-auto p-3 sm:p-6">
              <div className="bg-black/40 rounded-2xl border border-red-500/20 overflow-hidden backdrop-blur-sm">
                {/* Code Header */}
                <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-red-500/10 border-b border-red-500/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                    </div>
                    <span className="text-xs sm:text-sm text-red-300 font-mono"></span>
                  </div>
                  <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 border border-red-500/20 hover:border-red-500/40">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                {/* Code Content */}
                <pre className="p-3 sm:p-6 overflow-x-auto bg-gradient-to-br from-black to-[#1a0000]">
                  <code className="text-xs sm:text-sm text-red-100 font-mono leading-relaxed">
                    {generatedCode || (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="text-5xl mb-4 opacity-30">💻</div>
                        <p className="text-red-300/60">No code generated yet</p>
                        <p className="text-red-400/40 text-xs mt-2">Waiting for backend response...</p>
                      </div>
                    )}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full overflow-y-auto p-3 sm:p-6">
              <div className="bg-gradient-to-br from-black to-[#1a0000] rounded-2xl border border-red-500/20 overflow-hidden shadow-2xl backdrop-blur-sm">
                {/* Browser Header */}
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-red-500/10 border-b border-red-500/20">
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  </div>
                  <div className="hidden sm:flex flex-1 items-center gap-2 px-4 py-1.5 bg-black/30 rounded-lg border border-red-500/20">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-red-300">localhost:3000</span>
                  </div>
                </div>
                {/* Preview Content */}
                <div className="p-4 sm:p-8 lg:p-12 bg-gradient-to-br from-black via-[#1a0000] to-[#2a0000] min-h-[400px] sm:min-h-[600px]">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
                        
                      </h1>
                      <p className="text-xl text-red-200 mb-8">
                        
                      </p>
                    </div>
                    <div className="text-5xl font-bold text-white mb-4 p-8 flex items-center justify-center">
                      <div className="text-6xl text-red-400/30">No Preview Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeGeneration;
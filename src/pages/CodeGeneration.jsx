import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { API_BASE_URL } from '../config';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', js);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('css', css);

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vm_token')}` }
});

export default function CodeGeneration() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { report, imageUrl } = location.state || {};

  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState(null);
  const [files,         setFiles]         = useState([]);
  const [summary,       setSummary]       = useState('');
  const [selectedFile,  setSelectedFile]  = useState(null);
  const [copied,        setCopied]        = useState(false);

  useEffect(() => {
    if (!report) navigate('/evaluation');
  }, [report, navigate]);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setFiles([]);
    setSummary('');

    try {
      // If imageUrl is a data: URL, extract base64 + mimeType for multimodal
      let imageBase64 = null;
      let imageMimeType = null;
      if (imageUrl?.startsWith('data:')) {
        const [meta, data] = imageUrl.split(',');
        imageMimeType = meta.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
        imageBase64 = data;
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/code-generation`,
        { report, imageBase64, imageMimeType },
        authHeaders()
      );

      setFiles(data.files || []);
      setSummary(data.summary || '');
      setSelectedFile(data.files?.[0] || null);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyFile = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAll = () => {
    files.forEach(file => {
      const blob = new Blob([file.code], { type: 'text/plain' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = file.path.split('/').pop();
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const score100 = report ? Math.round((report.overall_score || 0) * 10) : 0;
  const scoreCol = score100 >= 70 ? 'text-green-400' : score100 >= 50 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/evaluation')}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Evaluation
          </button>
          <span className="text-gray-600">|</span>
          <h1 className="text-lg font-semibold">Optimized Design Generator</h1>
        </div>
        {report && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Original score:</span>
            <span className={`font-bold ${scoreCol}`}>{score100}/100</span>
          </div>
        )}
      </div>

      {/* Issues summary bar */}
      {report && !files.length && (
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800">
          <p className="text-sm text-gray-400 mb-3">Issues Gemini will fix:</p>
          <div className="flex flex-wrap gap-2">
            {(report.heuristics || []).filter(h => h.score < 7).map(h => (
              <span key={h.id}
                className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/30">
                {h.name} ({Math.round(h.score * 10)}/100)
              </span>
            ))}
            {(report.heuristics || []).filter(h => h.score >= 7).map(h => (
              <span key={h.id}
                className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-500 border border-green-500/20">
                ✓ {h.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">

        {/* Not generated yet */}
        {!loading && !files.length && !error && (
          <div className="text-center max-w-lg">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Generate Optimized React Code</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Gemini 1.5 Pro will analyze your evaluation results and generate a complete,
              improved React + Tailwind implementation that fixes every identified issue.
            </p>
            <button onClick={generate}
              className="px-8 py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-3 mx-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Optimized Design
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold mb-2">Generating optimized code...</h2>
            <p className="text-gray-400 text-sm">Gemini is analyzing your evaluation and writing React components</p>
            <p className="text-gray-500 text-xs mt-2">This takes 15–30 seconds</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center max-w-md">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 text-red-400 text-sm">{error}</div>
            <button onClick={generate}
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {files.length > 0 && (
          <div className="w-full max-w-7xl h-[calc(100vh-220px)] flex gap-4">

            {/* File tree sidebar */}
            <div className="w-56 flex-shrink-0 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Files
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {files.map(file => (
                  <button key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      selectedFile?.path === file.path
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}>
                    <svg className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{file.path.split('/').pop()}</span>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-gray-800 flex flex-col gap-2">
                <button onClick={generate}
                  className="w-full py-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
                  Regenerate
                </button>
                <button onClick={downloadAll}
                  className="w-full py-2 text-xs bg-white hover:bg-gray-100 text-black rounded-lg font-semibold transition-colors">
                  Download All
                </button>
              </div>
            </div>

            {/* Code viewer */}
            <div className="flex-1 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              {/* File tab bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-950">
                <span className="text-sm text-gray-300 font-mono">{selectedFile?.path}</span>
                <button onClick={copyFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">
                  {copied
                    ? <><svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied</>
                    : <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
                  }
                </button>
              </div>

              {/* Code */}
              <div className="flex-1 overflow-auto">
                {selectedFile && (
                  <SyntaxHighlighter
                    language={selectedFile.language || 'jsx'}
                    style={atomOneDark}
                    showLineNumbers
                    customStyle={{ margin: 0, borderRadius: 0, background: '#111827', minHeight: '100%', fontSize: '13px' }}
                  >
                    {selectedFile.code}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>

            {/* Summary panel */}
            {summary && (
              <div className="w-64 flex-shrink-0 bg-gray-900 rounded-xl border border-gray-800 p-4 overflow-y-auto">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">What was improved</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

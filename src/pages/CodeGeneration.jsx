import { useState, useEffect, useRef } from 'react';
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
SyntaxHighlighter.registerLanguage('html', xml);
SyntaxHighlighter.registerLanguage('css', css);

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vm_token')}` },
});

// ── File icon by extension ────────────────────────────────────────────────────
function FileIcon({ path }) {
  const ext = path.split('.').pop().toLowerCase();
  const map = {
    jsx: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'JSX' },
    js:  { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'JS' },
    html:{ bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'HTML' },
    css: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'CSS' },
    json:{ bg: 'bg-green-500/20', text: 'text-green-400', label: 'JSON' },
  };
  const cfg = map[ext] || { bg: 'bg-gray-500/20', text: 'text-gray-400', label: ext.toUpperCase() };
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold ${cfg.bg} ${cfg.text} flex-shrink-0`}>
      {cfg.label.slice(0, 3)}
    </span>
  );
}

// ── Build folder tree from flat file list ─────────────────────────────────────
function buildTree(files) {
  const root = {};
  files.forEach(f => {
    const parts = f.path.split('/');
    let node = root;
    parts.forEach((part, i) => {
      if (!node[part]) node[part] = i === parts.length - 1 ? { __file: f } : {};
      node = node[part];
    });
  });
  return root;
}

function TreeNode({ name, node, depth = 0, selectedFile, onSelect }) {
  const [open, setOpen] = useState(true);
  const isFile = !!node.__file;
  const indent = depth * 12;

  if (isFile) {
    const active = selectedFile?.path === node.__file.path;
    return (
      <button
        onClick={() => onSelect(node.__file)}
        className={`w-full text-left flex items-center gap-2 py-1 px-2 rounded text-sm transition-colors ${
          active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${8 + indent}px` }}
      >
        <FileIcon path={node.__file.path} />
        <span className="truncate">{name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center gap-2 py-1 px-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        style={{ paddingLeft: `${8 + indent}px` }}
      >
        <span className="text-xs">{open ? '▾' : '▸'}</span>
        <span className="text-yellow-600">📁</span>
        <span>{name}</span>
      </button>
      {open && Object.entries(node).map(([k, v]) => (
        <TreeNode key={k} name={k} node={v} depth={depth + 1} selectedFile={selectedFile} onSelect={onSelect} />
      ))}
    </div>
  );
}

// ── Terminal animation lines ──────────────────────────────────────────────────
const TERMINAL_STEPS = [
  { delay: 0,    text: '$ visionmesh generate --fix-all',          color: 'text-green-400' },
  { delay: 400,  text: '> Analyzing evaluation results...',         color: 'text-gray-300' },
  { delay: 900,  text: '> Identifying heuristic violations...',     color: 'text-gray-300' },
  { delay: 1400, text: '> Scaffolding project structure...',        color: 'text-gray-300' },
  { delay: 1900, text: '',                                           color: '' },
  { delay: 2000, text: '  Installing dependencies:',                color: 'text-gray-400' },
  { delay: 2300, text: '  + react@18.3.0',                          color: 'text-cyan-400' },
  { delay: 2550, text: '  + react-dom@18.3.0',                      color: 'text-cyan-400' },
  { delay: 2800, text: '  + react-router-dom@6.22.0',               color: 'text-cyan-400' },
  { delay: 3050, text: '  + tailwindcss@3.4.0',                     color: 'text-cyan-400' },
  { delay: 3300, text: '  + @headlessui/react@1.7.0',               color: 'text-cyan-400' },
  { delay: 3600, text: '',                                           color: '' },
  { delay: 3700, text: '  Generating components:',                  color: 'text-gray-400' },
  { delay: 4000, text: '  ✓ src/App.jsx',                           color: 'text-green-400' },
  { delay: 4300, text: '  ✓ src/components/Navbar.jsx',             color: 'text-green-400' },
  { delay: 4600, text: '  ✓ src/components/Footer.jsx',             color: 'text-green-400' },
  { delay: 4900, text: '  ✓ src/pages/Home.jsx',                    color: 'text-green-400' },
  { delay: 5200, text: '  ✓ src/pages/About.jsx',                   color: 'text-green-400' },
  { delay: 5500, text: '  ✓ src/pages/Contact.jsx',                 color: 'text-green-400' },
  { delay: 5800, text: '  ✓ preview.html',                          color: 'text-green-400' },
  { delay: 6200, text: '',                                           color: '' },
  { delay: 6300, text: '  Applying heuristic fixes...',             color: 'text-gray-400' },
  { delay: 6800, text: '  Building optimized bundle...',            color: 'text-gray-400' },
  { delay: 7400, text: '',                                           color: '' },
  { delay: 7500, text: '✅ Generation complete!',                    color: 'text-green-300 font-bold' },
];

function Terminal({ onDone }) {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    const timers = TERMINAL_STEPS.map(({ delay, text, color }) =>
      setTimeout(() => setLines(l => [...l, { text, color }]), delay)
    );
    const done = setTimeout(onDone, 8200);
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); clearInterval(blink); };
  }, [onDone]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);

  return (
    <div className="w-full max-w-2xl bg-gray-950 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-gray-500 font-mono">visionmesh — terminal</span>
      </div>
      <div className="p-4 font-mono text-sm min-h-64 max-h-80 overflow-y-auto">
        {lines.map((l, i) => (
          <div key={i} className={`${l.color} leading-6`}>{l.text || ' '}</div>
        ))}
        <span className={`inline-block w-2 h-4 bg-green-400 ml-0.5 ${cursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
        <div ref={endRef} />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const SESSION_KEY = 'vm_codegen_session';

export default function CodeGeneration() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // Restore report/imageUrl from sessionStorage if navigation state is gone (after refresh)
  const locationReport   = location.state?.report;
  const locationImageUrl = location.state?.imageUrl;
  const session = (() => { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } })();

  const report   = locationReport   || session?.report;
  const imageUrl = locationImageUrl || session?.imageUrl;

  const [phase,        setPhase]        = useState(() => session?.files?.length ? 'done' : 'idle');
  const [files,        setFiles]        = useState(() => session?.files || []);
  const [summary,      setSummary]      = useState(() => session?.summary || '');
  const [selectedFile, setSelectedFile] = useState(() => session?.files?.[0] || null);
  const [activeTab,    setActiveTab]    = useState('code');
  const [copied,       setCopied]       = useState(false);
  const [error,        setError]        = useState(null);
  const apiResultRef    = useRef(null);
  const terminalDoneRef = useRef(false);

  // Persist report + imageUrl to session on first load so refresh can restore them
  useEffect(() => {
    if (locationReport) {
      const existing = (() => { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } })();
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...existing, report: locationReport, imageUrl: locationImageUrl }));
    }
  }, [locationReport, locationImageUrl]);

  useEffect(() => { if (!report) navigate('/evaluation'); }, [report, navigate]);

  const processResult = (result) => {
    if (!result) { setError('No response received.'); setPhase('error'); return; }
    if (result.error) { setError(result.error); setPhase('error'); return; }
    const newFiles = result.files || [];
    setFiles(newFiles);
    setSummary(result.summary || '');
    setSelectedFile(newFiles[0] || null);
    setPhase('done');
    // Save generated code to session so refresh restores it
    const existing = (() => { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } })();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...existing, files: newFiles, summary: result.summary || '' }));
  };

  const generate = () => {
    setPhase('terminal');
    setError(null);
    setFiles([]);
    setSummary('');
    apiResultRef.current    = null;
    terminalDoneRef.current = false;

    // API call runs in background — result stored in ref
    axios.post(`${API_BASE_URL}/api/code-generation`, { report }, authHeaders())
      .then(res  => { apiResultRef.current = res.data; })
      .catch(err => { apiResultRef.current = { error: err.response?.data?.error || err.message }; })
      .finally(() => {
        // If terminal already finished, process now; else terminal's onDone will handle it
        if (terminalDoneRef.current) processResult(apiResultRef.current);
      });
  };

  const onTerminalDone = () => {
    terminalDoneRef.current = true;
    if (apiResultRef.current) {
      // API already done — show results immediately
      processResult(apiResultRef.current);
    } else {
      // API still running — show waiting spinner
      setPhase('waiting');
    }
  };

  const previewFile = files.find(f => f.path === 'preview.html');

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
      a.download = file.path.replace(/\//g, '_');
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const score100 = report ? Math.round((report.overall_score || 0) * 10) : 0;
  const scoreCol = score100 >= 70 ? 'text-green-400' : score100 >= 50 ? 'text-orange-400' : 'text-red-400';
  const tree     = buildTree(files.filter(f => f.path !== 'preview.html'));

  return (
    <div className="min-h-screen pt-20 sm:pt-24 bg-gray-950 text-white flex flex-col overflow-hidden">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-900 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => { sessionStorage.removeItem(SESSION_KEY); navigate('/evaluation'); }}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="text-gray-700">|</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm font-semibold">VisionMesh Code Generator</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {report && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500">Original score</span>
              <span className={`font-bold ${scoreCol}`}>{score100}/100</span>
            </div>
          )}
          {phase === 'done' && (
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${activeTab === 'code' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                {'</>  Code'}
              </button>
              <button onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${activeTab === 'preview' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                🌐 Preview
              </button>
            </div>
          )}
          {phase === 'done' && (
            <button onClick={downloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded text-xs font-semibold hover:bg-gray-100 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download All
            </button>
          )}
        </div>
      </div>

      {/* ── Idle state ── */}
      {phase === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
          {/* Issues chips */}
          <div className="max-w-2xl w-full">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 text-center">Issues to fix</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {(report?.heuristics || []).filter(h => h.score < 7).map(h => (
                <span key={h.id} className="px-3 py-1 rounded-full text-xs bg-red-500/15 text-red-400 border border-red-500/25">
                  ✗ {h.name} ({Math.round(h.score * 10)}/100)
                </span>
              ))}
              {(report?.heuristics || []).filter(h => h.score >= 7).map(h => (
                <span key={h.id} className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-500/70 border border-green-500/15">
                  ✓ {h.name}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Generate Optimized Website</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md">
              Gemini will generate a complete React + Tailwind website with live preview,
              fixing every heuristic violation from your evaluation.
            </p>
            <button onClick={generate}
              className="px-8 py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-3 mx-auto shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Full Website
            </button>
          </div>
        </div>
      )}

      {/* ── Waiting phase (terminal done but API still running) ── */}
      {phase === 'waiting' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
          <div className="w-12 h-12 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin" />
          <h2 className="text-lg font-semibold">Generating your website...</h2>
          <p className="text-gray-400 text-sm text-center max-w-sm">
            Gemini is generating 5 complete files. Usually under a minute — almost there...
          </p>
          <div className="flex gap-1 mt-2">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* ── Terminal phase ── */}
      {phase === 'terminal' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
          <div className="text-center mb-2">
            <h2 className="text-lg font-semibold text-white mb-1">Building your optimized website...</h2>
            <p className="text-gray-500 text-sm">Gemini is generating 5 files</p>
          </div>
          {phase === 'terminal' && <Terminal onDone={onTerminalDone} />}
        </div>
      )}

      {/* ── Error state ── */}
      {phase === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
          <div className="max-w-md text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-400 text-sm mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">{error}</p>
            <button onClick={generate}
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* ── Done: Code view ── */}
      {phase === 'done' && activeTab === 'code' && (
        <div className="flex-1 flex overflow-hidden">

          {/* File tree */}
          <div className="w-52 flex-shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-800 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Explorer</span>
            </div>
            <div className="flex-1 overflow-y-auto py-1">
              <div className="px-3 py-1 text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">
                visionmesh-optimized
              </div>
              {Object.entries(tree).map(([k, v]) => (
                <TreeNode key={k} name={k} node={v} selectedFile={selectedFile} onSelect={setSelectedFile} />
              ))}
              {previewFile && (
                <button
                  onClick={() => setSelectedFile(previewFile)}
                  className={`w-full text-left flex items-center gap-2 py-1 px-2 rounded text-sm transition-colors ml-0 ${
                    selectedFile?.path === 'preview.html' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ paddingLeft: '8px' }}
                >
                  <FileIcon path="preview.html" />
                  <span>preview.html</span>
                </button>
              )}
            </div>
            <div className="p-2 border-t border-gray-800">
              <button onClick={() => { sessionStorage.removeItem(SESSION_KEY); generate(); }}
                className="w-full py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors">
                ↻ Regenerate
              </button>
            </div>
          </div>

          {/* Code editor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-950 flex-shrink-0">
              <div className="flex items-center gap-2">
                {selectedFile && <FileIcon path={selectedFile.path} />}
                <span className="text-sm text-gray-300 font-mono">{selectedFile?.path || ''}</span>
              </div>
              <button onClick={copyFile}
                className="flex items-center gap-1.5 px-3 py-1 rounded text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">
                {copied
                  ? <><svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied</>
                  : <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
                }
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {selectedFile && (
                <SyntaxHighlighter
                  language={selectedFile.language || 'jsx'}
                  style={atomOneDark}
                  showLineNumbers
                  customStyle={{ margin: 0, borderRadius: 0, background: '#030712', minHeight: '100%', fontSize: '13px', lineHeight: '1.6' }}
                  lineNumberStyle={{ color: '#374151', paddingRight: '16px' }}
                >
                  {selectedFile.code}
                </SyntaxHighlighter>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          {summary && (
            <div className="w-56 flex-shrink-0 border-l border-gray-800 bg-gray-900 flex flex-col overflow-hidden">
              <div className="px-3 py-2 border-b border-gray-800">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">What was improved</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <p className="text-xs text-gray-300 leading-relaxed">{summary}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Done: Live preview ── */}
      {phase === 'done' && activeTab === 'preview' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-900 border-b border-gray-800 flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 bg-gray-800 rounded px-3 py-1 text-xs text-gray-400 font-mono flex items-center gap-2">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              visionmesh-preview — live preview
            </div>
            <button
              onClick={() => setActiveTab('code')}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {'</>'} View Code
            </button>
          </div>

          {previewFile ? (
            <iframe
              srcDoc={previewFile.code}
              className="flex-1 w-full border-0 bg-white"
              title="Live Preview"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              No preview.html generated. Switch to Code tab and click Regenerate.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Evaluation() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [report,   setReport]   = useState(location.state?.report   || null);
  const [imageUrl, setImageUrl] = useState(location.state?.imageUrl || null);
  const score100  = report ? Math.round(report.overall_score * 10) : 0;
  const strokeOff = 251.2 - 251.2 * score100 / 100;
  const scoreCol  = score100 >= 70 ? 'text-green-500'  : score100 >= 50 ? 'text-orange-500' : 'text-red-500';
  const strokeCol = score100 >= 70 ? 'text-green-500'  : score100 >= 50 ? 'text-orange-500' : 'text-red-500';

  const SEV = {
    high:   { bg: 'bg-red-500/20',    text: 'text-red-400',    label: 'Critical' },
    medium: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'High'     },
    low:    { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Warning'  },
  };

  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedId,     setSelectedId]     = useState(null);
  const [historyItems,   setHistoryItems]   = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const formatGroupDate = (iso) => {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const loadHistoryItem = async (item) => {
    setSelectedId(item.id);
    setReport(item.fullReport || null);
    setImageUrl(null);
    try {
      const { data: full } = await axios.get(`http://localhost:5000/api/history/${item.id}`);
      if (full.imageData) setImageUrl(`data:${full.imageMimeType};base64,${full.imageData}`);
    } catch (_) {}
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/history')
      .then(({ data }) => {
        const items = data.map(item => ({
          id:         item._id,
          name:       item.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          score:      item.score,
          grade:      item.grade,
          group:      formatGroupDate(item.createdAt),
          fullReport: item.report,
        }));
        setHistoryItems(items);
        if (items.length > 0) {
          setSelectedId(items[0].id);
          // Auto-load most recent if user navigated directly (no report in state)
          if (!location.state?.report && items[0].fullReport) {
            setReport(items[0].fullReport);
            axios.get(`http://localhost:5000/api/history/${items[0].id}`)
              .then(({ data: full }) => {
                if (full.imageData) setImageUrl(`data:${full.imageMimeType};base64,${full.imageData}`);
              }).catch(() => {});
          }
        }
      })
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }, []);

  // Group history by date label
  const grouped = historyItems
    .filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .reduce((acc, item) => {
      (acc[item.group] = acc[item.group] || []).push(item);
      return acc;
    }, {});

  const exportToPDF = async () => {
    if (!report) return;
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      const M = 15;
      let y = M;
      const ensureSpace = (n) => { if (y + n > H - 20) { pdf.addPage(); y = M; } };

      // Header
      pdf.setFillColor(14, 20, 36); pdf.rect(0, 0, W, 35, 'F');
      pdf.setFontSize(28); pdf.setFont(undefined, 'bold');
      pdf.setTextColor(255, 255, 255); pdf.text('Vision', W/2 - 17, 18, { align: 'center' });
      pdf.setTextColor(34, 211, 238);  pdf.text('Mesh',   W/2 + 10, 18, { align: 'center' });
      pdf.setFontSize(9); pdf.setFont(undefined, 'normal');
      pdf.setTextColor(220, 220, 255);
      pdf.text('AI-Powered UI Analysis & Optimization', W/2, 26, { align: 'center' });
      y = 45;

      // Title
      pdf.setFillColor(241, 245, 249); pdf.roundedRect(M, y, W-2*M, 20, 3, 3, 'F');
      pdf.setFontSize(20); pdf.setFont(undefined, 'bold'); pdf.setTextColor(30, 41, 59);
      pdf.text('Evaluation Report', W/2, y+8, { align: 'center' });
      pdf.setFontSize(10); pdf.setFont(undefined, 'normal'); pdf.setTextColor(100, 116, 139);
      pdf.text((report.file || 'Unknown').slice(0, 65), W/2, y+15, { align: 'center' });
      y += 28;

      // Score
      const s = score100;
      const [fr,fg,fb] = s>=70?[240,253,244]:s>=50?[254,243,199]:[254,226,226];
      const [tr,tg,tb] = s>=70?[21,128,61]:s>=50?[146,64,14]:[185,28,28];
      pdf.setFillColor(fr,fg,fb); pdf.roundedRect(M,y,W-2*M,18,2,2,'F');
      pdf.setFontSize(13); pdf.setFont(undefined,'bold'); pdf.setTextColor(tr,tg,tb);
      pdf.text(`Overall Score: ${s}/100   •   Grade: ${report.grade}`, W/2, y+8, { align:'center' });
      pdf.setFillColor(tr,tg,tb);
      pdf.roundedRect(M+5, y+12, (W-2*M-10)*s/100, 3, 1.5, 1.5, 'F');
      y += 25;

      // Screenshot
      try {
        const imgEl = document.querySelector('img[alt="Website Screenshot"]');
        if (imgEl && imgEl.complete) {
          const canvas = await html2canvas(imgEl, { useCORS:true, allowTaint:true, backgroundColor:null });
          const iW = W-2*M; const iH = Math.min((canvas.height/canvas.width)*iW, 90);
          ensureSpace(iH+5);
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', M, y, iW, iH);
          y += iH + 8;
        }
      } catch (_) {}

      // Issues
      pdf.addPage(); y = M;
      pdf.setFillColor(254,226,226); pdf.roundedRect(M,y,W-2*M,12,2,2,'F');
      pdf.setFontSize(15); pdf.setFont(undefined,'bold'); pdf.setTextColor(185,28,28);
      pdf.text('1. Identified Issues', M+3, y+8); y += 17;
      const sevPDF = {
        high:  {fill:[254,226,226],text:[185,28,28], label:'CRITICAL'},
        medium:{fill:[255,237,213],text:[194,65,12], label:'HIGH'},
        low:   {fill:[254,243,199],text:[161,98,7],  label:'WARNING'},
      };
      for (const iss of report.issues) {
        ensureSpace(28); const sc = sevPDF[iss.severity]||sevPDF.medium;
        pdf.setFillColor(...sc.fill); pdf.roundedRect(M,y,44,5.5,1,1,'F');
        pdf.setFontSize(8); pdf.setFont(undefined,'bold'); pdf.setTextColor(...sc.text);
        pdf.text(sc.label, M+2, y+4);
        if (iss.score!=null) {
          pdf.setFillColor(243,244,246); pdf.roundedRect(M+47,y,36,5.5,1,1,'F');
          pdf.setTextColor(75,85,99); pdf.text(`Score: ${Math.round(iss.score*10)}/100`, M+49, y+4);
        }
        y += 8;
        pdf.setFontSize(11); pdf.setFont(undefined,'bold'); pdf.setTextColor(17,24,39);
        const nl = pdf.splitTextToSize(iss.heuristic_name, W-2*M);
        pdf.text(nl, M, y); y += nl.length*5.5+2;
        pdf.setFont(undefined,'normal'); pdf.setFontSize(10); pdf.setTextColor(55,65,81);
        for (const l of pdf.splitTextToSize(iss.issue, W-2*M-10)) { ensureSpace(5); pdf.text(l,M+5,y); y+=5; }
        y += 5;
      }

      // Solutions
      pdf.addPage(); y = M;
      pdf.setFillColor(220,252,231); pdf.roundedRect(M,y,W-2*M,12,2,2,'F');
      pdf.setFontSize(15); pdf.setFont(undefined,'bold'); pdf.setTextColor(21,128,61);
      pdf.text('2. Solutions & Recommendations', M+3, y+8); y += 17;
      for (const iss of report.issues) {
        ensureSpace(20);
        pdf.setFontSize(11); pdf.setFont(undefined,'bold'); pdf.setTextColor(22,101,52);
        pdf.text(iss.heuristic_name, M, y); y += 6;
        pdf.setFont(undefined,'normal'); pdf.setFontSize(10); pdf.setTextColor(55,65,81);
        for (const l of pdf.splitTextToSize(iss.solution, W-2*M-10)) { ensureSpace(5); pdf.text(l,M+5,y); y+=5; }
        y += 5;
      }

      // Footers
      const total = pdf.internal.getNumberOfPages();
      for (let p=1; p<=total; p++) {
        pdf.setPage(p);
        pdf.setDrawColor(200,200,200); pdf.setLineWidth(0.3); pdf.line(M,H-15,W-M,H-15);
        pdf.setFontSize(8); pdf.setTextColor(120,120,120);
        pdf.text(`Generated by VisionMesh • ${new Date().toLocaleDateString()}`, M, H-10);
        pdf.text(`Page ${p} of ${total}`, W-M, H-10, { align:'right' });
      }
      window.open(URL.createObjectURL(pdf.output('blob')), '_blank');
    } catch (err) {
      console.error('PDF error:', err);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen h-screen flex relative bg-gray-950 overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/15 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-cyan-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-gradient-to-tr from-indigo-600/12 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ── Left Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-64 bg-gray-900/80 backdrop-blur-md border-r border-gray-700/60 flex flex-col z-50 flex-shrink-0 fixed left-0 top-16 bottom-0">
        {/* New Analysis */}
        <div className="p-3">
          <button
            onClick={() => navigate('/home')}
            className="w-full px-3 py-2.5 bg-transparent hover:bg-gray-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 border border-gray-700 hover:border-gray-500"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-3">
          <div className="relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {/* Your chats header */}
        <div className="px-3 py-1 border-b border-gray-700/60">
          <div className="flex items-center justify-between px-2 py-1 text-sm text-gray-400">
            <span>Your chats</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* History grouped by date */}
        <div className="flex-1 overflow-y-auto py-2">
          {historyLoading && (
            <p className="px-3 py-6 text-center text-gray-500 text-sm">Loading...</p>
          )}
          {!historyLoading && historyItems.length === 0 && !searchQuery && (
            <p className="px-3 py-6 text-center text-gray-500 text-sm">No analyses yet</p>
          )}
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <p className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {group}
              </p>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 group ${
                    selectedId === item.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800/60'
                  }`}
                >
                  <span className="truncate flex-1 capitalize">{item.name}</span>
                  <span className={`text-xs font-bold flex-shrink-0 ${
                    item.score >= 70 ? 'text-green-400' : item.score >= 50 ? 'text-orange-400' : 'text-red-400'
                  }`}>{item.score}</span>
                </button>
              ))}
            </div>
          ))}
          {!historyLoading && Object.keys(grouped).length === 0 && searchQuery && (
            <p className="px-3 py-6 text-center text-gray-500 text-sm">No results found</p>
          )}
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-1 ml-64 flex flex-col relative overflow-hidden">
        {/* Scrollable report */}
        <div className="flex-1 overflow-y-auto p-6 pb-28">
          <div className="max-w-4xl mx-auto">

            {/* No report state */}
            {!report && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="text-gray-400 text-lg mb-6">No evaluation data yet.</p>
                <button
                  onClick={() => navigate('/home')}
                  className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Upload a Screenshot
                </button>
              </div>
            )}

            {report && (
              <>
                {/* Screenshot */}
                {imageUrl && (
                  <div className="mb-6 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                    <img src={imageUrl} alt="Website Screenshot" className="w-full h-auto object-contain max-h-[480px]" />
                  </div>
                )}

                {/* Overall Score */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-1">Overall Website Score</h2>
                      <p className="text-gray-400 text-sm">Based on design, accessibility, and usability metrics</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-5xl font-bold mb-1 ${scoreCol}`}>{score100}</div>
                        <div className="text-sm text-gray-400">out of 100</div>
                      </div>
                      <div className="w-24 h-24 relative">
                        <svg className="transform -rotate-90 w-24 h-24">
                          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                            strokeDasharray="251.2" strokeDashoffset={strokeOff}
                            className={strokeCol} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xl font-bold ${scoreCol}`}>{score100}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 1: Identified Errors */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-5 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    1. Identified Errors (Detailed)
                  </h2>
                </div>

                <div className="mb-6 space-y-6">
                  {report.issues?.length === 0 && (
                    <p className="text-green-400 px-2">No issues detected — great work!</p>
                  )}
                  {report.issues?.map((iss, i) => {
                    const sev = SEV[iss.severity] || SEV.medium;
                    const issScore = iss.score != null ? Math.round(iss.score * 10) : null;
                    return (
                      <div key={i}>
                        <h3 className="text-base font-semibold mb-2 flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 ${sev.bg} ${sev.text} text-xs font-bold rounded uppercase`}>
                            {sev.label}
                          </span>
                          {issScore != null && (
                            <span className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs font-bold rounded">
                              Score: {issScore}/100
                            </span>
                          )}
                          <span className="text-white">{iss.heuristic_name}:</span>
                        </h3>
                        <p className="text-gray-300 text-sm pl-4 leading-relaxed">{iss.issue}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Section 2: Solutions */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-5 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2. Solutions &amp; Recommendations
                  </h2>
                </div>

                <div className="mb-8 space-y-5">
                  {report.issues?.map((iss, i) => (
                    <div key={i}>
                      <h3 className="text-base font-semibold text-white mb-1">{iss.heuristic_name}</h3>
                      <p className="text-gray-300 text-sm pl-4 leading-relaxed">{iss.solution}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Sticky bottom action bar ─────────────────────────────────── */}
        {report && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-950/90 backdrop-blur border-t border-gray-800 px-6 py-4 flex gap-3 z-10">
            <button
              onClick={() => navigate('/code-generation')}
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Generate Optimized Design
            </button>
            <button
              onClick={exportToPDF}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Report
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Evaluation;

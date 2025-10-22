import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Analyze.css';

function Analyze() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="analyze">
      <div
        className="analyze-hero"
        style={{
          backgroundImage: "url('https://4kwallpapers.com/images/wallpapers/earth-sunrise-2732x2732-12523.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80vh',
          width: '100%',
          padding: '4rem 2rem',
        }}
      >
        <div className="analyze-container">
          <div className="analyze-header">
            <h1>Analyze Your Design</h1>
            <p>Upload a screenshot or enter a website URL to get started with AI-powered UX analysis</p>
          </div>

          <Card className="analyze-card" variant="highlight">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Screenshot
            </button>
            <button
              className={`tab-button ${activeTab === 'url' ? 'active' : ''}`}
              onClick={() => setActiveTab('url')}
            >
              Enter URL
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div className="upload-section">
              <div className="upload-area">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="file-upload" className="upload-label">
                  <div className="upload-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <p className="upload-text">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="upload-hint">PNG, JPG, or JPEG (max 10MB)</p>
                </label>
              </div>
            </div>
          ) : (
            <div className="url-section">
              <div className="input-group">
                <label htmlFor="website-url">Website URL</label>
                <input
                  type="url"
                  id="website-url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="url-input"
                />
              </div>
            </div>
          )}

          <div className="analyze-action">
            <Button
              variant="primary"
              onClick={handleAnalyze}
              className="analyze-button"
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
            </Button>
          </div>
        </Card>

        {isAnalyzing && (
          <Card className="progress-card">
            <div className="progress-content">
              <div className="loader">
                <div className="loader-ring"></div>
              </div>
              <h3>Analyzing Your Design</h3>
              <p>Our AI is processing your design and evaluating UX patterns...</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </Card>
        )}
        </div>
      </div>

      <div className="analyze-container" style={{ padding: '4rem 2rem' }}>
        <div className="analysis-info">
          <h2>What We Analyze</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              </div>
              <h4>Layout Structure</h4>
              <p>Visual hierarchy, spacing, and content organization</p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <h4>Color Harmony</h4>
              <p>Color contrast, accessibility, and aesthetic appeal</p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 17 10 11 4 5"/>
                  <line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
              </div>
              <h4>User Flow</h4>
              <p>Navigation patterns and interaction design</p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h4>Accessibility</h4>
              <p>WCAG compliance and inclusive design principles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyze;

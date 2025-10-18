import Card from '../components/Card';
import './Results.css';

function Results() {
  const mockResults = {
    overallScore: 87,
    layoutScore: 92,
    colorScore: 85,
    accessibilityScore: 78,
    userFlowScore: 90
  };

  const insights = [
    {
      title: 'Excellent Layout Structure',
      description: 'Your design follows a clear visual hierarchy with consistent spacing and alignment.',
      type: 'positive'
    },
    {
      title: 'Improve Color Contrast',
      description: 'Some text elements have insufficient contrast ratios. Consider increasing contrast for better readability.',
      type: 'warning'
    },
    {
      title: 'Add Alt Text to Images',
      description: 'Several images are missing alternative text, which impacts screen reader accessibility.',
      type: 'warning'
    },
    {
      title: 'Strong User Flow',
      description: 'Navigation is intuitive and follows established UX patterns effectively.',
      type: 'positive'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return '#00ff00';
    if (score >= 70) return '#ffaa00';
    return '#ff4444';
  };

  return (
    <div className="results">
      <div className="results-container">
        <div className="results-header">
          <h1>Analysis Results</h1>
          <p>Comprehensive UX evaluation of your design</p>
        </div>

        <Card className="overall-score-card" variant="highlight">
          <div className="overall-score">
            <div className="score-circle">
              <svg className="score-ring" width="200" height="200">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="var(--medium-gray)"
                  strokeWidth="15"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="var(--secondary-red)"
                  strokeWidth="15"
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  strokeDashoffset={`${2 * Math.PI * 85 * (1 - mockResults.overallScore / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="score-value">
                <span className="score-number">{mockResults.overallScore}</span>
                <span className="score-label">Overall Score</span>
              </div>
            </div>
            <div className="score-description">
              <h3>Great Work!</h3>
              <p>Your design demonstrates strong UX principles with room for improvement in accessibility.</p>
            </div>
          </div>
        </Card>

        <div className="metrics-section">
          <h2>Detailed Metrics</h2>
          <div className="metrics-grid">
            <Card className="metric-card" variant="stat">
              <div className="metric-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              </div>
              <h3>Layout</h3>
              <div className="metric-score">{mockResults.layoutScore}</div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${mockResults.layoutScore}%`,
                    background: getScoreColor(mockResults.layoutScore)
                  }}
                />
              </div>
            </Card>

            <Card className="metric-card" variant="stat">
              <div className="metric-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <h3>Color Harmony</h3>
              <div className="metric-score">{mockResults.colorScore}</div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${mockResults.colorScore}%`,
                    background: getScoreColor(mockResults.colorScore)
                  }}
                />
              </div>
            </Card>

            <Card className="metric-card" variant="stat">
              <div className="metric-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h3>Accessibility</h3>
              <div className="metric-score">{mockResults.accessibilityScore}</div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${mockResults.accessibilityScore}%`,
                    background: getScoreColor(mockResults.accessibilityScore)
                  }}
                />
              </div>
            </Card>

            <Card className="metric-card" variant="stat">
              <div className="metric-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 17 10 11 4 5"/>
                  <line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
              </div>
              <h3>User Flow</h3>
              <div className="metric-score">{mockResults.userFlowScore}</div>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{
                    width: `${mockResults.userFlowScore}%`,
                    background: getScoreColor(mockResults.userFlowScore)
                  }}
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="insights-section">
          <h2>Key Insights</h2>
          <div className="insights-list">
            {insights.map((insight, index) => (
              <Card key={index} className="insight-card">
                <div className={`insight-indicator insight-${insight.type}`}></div>
                <div className="insight-content">
                  <h3>{insight.title}</h3>
                  <p>{insight.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;

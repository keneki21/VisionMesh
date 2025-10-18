import Card from '../components/Card';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1>About VisionMesh</h1>
          <p>Transforming design analysis with the power of artificial intelligence</p>
        </div>

        <Card className="mission-card" variant="highlight">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              VisionMesh is dedicated to revolutionizing the way designers and developers approach
              user experience. By leveraging cutting-edge AI technology, we provide instant,
              actionable insights that help create more intuitive, accessible, and engaging digital
              experiences.
            </p>
            <p>
              We believe that great design should be accessible to everyone, and our platform
              democratizes professional UX analysis by making it fast, affordable, and easy to use.
            </p>
          </div>
        </Card>

        <div className="features-section">
          <h2>What Makes Us Different</h2>
          <div className="features-grid">
            <Card className="feature-card">
              <div className="feature-number">01</div>
              <h3>Advanced AI Analysis</h3>
              <p>
                Our proprietary AI models are trained on thousands of successful designs,
                understanding the nuances of effective UX patterns and user behavior.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-number">02</div>
              <h3>Instant Feedback</h3>
              <p>
                Get comprehensive analysis results in seconds, not days. Our platform processes
                designs in real-time, giving you immediate insights to iterate faster.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-number">03</div>
              <h3>Actionable Recommendations</h3>
              <p>
                We don't just tell you what's wrong we show you exactly how to fix it with
                specific, implementable suggestions backed by UX best practices.
              </p>
            </Card>

            <Card className="feature-card">
              <div className="feature-number">04</div>
              <h3>Accessibility Focus</h3>
              <p>
                Every analysis includes comprehensive accessibility checks, ensuring your designs
                work for all users regardless of their abilities or assistive technologies.
              </p>
            </Card>
          </div>
        </div>

        <div className="stats-section">
          <h2>VisionMesh by the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Designs Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Availability</div>
            </div>
          </div>
        </div>

        <Card className="technology-card">
          <h2>Powered by Advanced Technology</h2>
          <div className="tech-content">
            <p>
              VisionMesh uses state-of-the-art machine learning models trained on millions of
              design patterns and user interaction data. Our AI understands context, recognizes
              patterns, and evaluates designs against established UX principles and emerging trends.
            </p>
            <div className="tech-list">
              <div className="tech-item">
                <div className="tech-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <span>Deep Learning Models</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                </div>
                <span>Computer Vision</span>
              </div>
              <div className="tech-item">
                <div className="tech-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <span>Pattern Recognition</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default About;

import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

function Home() {
  return (
    <div className="home">
  <section className="hero site-hero">
        <div className="hero-background">
          <div className="mesh-pattern"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Powered UX Analysis for <span className="highlight">Smarter Design Decisions</span>
          </h1>
          <p className="hero-subtitle">
            Upload your designs and let VisionMesh analyze UX patterns, identify improvements,
            and deliver actionable insights powered by cutting-edge AI technology.
          </p>
          <div className="hero-buttons">
            <Link to="/analyze">
              <Button variant="primary">Get Started</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2 className="section-title">Why Choose VisionMesh?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Deep Analysis</h3>
              <p>Advanced AI algorithms analyze every aspect of your design, from layout to user flow.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Real-Time Results</h3>
              <p>Get instant feedback on your designs with comprehensive UX scores and recommendations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3>Actionable Insights</h3>
              <p>Receive specific, implementable suggestions to improve user experience and engagement.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3>Accessibility First</h3>
              <p>Comprehensive accessibility checks to ensure your designs work for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-container">
          <h2>Ready to Transform Your Designs?</h2>
          <p>Join thousands of designers and developers using VisionMesh to create better user experiences.</p>
          <Link to="/analyze">
            <Button variant="primary">Start Analyzing Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeGeneration() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('code');
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  // State for selected file
  const [selectedFile, setSelectedFile] = useState('src/App.js');
  const [expandedFolders, setExpandedFolders] = useState(['src', 'src/components', 'src/pages', 'public']);

  // Complete React project structure with code
  const [fileStructure, setFileStructure] = useState([
    {
      name: 'package.json',
      type: 'file',
      path: 'package.json',
      status: 'completed',
      code: `{
  "name": "bise-lahore-app",
  "version": "1.0.0",
  "description": "BISE Lahore Education Board Portal",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^13.5.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`
    },
    {
      name: 'public',
      type: 'folder',
      path: 'public',
      status: 'completed',
      children: [
        {
          name: 'index.html',
          type: 'file',
          path: 'public/index.html',
          status: 'completed',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1e40af" />
    <meta
      name="description"
      content="BISE Lahore - Board of Intermediate and Secondary Education"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>BISE Lahore - Education Board Portal</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`
        }
      ]
    },
    {
      name: 'src',
      type: 'folder',
      path: 'src',
      status: 'completed',
      children: [
        {
          name: 'index.js',
          type: 'file',
          path: 'src/index.js',
          status: 'completed',
          code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
        },
        {
          name: 'App.js',
          type: 'file',
          path: 'src/App.js',
          status: 'completed',
          code: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Results from './pages/Results';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
            </>
          } />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;`
        },
        {
          name: 'App.css',
          type: 'file',
          path: 'src/App.css',
          status: 'completed',
          code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}`
        },
        {
          name: 'index.css',
          type: 'file',
          path: 'src/index.css',
          status: 'completed',
          code: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}`
        },
        {
          name: 'components',
          type: 'folder',
          path: 'src/components',
          status: 'completed',
          children: [
            {
              name: 'Header.js',
              type: 'file',
              path: 'src/components/Header.js',
              status: 'completed',
              code: `import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>BISE <span>Lahore</span></h1>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/results">Results</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;`
            },
            {
              name: 'Header.css',
              type: 'file',
              path: 'src/components/Header.css',
              status: 'completed',
              code: `.header {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.logo span {
  color: #fbbf24;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.nav a:hover {
  color: #fbbf24;
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}`
            },
            {
              name: 'Hero.js',
              type: 'file',
              path: 'src/components/Hero.js',
              status: 'completed',
              code: `import React, { useState } from 'react';
import './Hero.css';

function Hero() {
  const [rollNumber, setRollNumber] = useState('');

  const handleSearch = () => {
    if (rollNumber.trim()) {
      alert(\`Searching for roll number: \${rollNumber}\`);
    } else {
      alert('Please enter a roll number');
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <h2 className="hero-title">
          Board of Intermediate & Secondary Education
        </h2>
        <p className="hero-subtitle">
          Access your results, apply for services, and more
        </p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Roll Number..."
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn-primary" onClick={handleSearch}>
            Search Results
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;`
            },
            {
              name: 'Hero.css',
              type: 'file',
              path: 'src/components/Hero.css',
              status: 'completed',
              code: `.hero {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1e40af;
  animation: fadeIn 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeIn 1.2s ease-out;
}

.search-box input {
  flex: 1;
  min-width: 250px;
  padding: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #3b82f6;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}`
            },
            {
              name: 'Services.js',
              type: 'file',
              path: 'src/components/Services.js',
              status: 'completed',
              code: `import React from 'react';
import ServiceCard from './ServiceCard';
import './Services.css';

function Services() {
  const services = [
    {
      icon: '📋',
      title: 'Examination Forms',
      description: 'Submit your examination forms online',
    },
    {
      icon: '📊',
      title: 'Result Verification',
      description: 'Verify your result certificates',
    },
    {
      icon: '🎓',
      title: 'Registration',
      description: 'Register for upcoming examinations',
    },
  ];

  return (
    <section className="services">
      <div className="container">
        <h2 className="services-title">E-Services</h2>
        <div className="service-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;`
            },
            {
              name: 'Services.css',
              type: 'file',
              path: 'src/components/Services.css',
              status: 'completed',
              code: `.services {
  padding: 4rem 0;
  background-color: white;
}

.services-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1e40af;
  animation: fadeIn 0.8s ease-out;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .services-title {
    font-size: 2rem;
  }
  
  .service-grid {
    grid-template-columns: 1fr;
  }
}`
            },
            {
              name: 'ServiceCard.js',
              type: 'file',
              path: 'src/components/ServiceCard.js',
              status: 'completed',
              code: `import React, { useState } from 'react';
import './ServiceCard.css';

function ServiceCard({ icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={\`service-card \${isHovered ? 'hovered' : ''}\`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn-secondary">Apply Now</button>
    </div>
  );
}

export default ServiceCard;`
            },
            {
              name: 'ServiceCard.css',
              type: 'file',
              path: 'src/components/ServiceCard.css',
              status: 'completed',
              code: `.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out;
}

.service-card.hovered {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}

.service-card .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e40af;
}

.service-card p {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.btn-secondary {
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.btn-secondary:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}`
            }
          ]
        },
        {
          name: 'pages',
          type: 'folder',
          path: 'src/pages',
          status: 'completed',
          children: [
            {
              name: 'Results.js',
              type: 'file',
              path: 'src/pages/Results.js',
              status: 'completed',
              code: `import React, { useState } from 'react';
import './Results.css';

function Results() {
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (rollNumber.trim()) {
      setResult({
        name: 'Muhammad Ahmed',
        rollNo: rollNumber,
        grade: 'A+',
        percentage: '92.5%',
        status: 'Pass'
      });
    }
  };

  return (
    <div className="results-page">
      <div className="container">
        <h1>Search Results</h1>
        <div className="search-section">
          <input
            type="text"
            placeholder="Enter Roll Number..."
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {result && (
          <div className="result-card">
            <h2>Result Details</h2>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Roll No:</strong> {result.rollNo}</p>
            <p><strong>Grade:</strong> {result.grade}</p>
            <p><strong>Percentage:</strong> {result.percentage}</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;`
            },
            {
              name: 'Results.css',
              type: 'file',
              path: 'src/pages/Results.css',
              status: 'completed',
              code: `.results-page {
  min-height: 60vh;
  padding: 3rem 0;
}

.results-page h1 {
  text-align: center;
  color: #1e40af;
  margin-bottom: 2rem;
}

.search-section {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto 3rem;
}

.search-section input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
}

.search-section button {
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.result-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.result-card h2 {
  color: #1e40af;
  margin-bottom: 1rem;
}

.result-card p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}`
            },
            {
              name: 'Contact.js',
              type: 'file',
              path: 'src/pages/Contact.js',
              status: 'completed',
              code: `import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;`
            },
            {
              name: 'Contact.css',
              type: 'file',
              path: 'src/pages/Contact.css',
              status: 'completed',
              code: `.contact-page {
  min-height: 60vh;
  padding: 3rem 0;
}

.contact-page h1 {
  text-align: center;
  color: #1e40af;
  margin-bottom: 2rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.contact-form button {
  padding: 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.contact-form button:hover {
  background: #2563eb;
}`
            }
          ]
        }
      ]
    },
    {
      name: 'README.md',
      type: 'file',
      path: 'README.md',
      status: 'completed',
      code: `# BISE Lahore Education Portal

A modern React application for the Board of Intermediate and Secondary Education, Lahore.

## Features

- Result search and verification
- Online examination form submission
- Student registration portal
- Responsive design for all devices
- Modern UI with smooth animations

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

## Build

\`\`\`bash
npm run build
\`\`\`

Builds the app for production to the \`build\` folder.

## Technologies Used

- React 18
- React Router v6
- CSS3 with animations
- Axios for API calls

## License

© 2024 BISE Lahore. All rights reserved.`
    }
  ]);

  // State for generated code
  const [generatedCode, setGeneratedCode] = useState('');

  // useEffect(() => {
  //   // Simulate code generation process
  //   const timer = setTimeout(() => {
  //     setIsGenerating(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    // Set initial code to display
    const findFile = (files, path) => {
      for (const file of files) {
        if (file.type === 'file' && file.path === path) {
          return file;
        }
        if (file.children) {
          const found = findFile(file.children, path);
          if (found) return found;
        }
      }
      return null;
    };
    
    const file = findFile(fileStructure, selectedFile);
    if (file && file.code) {
      setGeneratedCode(file.code);
    }
  }, [selectedFile, fileStructure]);

  const toggleFolder = (folderPath) => {
    setExpandedFolders(prev => 
      prev.includes(folderPath) 
        ? prev.filter(p => p !== folderPath)
        : [...prev, folderPath]
    );
  };

  const renderFileTree = (files, level = 0, parentPath = '') => {
    return files.map((file, index) => {
      const currentPath = parentPath ? `${parentPath}/${file.name}` : file.name;
      const isExpanded = expandedFolders.includes(currentPath);
      
      return (
        <div key={index}>
          <div 
            onClick={() => {
              if (file.type === 'folder') {
                toggleFolder(currentPath);
              } else {
                setSelectedFile(currentPath);
              }
            }}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-300 ${
              selectedFile === currentPath ? 'bg-gray-800 border border-cyan-500' : ''
            }`}
            style={{ marginLeft: `${level * 16}px` }}
          >
            {file.type === 'folder' ? (
              <>
                <svg 
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    isExpanded ? 'transform rotate-90' : ''
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span className="text-gray-300 text-sm font-medium">{file.name}</span>
              </>
            ) : (
              <>
                {(file.name.endsWith('.html') || file.name.endsWith('.htm')) && (
                  <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )}
                {file.name.endsWith('.css') && (
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                  </svg>
                )}
                {(file.name.endsWith('.js') || file.name.endsWith('.jsx')) && (
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                  </svg>
                )}
                {/* {(file.name.endsWith('.js') || file.name.endsWith('.jsx')) && (
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )} */}
                {(file.name.endsWith('.json') || file.name.endsWith('.md')) && (
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span className="text-gray-200 text-sm flex-1">{file.name}</span>
                {/* {file.status === 'completed' && (
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )} */}
              </>
            )}
          </div>
          {file.type === 'folder' && file.children && isExpanded && (
            <div>{renderFileTree(file.children, level + 1, currentPath)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen h-screen flex relative bg-gray-950 overflow-hidden">
      {/* Cool Background Designs - Full Page - MUCH MORE VISIBLE */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Colorful gradient blobs - ENHANCED VISIBILITY */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/60 to-pink-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-cyan-500/65 to-blue-500/55 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/55 to-purple-500/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-[380px] h-[380px] bg-gradient-to-bl from-teal-500/50 to-cyan-400/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}></div>
        
        {/* Additional gradient blobs for richness */}
        <div className="absolute top-1/2 left-1/6 w-[350px] h-[350px] bg-gradient-to-br from-fuchsia-600/45 to-purple-600/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/5 right-1/3 w-[420px] h-[420px] bg-gradient-to-bl from-blue-500/50 to-indigo-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/5 right-1/5 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/45 to-teal-500/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-[320px] h-[320px] bg-gradient-to-br from-pink-500/50 to-rose-600/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gradient-to-br from-violet-600/45 to-fuchsia-500/45 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-tl from-cyan-600/50 to-blue-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        
        {/* Flowing wave lines with gradient - MUCH MORE VISIBLE */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="loginGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.9 }} />
            </linearGradient>
            <linearGradient id="loginGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(20, 184, 166)', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path d="M0,200 Q250,150 500,200 T1000,200" stroke="url(#loginGrad1)" strokeWidth="4" fill="none" className="animate-pulse" style={{ animationDuration: '4s' }}/>
          <path d="M0,400 Q250,500 500,400 T1000,400" stroke="url(#loginGrad1)" strokeWidth="4" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
          <path d="M0,600 Q250,550 500,600 T1000,600" stroke="url(#loginGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}/>
          <path d="M0,300 Q200,250 400,300 T800,300" stroke="url(#loginGrad2)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}/>
          <path d="M200,100 Q400,50 600,100 T1000,100" stroke="url(#loginGrad2)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }}/>
          <path d="M0,800 Q300,750 600,800 T1000,800" stroke="url(#loginGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '2.5s' }}/>
        </svg>
        
        {/* Scattered light particles - Balanced */}
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() > 0.75 ? '168, 85, 247' : Math.random() > 0.5 ? '34, 211, 238' : Math.random() > 0.25 ? '236, 72, 153' : '59, 130, 246'}, ${0.3 + Math.random() * 0.4})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
              boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(${Math.random() > 0.5 ? '168, 85, 247' : '34, 211, 238'}, 0.6)`,
            }}
          />
        ))}
        
        {/* Radial burst effects - MUCH MORE VISIBLE */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/60 to-transparent animate-ping" style={{ animationDuration: '5s' }}></div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] opacity-35">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/60 to-transparent animate-ping" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] opacity-35">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/55 to-transparent animate-ping" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        </div>
        <div className="absolute top-1/3 right-1/3 w-[380px] h-[380px] opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/55 to-transparent animate-ping" style={{ animationDuration: '6.5s', animationDelay: '0.8s' }}></div>
        </div>
        
        {/* Geometric accents - MUCH MORE VISIBLE */}
        <div className="absolute top-1/3 left-1/5 w-40 h-40 border-3 border-cyan-400/50 rounded-lg rotate-12 animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 border-3 border-purple-400/50 rounded-full animate-pulse opacity-55" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/5 left-1/3 w-36 h-36 border-3 border-pink-400/50 rounded-lg -rotate-12 animate-pulse opacity-58" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 right-1/3 w-28 h-28 border-3 border-indigo-400/50 rounded-full animate-pulse opacity-60" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-44 h-44 border-2 border-fuchsia-400/45 rounded-lg rotate-45 animate-pulse opacity-55" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
        
        {/* Color streaks - MUCH MORE VISIBLE */}
        <div className="absolute top-1/4 left-1/3 w-3 h-64 bg-gradient-to-b from-purple-500/60 to-transparent opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-56 bg-gradient-to-t from-cyan-500/60 to-transparent opacity-60 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-72 bg-gradient-to-b from-pink-500/55 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2.5 h-60 bg-gradient-to-t from-indigo-500/55 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/5 w-80 h-3 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/6 w-72 h-2.5 bg-gradient-to-l from-transparent via-purple-500/50 to-transparent opacity-55 animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }}></div>
        
        {/* Additional sparkle effects - Subtle */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse" style={{ animationDuration: `${2 + Math.random() * 3}s`, animationDelay: `${Math.random() * 3}s` }}>
              <path d="M12 2L15 9L22 9L16.5 14L19 21L12 16.5L5 21L7.5 14L2 9L9 9L12 2Z" 
                fill={`rgba(${Math.random() > 0.5 ? '168, 85, 247' : Math.random() > 0.25 ? '34, 211, 238' : '236, 72, 153'}, ${0.5 + Math.random() * 0.5})`}
              />
            </svg>
          </div>
        ))}
        
        {/* Mesh grid pattern overlay - Subtle */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-12" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Content with z-index above background */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row pt-20">
        {/* Left Side - Process */}
        <div className="w-full lg:w-[350px] bg-black/40 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col overflow-y-auto max-h-[50vh] lg:max-h-none">
        {/* Header */}
        {/* <div className="p-4 sm:p-6 border-b border-gray-800 bg-black/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Code Generation
            </h2>
            <button
              onClick={() => navigate('/evaluation')}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {isGenerating ? (
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm font-medium text-gray-300">
                Generating...
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-300">Completed!</span>
            </div>
          )}
        </div> */}

        {/* File Structure */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-3 sm:mb-4 uppercase tracking-wide">File Structure</h3>
          {fileStructure.length > 0 ? (
            renderFileTree(fileStructure)
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <div className="text-4xl mb-3 opacity-30">📂</div>
              <p className="text-gray-500 text-sm text-center">No files created yet</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-800 space-y-3 bg-black/30 backdrop-blur-sm">
          <button
            disabled={isGenerating}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              isGenerating
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                : 'bg-white hover:bg-gray-200 text-black shadow-lg border border-gray-300 hover:scale-105 transform transition-transform'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Project
          </button>
          <button
            disabled={isGenerating}
            className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
              isGenerating
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700'
                : 'bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600 hover:scale-105 transform transition-transform'
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
      <div className="flex-1 bg-black/40 backdrop-blur-sm flex flex-col min-h-[50vh]">
        {/* Tabs */}
        <div className="border-b border-gray-800 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center px-3 sm:px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === 'code'
                  ? 'text-white border-white bg-gray-900'
                  : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800'
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
                  ? 'text-white border-white bg-gray-900'
                  : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800'
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
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                {/* Code Header */}
                <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 font-mono">{selectedFile}</span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      alert('Code copied to clipboard!');
                    }}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-gray-500"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                {/* Code Content */}
                <div className="bg-black">
                  {generatedCode ? (
                    <SyntaxHighlighter
                      language={selectedFile.endsWith('.jsx') || selectedFile.endsWith('.js') ? 'javascript' : selectedFile.endsWith('.css') ? 'css' : selectedFile.endsWith('.html') ? 'html' : selectedFile.endsWith('.json') ? 'json' : 'markdown'}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1rem 1.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        background: '#000000',
                      }}
                      showLineNumbers={true}
                      wrapLines={true}
                    >
                      {generatedCode}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="text-5xl mb-4 opacity-30">💻</div>
                      <p className="text-gray-400">Select a file to view code</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full overflow-y-auto p-3 sm:p-6">
              <div className="bg-white rounded-2xl border border-gray-800 overflow-hidden">
                {/* Browser Header */}
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="hidden sm:flex flex-1 items-center gap-2 px-4 py-1.5 bg-gray-900 rounded-lg border border-gray-700">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-gray-400">localhost:3000/preview</span>
                  </div>
                </div>
                {/* Live Preview */}
                <div className="bg-white">
                  <style>{`
                    .preview-container * {
                      margin: 0;
                      padding: 0;
                      box-sizing: border-box;
                    }
                    .preview-container {
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      line-height: 1.6;
                      color: #333;
                    }
                    .preview-header {
                      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                      color: white;
                      padding: 1.5rem 0;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .preview-container-inner {
                      max-width: 1200px;
                      margin: 0 auto;
                      padding: 0 20px;
                    }
                    .preview-header-content {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    }
                    .preview-logo h1 {
                      font-size: 1.8rem;
                      font-weight: 700;
                    }
                    .preview-logo span {
                      color: #fbbf24;
                    }
                    .preview-nav {
                      display: flex;
                      gap: 2rem;
                    }
                    .preview-nav a {
                      color: white;
                      text-decoration: none;
                      font-weight: 500;
                      transition: color 0.3s;
                    }
                    .preview-nav a:hover {
                      color: #fbbf24;
                    }
                    .preview-hero {
                      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                      padding: 4rem 0;
                      text-align: center;
                    }
                    .preview-hero h2 {
                      font-size: 2.5rem;
                      margin-bottom: 1rem;
                      color: #1e40af;
                    }
                    .preview-hero p {
                      font-size: 1.2rem;
                      color: #6b7280;
                      margin-bottom: 2rem;
                    }
                    .preview-search-box {
                      display: flex;
                      max-width: 600px;
                      margin: 0 auto;
                      gap: 1rem;
                      flex-wrap: wrap;
                      justify-content: center;
                    }
                    .preview-search-box input {
                      flex: 1;
                      min-width: 250px;
                      padding: 1rem;
                      border: 2px solid #d1d5db;
                      border-radius: 8px;
                      font-size: 1rem;
                    }
                    .preview-btn-primary {
                      background: #3b82f6;
                      color: white;
                      padding: 1rem 2rem;
                      border: none;
                      border-radius: 8px;
                      font-size: 1rem;
                      font-weight: 600;
                      cursor: pointer;
                    }
                    .preview-services {
                      padding: 4rem 0;
                    }
                    .preview-services h2 {
                      text-align: center;
                      font-size: 2.5rem;
                      margin-bottom: 3rem;
                      color: #1e40af;
                    }
                    .preview-service-grid {
                      display: grid;
                      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                      gap: 2rem;
                    }
                    .preview-service-card {
                      background: white;
                      padding: 2rem;
                      border-radius: 12px;
                      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                      text-align: center;
                    }
                    .preview-service-card .icon {
                      font-size: 3rem;
                      margin-bottom: 1rem;
                    }
                    .preview-service-card h3 {
                      font-size: 1.5rem;
                      margin-bottom: 0.5rem;
                      color: #1e40af;
                    }
                    .preview-service-card p {
                      color: #6b7280;
                      margin-bottom: 1.5rem;
                    }
                    .preview-btn-secondary {
                      background: #10b981;
                      color: white;
                      padding: 0.75rem 1.5rem;
                      border: none;
                      border-radius: 8px;
                      font-size: 0.9rem;
                      font-weight: 600;
                      cursor: pointer;
                      width: 100%;
                    }
                  `}</style>
                  <div className="preview-container">
                    <header className="preview-header">
                      <div className="preview-container-inner">
                        <div className="preview-header-content">
                          <div className="preview-logo">
                            <h1>BISE <span>Lahore</span></h1>
                          </div>
                          <nav className="preview-nav">
                            <a href="#home">Home</a>
                            <a href="#services">Services</a>
                            <a href="#results">Results</a>
                            <a href="#contact">Contact</a>
                          </nav>
                        </div>
                      </div>
                    </header>

                    <main>
                      <section className="preview-hero">
                        <div className="preview-container-inner">
                          <h2>Board of Intermediate & Secondary Education</h2>
                          <p>Access your results, apply for services, and more</p>
                          <div className="preview-search-box">
                            <input type="text" placeholder="Enter Roll Number..." />
                            <button className="preview-btn-primary">Search Results</button>
                          </div>
                        </div>
                      </section>

                      <section className="preview-services">
                        <div className="preview-container-inner">
                          <h2>E-Services</h2>
                          <div className="preview-service-grid">
                            <div className="preview-service-card">
                              <div className="icon">📋</div>
                              <h3>Examination Forms</h3>
                              <p>Submit your examination forms online</p>
                              <button className="preview-btn-secondary">Apply Now</button>
                            </div>
                            <div className="preview-service-card">
                              <div className="icon">📊</div>
                              <h3>Result Verification</h3>
                              <p>Verify your result certificates</p>
                              <button className="preview-btn-secondary">Apply Now</button>
                            </div>
                            <div className="preview-service-card">
                              <div className="icon">🎓</div>
                              <h3>Registration</h3>
                              <p>Register for upcoming examinations</p>
                              <button className="preview-btn-secondary">Apply Now</button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default CodeGeneration;
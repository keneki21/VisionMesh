import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evaluation from './pages/Evaluation';
import Settings from './pages/Settings';
import CodeGeneration from './pages/CodeGeneration';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
// import Analyze from './pages/Analyze';
// import Results from './pages/Results';
// import About from './pages/About';
// import Contact from './pages/Contact';

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterPaths = ['/code-generation', '/evaluation'];
  
  if (hideFooterPaths.includes(location.pathname)) {
    return null;
  }
  
  return <Footer />;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/code-generation" element={<CodeGeneration />} />
                <Route path="/help" element={<Help />} />
                {/* <Route path="/analyze" element={<Analyze />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> */}
              </Routes>
              <ConditionalFooter />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

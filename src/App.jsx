import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evaluation from './pages/Evaluation';
// import Analyze from './pages/Analyze';
// import Results from './pages/Results';
// import About from './pages/About';
// import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/evaluation" element={<Evaluation />} />
                {/* <Route path="/analyze" element={<Analyze />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> */}
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

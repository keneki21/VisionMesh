import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evaluation from './pages/Evaluation';
import Settings from './pages/Settings';
import CodeGeneration from './pages/CodeGeneration';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';

// Blocks unauthenticated access — redirects to /login
function ProtectedRoute({ children }) {
  const token  = localStorage.getItem('vm_token');
  const isAuth = localStorage.getItem('vm_auth');
  if (!token || !isAuth) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  const location = useLocation();
  const hideFooterRoutes = ['/evaluation', '/code-generation'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home"            element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/evaluation"      element={<ProtectedRoute><Evaluation /></ProtectedRoute>} />
        <Route path="/settings"        element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/code-generation" element={<ProtectedRoute><CodeGeneration /></ProtectedRoute>} />
        <Route path="/help"            element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="*"                element={<Navigate to="/login" replace />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/"         element={<Navigate to="/login" replace />} />
        <Route path="/*"        element={<AppLayout />} />
      </Routes>
    </div>
  );
}

export default App;

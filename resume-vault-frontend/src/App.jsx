// ✅ File: frontend/src/App.jsx
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import ResumeForm from './pages/ResumeForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';

const isAdminAuthenticated = () => {
  return localStorage.getItem('adminToken');
};

const PrivateRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/admin/login" />;
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
      <nav className="p-5 bg-indigo-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-extrabold tracking-wide">Resume Vault</Link>
          <div className="space-x-6">
            <Link to="/" className={`hover:underline ${location.pathname === '/' ? 'font-bold underline' : ''}`}>Submit Resume</Link>
            <Link to="/admin/login" className={`hover:underline ${location.pathname.startsWith('/admin') ? 'font-bold underline' : ''}`}>Admin</Link>
          </div>
        </div>
      </nav>

      <main className="py-8 px-4">
        <Routes>
          <Route path="/" element={<ResumeForm />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Resume Vault • Crafted with 💙 using React + Tailwind
      </footer>
    </div>
  );
}

export default App;
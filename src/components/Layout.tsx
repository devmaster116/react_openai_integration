import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, LogOut, Sun, Moon, MessageCircle, PenTool, Users, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ClassmatePersona from './ClassmatePersona';
import ComplianceMessage from './ComplianceMessage';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-gray-800 dark:bg-gray-950 text-white p-6 fixed h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Compass className="w-8 h-8" />
            <h1 className="text-xl font-bold">ZADI</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <nav className="space-y-4">
          <Link
            to="/zadigpt"
            className={`flex items-center gap-2 transition-colors ${
              location.pathname === '/zadigpt'
                ? 'text-white bg-gray-700 dark:bg-gray-800 rounded-lg p-2'
                : 'text-gray-300 hover:text-white p-2'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            ZadiGPT
          </Link>
          <Link
            to="/write2learn"
            className={`flex items-center gap-2 transition-colors ${
              location.pathname === '/write2learn'
                ? 'text-white bg-gray-700 dark:bg-gray-800 rounded-lg p-2'
                : 'text-gray-300 hover:text-white p-2'
            }`}
          >
            <PenTool className="w-4 h-4" />
            Write2Learn
          </Link>
          <Link
            to="/teach2learn"
            className={`flex items-center gap-2 transition-colors ${
              location.pathname === '/teach2learn'
                ? 'text-white bg-gray-700 dark:bg-gray-800 rounded-lg p-2'
                : 'text-gray-300 hover:text-white p-2'
            }`}
          >
            <Compass className="w-4 h-4" />
            Teach2Learn
          </Link>
          <Link
            to="/chat2learn"
            className={`flex items-center gap-2 transition-colors ${
              location.pathname === '/chat2learn'
                ? 'text-white bg-gray-700 dark:bg-gray-800 rounded-lg p-2'
                : 'text-gray-300 hover:text-white p-2'
            }`}
          >
            <Users className="w-4 h-4" />
            Chat2Learn
          </Link>

          <div className="border-t border-gray-700 my-4"></div>

          <Link
            to="/account"
            className={`flex items-center gap-2 transition-colors ${
              location.pathname === '/account'
                ? 'text-white bg-gray-700 dark:bg-gray-800 rounded-lg p-2'
                : 'text-gray-300 hover:text-white p-2'
            }`}
          >
            <UserCircle className="w-4 h-4" />
            Account
          </Link>
          <Link
            to="/personalise"
            className={`flex items-center gap-2 transition-colors ${
              location.pathname === '/personalise'
                ? 'text-white bg-gray-700 dark:bg-gray-800 rounded-lg p-2'
                : 'text-gray-300 hover:text-white p-2'
            }`}
          >
            <Settings className="w-4 h-4" />
            Personalise
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 mt-8 transition-colors p-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
      <ClassmatePersona />
      <ComplianceMessage />
    </div>
  );
}
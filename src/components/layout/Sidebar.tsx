import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../utils/constants';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside className="w-64 bg-gray-800 dark:bg-gray-950 text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-xl font-bold">ZADI</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <nav className="space-y-4">
        <Link
          to={ROUTES.DASHBOARD}
          className="block text-gray-300 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to={ROUTES.WRITING_LAB}
          className="block text-gray-300 hover:text-white transition-colors"
        >
          Writing Lab
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 mt-8 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
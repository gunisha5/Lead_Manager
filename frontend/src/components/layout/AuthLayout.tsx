import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export const AuthLayout = ({
  children,
  title,
  subtitle,
  alternativeAction,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  alternativeAction: { text: string; linkText: string; to: string };
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">GigFlow</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-gray-900 py-8 px-6 shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{subtitle}</h2>
          </div>

          {children}

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">{alternativeAction.text} </span>
            <Link
              to={alternativeAction.to}
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              {alternativeAction.linkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

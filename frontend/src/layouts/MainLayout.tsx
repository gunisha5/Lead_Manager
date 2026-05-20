import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, User as UserIcon, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { useTheme } from '@/hooks/useTheme';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, allowedRoles: ['admin', 'sales'] },
    { name: 'Leads', path: '/leads', icon: Users, allowedRoles: ['admin', 'sales'] },
    { name: 'User Management', path: '/users', icon: Users, allowedRoles: ['admin'] },
  ];

  const filteredNavItems = navItems.filter(
    (item) => user?.role && item.allowedRoles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLinks = () => (
    <nav className="p-4 space-y-1">
      {filteredNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-150 ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">GigFlow</h1>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>

        {/* Sidebar user info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 px-2 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
              <span className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold">{user?.role}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 sm:px-6 justify-between flex-shrink-0 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Smart Leads Dashboard</h2>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User badge (hidden on very small screens) */}
            <div className="hidden sm:flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600">
              <UserIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="max-w-[100px] truncate">{user?.name}</span>
              <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full uppercase">
                {user?.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

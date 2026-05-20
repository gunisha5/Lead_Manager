import { Users, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';

const stats = [
  { name: 'Total Leads', value: '2,543', icon: Users, change: '+12.5%', color: 'blue' },
  { name: 'Conversion Rate', value: '18.2%', icon: TrendingUp, change: '+2.1%', color: 'violet' },
  { name: 'Expected Revenue', value: '$45,231', icon: DollarSign, change: '+15.3%', color: 'emerald' },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    icon: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    icon: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  },
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const c = colorMap[stat.color];
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${c.bg} ml-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${c.icon}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity placeholder */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-colors">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
        <div className="text-gray-500 dark:text-gray-400 text-sm py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          Activity chart coming soon
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ title, value, change, changeType = 'up', icon: Icon }) => {
  const isPositive = changeType === 'up';

  return (
    <div className="group card p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-light to-white border border-accent/20">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 font-body mb-1">{title}</p>
          <p className="text-3xl font-bold text-dark mt-1 font-heading transition-colors duration-200 group-hover:text-primary">{value}</p>
          {change && (
            <div className="flex items-center mt-3">
              {isPositive ? (
                <FiTrendingUp className="w-4 h-4 text-green-500 mr-2 animate-pulse" />
              ) : (
                <FiTrendingDown className="w-4 h-4 text-red-500 mr-2 animate-pulse" />
              )}
              <span className={`text-sm font-medium font-body ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard; 
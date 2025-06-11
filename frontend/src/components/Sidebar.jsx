import React from 'react';
import { FileText, Settings, Users, Package, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: 'docs', label: 'Documentation', icon: FileText },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#2192E2] to-[#2A5E75] text-white h-full flex flex-col shadow-xl">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-xl font-bold">MERN Dashboard</h1>
        <p className="text-sm text-white/80">Sasanka Deshapriya</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-white/80 hover:bg-red-500/20 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
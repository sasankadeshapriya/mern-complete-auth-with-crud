import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DocumentationContent from '../components/DocumentationContent';
import { useAuthStore } from "../store/authStore";


const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('docs');

  const mockUser = {
    name: user.name || "John Doe",
    email: user.email||"john.doe@example.com",
    isVerified: user.isVerified || true,
    createdAt: user.createdAt || "2023-01-15T10:00:00Z",
    lastLogin: user.lastLogin || "2023-10-01T12:00:00Z",
  };

  const handleLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'docs':
        return <DocumentationContent />;
      case 'products':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Products Management</h2>
            <p className="text-gray-600">Product management functionality coming soon...</p>
          </div>
        );
      default:
        return <DocumentationContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={mockUser} onLogout={handleLogout} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
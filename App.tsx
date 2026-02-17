
import React, { useState } from 'react';
import { UserRole, User, Resource } from './types.ts';
import Sidebar from './components/Sidebar.tsx';
import Navbar from './components/Navbar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Explore from './pages/Explore.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import Login from './pages/Login.tsx';
import Landing from './pages/Landing.tsx';
import Leaderboard from './pages/Leaderboard.tsx';
import Communities from './pages/Communities.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'explore' | 'admin' | 'leaderboard' | 'communities'>('dashboard');

  // Initial Mock Resources
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'r1',
      title: 'Algorithms Final PYQ 2025',
      description: 'Internal faculty-prepared sample questions for competitive preparation.',
      uploaderId: 'b2222222-2222-2222-2222-222222222222',
      uploaderName: 'Prof. Sarah Chen',
      category: 'Question Paper',
      subject: 'Computer Science',
      semester: 4,
      uploadDate: new Date().toISOString(),
      rating: 4.9,
      downloads: 45,
      tags: ['Algorithms', 'Internal'],
      fileUrl: '#',
      visibility: 'EDU'
    },
    {
      id: 'r2',
      title: 'Public Data Science Basics',
      description: 'Open resource for community learners interested in starting with Python.',
      uploaderId: 'd4444444-4444-4444-4444-444444444444',
      uploaderName: 'Mike Smith',
      category: 'Study Material',
      subject: 'Data Science',
      semester: 1,
      uploadDate: new Date().toISOString(),
      rating: 4.2,
      downloads: 120,
      tags: ['Public', 'Entry Level'],
      fileUrl: '#',
      visibility: 'GENERAL'
    },
    {
      id: 'r3',
      title: 'Academic Ethics Handbook',
      description: 'Standard guide for all network members to maintain integrity.',
      uploaderId: 'a1111111-1111-1111-1111-111111111111',
      uploaderName: 'Platform Chief',
      category: 'Reference Book',
      subject: 'General Ethics',
      semester: 1,
      uploadDate: new Date().toISOString(),
      rating: 5.0,
      downloads: 850,
      tags: ['Ethics', 'Policy'],
      fileUrl: '#',
      visibility: 'PUBLIC'
    }
  ]);

  const handleAddResource = (newResource: Resource) => {
    setResources(prev => [newResource, ...prev]);
  };

  if (!user && !showLogin) {
    return <Landing onStart={() => setShowLogin(true)} />;
  }

  if (!user && showLogin) {
    return <Login onLogin={setUser} onBack={() => setShowLogin(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user!} 
            resources={resources.filter(r => r.uploaderId === user!.id)} 
            onUpload={handleAddResource}
          />
        );
      case 'explore':
        return <Explore resources={resources} user={user!} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'communities':
        return <Communities userRole={user!.role} />;
      case 'admin':
        return user!.role === UserRole.ADMIN ? <AdminPanel resources={resources} /> : <Explore resources={resources} user={user!} />;
      default:
        return <Explore resources={resources} user={user!} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        user={user!} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => {
          setUser(null);
          setShowLogin(false);
        }}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user!} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

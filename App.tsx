
import React, { useState, useEffect } from 'react';
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
import Profile from './pages/Profile.tsx';
import { supabase, getFilteredResources } from './services/supabase.ts';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'explore' | 'admin' | 'leaderboard' | 'communities' | 'profile'>('dashboard');
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) loadResources();
  }, [user?.network]);

  const loadResources = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await getFilteredResources(user.network);
      const mappedData: Resource[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        uploaderId: item.uploader_id,
        uploaderName: item.uploader_name || 'Anonymous',
        category: item.category,
        subject: item.subject,
        semester: item.semester,
        uploadDate: item.upload_date,
        rating: parseFloat(item.rating),
        downloads: item.downloads,
        tags: item.tags || [],
        aiSummary: item.ai_summary,
        fileUrl: item.file_url,
        visibility: item.visibility
      }));
      setResources(mappedData);
    } catch (error) {
      console.error("Failed to load resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddResource = async (newResource: Resource) => {
    setResources(prev => [newResource, ...prev]);
    if (user) {
      const newPoints = user.points + 50;
      const newXp = user.xp + 100;
      setUser({ ...user, points: newPoints, xp: newXp });
      await supabase.from('profiles').update({ points: newPoints, xp: newXp }).eq('id', user.id);
    }
  };

  const handleDownload = async (resourceId: string) => {
    if (!user) return;
    const cost = (user.role === UserRole.STUDENT || user.role === UserRole.OUTSIDER) ? 10 : 0;
    
    if (user.points < cost) {
      alert("Not enough merit points! Share content to earn points.");
      return;
    }

    const updatedPoints = user.points - cost;
    const updatedXp = user.xp + 20;
    
    setUser({ ...user, points: updatedPoints, xp: updatedXp });
    await supabase.from('profiles').update({ points: updatedPoints, xp: updatedXp }).eq('id', user.id);
    await supabase.rpc('increment_downloads', { row_id: resourceId });
    
    setResources(prev => prev.map(r => r.id === resourceId ? { ...r, downloads: r.downloads + 1 } : r));
    alert("Resource Merit accessed. Download started.");
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updates };
    setUser(newUser);
    // Real-world: sync with supabase here
    await supabase.from('profiles').update({
      full_name: newUser.name,
      college_name: newUser.collegeName,
      department: newUser.department,
      bio: newUser.bio,
      graduation_year: newUser.graduationYear,
      specialization: newUser.specialization
    }).eq('id', user.id);
  };

  if (!user && !showLogin) return <Landing onStart={() => setShowLogin(true)} />;
  if (!user && showLogin) return <Login onLogin={setUser} onBack={() => setShowLogin(false)} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user!} resources={resources.filter(r => r.uploaderId === user!.id)} onUpload={handleAddResource} />;
      case 'explore': return <Explore resources={resources} user={user!} onDownload={handleDownload} />;
      case 'leaderboard': return <Leaderboard />;
      case 'communities': return <Communities userRole={user!.role} />;
      case 'profile': return <Profile user={user!} onUpdate={handleUpdateProfile} />;
      case 'admin': return user!.role === UserRole.ADMIN ? <AdminPanel resources={resources} /> : <Explore resources={resources} user={user!} onDownload={handleDownload} />;
      default: return <Dashboard user={user!} resources={[]} onUpload={handleAddResource} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar user={user!} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => { setUser(null); setShowLogin(false); }} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user!} onProfileClick={() => setActiveTab('profile')} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">{isLoading ? <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div></div> : renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default App;

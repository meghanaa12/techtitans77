
import React, { useState } from 'react';
import { Resource, User, NetworkType } from '../types';
import { Search, Grid, List as ListIcon, SlidersHorizontal, Lock, Globe } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';

interface ExploreProps {
  resources: Resource[];
  user: User;
}

const Explore: React.FC<ExploreProps> = ({ resources, user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Logic to prevent network data merge
  // Users only see content from their network or PUBLIC content.
  const filtered = resources.filter(r => {
    const isVisibleInNetwork = r.visibility === user.network || r.visibility === 'PUBLIC';
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    
    return isVisibleInNetwork && matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Question Paper', 'Class Notes', 'Study Material', 'Reference Book', 'Project Report'];

  return (
    <div className="space-y-8 pb-12">
      <div className="relative rounded-[2.5rem] bg-indigo-900 p-12 overflow-hidden shadow-2xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/20 skew-x-[-12deg] transform translate-x-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
             {user.network === 'EDU' ? (
               <div className="bg-indigo-500/30 text-indigo-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <Lock size={10} /> EDU Network Portal
               </div>
             ) : (
               <div className="bg-slate-500/30 text-slate-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <Globe size={10} /> General Public Portal
               </div>
             )}
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">cogniHUB Library</h1>
          <p className="text-indigo-200 text-lg max-w-xl">
            Access thousands of verified academic resources shared by the {user.network === 'EDU' ? 'campus' : 'global'} community.
          </p>
          
          <div className="mt-8 flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by topic, code or professor..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-2xl py-4 pl-12 pr-6 text-slate-900 focus:ring-4 focus:ring-indigo-500/30 outline-none transition-all shadow-xl"
              />
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white p-4 rounded-2xl shadow-xl transition-all">
              <SlidersHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          <button className="p-2 bg-slate-50 text-slate-900 rounded-xl shadow-sm"><Grid size={18} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600"><ListIcon size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Search size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No matches found</h2>
          <p className="text-slate-500 mt-2">Try adjusting your filters or switching your current network portal.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;

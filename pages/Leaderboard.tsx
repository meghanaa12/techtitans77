
import React from 'react';
import { Trophy, Medal, Star, ArrowUp, Zap } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const topUsers = [
    { id: '1', name: 'Ravi Teja', points: 12450, rank: 1, xp: 2400, avatar: 'R' },
    { id: '2', name: 'Sarah Chen', points: 9820, rank: 2, xp: 1900, avatar: 'S' },
    { id: '3', name: 'Mark Wilson', points: 8750, rank: 3, xp: 1750, avatar: 'M' },
    { id: '4', name: 'Emily Blunt', points: 7200, rank: 4, xp: 1200, avatar: 'E' },
    { id: '5', name: 'John Doe', points: 6400, rank: 5, xp: 1100, avatar: 'J' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Community Leaderboard</h1>
          <p className="text-slate-500">Top contributors making an impact this month.</p>
        </div>
        <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm">
          <Trophy size={18} />
          Season 1 Active
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {topUsers.slice(0, 3).map((user, i) => (
          <div key={user.id} className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center relative overflow-hidden ${i === 0 ? 'scale-105 shadow-xl border-indigo-100 z-10' : 'shadow-sm'}`}>
            {i === 0 && <div className="absolute top-0 inset-x-0 h-2 bg-indigo-600"></div>}
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-black mb-4 border-4 ${i === 0 ? 'bg-indigo-600 text-white border-indigo-100' : 'bg-slate-100 text-slate-400 border-slate-50'}`}>
              {user.avatar}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-indigo-600 font-black text-2xl mt-2">{user.points} <span className="text-xs font-medium text-slate-400">PTS</span></p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <Zap size={14} className="text-amber-500" />
              {user.xp} XP
            </div>
            <div className={`absolute top-6 right-6 w-8 h-8 rounded-lg flex items-center justify-center font-black ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
              #{user.rank}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4 text-left">Rank</th>
                <th className="px-8 py-4 text-left">User</th>
                <th className="px-8 py-4 text-center">Experience</th>
                <th className="px-8 py-4 text-center">Trend</th>
                <th className="px-8 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-slate-400">#{user.rank}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                        {user.avatar}
                      </div>
                      <span className="font-bold text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                       <Zap size={12} /> {user.xp}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <ArrowUp size={16} className="text-emerald-500 mx-auto" />
                  </td>
                  <td className="px-8 py-6 text-right font-black text-slate-900">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

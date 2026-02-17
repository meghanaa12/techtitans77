
import React from 'react';
import { Resource } from '../types';
import { 
  Users, 
  ShieldAlert, 
  BarChart3, 
  Flag,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface AdminPanelProps {
  resources: Resource[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ resources }) => {
  const chartData = [
    { name: 'Mon', uploads: 12 },
    { name: 'Tue', uploads: 19 },
    { name: 'Wed', uploads: 15 },
    { name: 'Thu', uploads: 22 },
    { name: 'Fri', uploads: 30 },
    { name: 'Sat', uploads: 10 },
    { name: 'Sun', uploads: 8 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Platform Control Center</h1>
        <p className="text-slate-500">Managing health, moderation, and insights of cogniHUB.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Pending Reports</p>
            <p className="text-2xl font-bold text-slate-900">03</p>
          </div>
          <div className="bg-rose-100 text-rose-600 p-3 rounded-2xl">
            <Flag size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Daily New Users</p>
            <p className="text-2xl font-bold text-slate-900">42</p>
          </div>
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
            <Users size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Platform Health</p>
            <p className="text-2xl font-bold text-slate-900">99.8%</p>
          </div>
          <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl">
            <BarChart3 size={24} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Upload Velocity (Past 7 Days)</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="uploads" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorUploads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Reports</h2>
          <div className="space-y-4">
            {[
              { id: '1', user: 'Mark S.', reason: 'Wrong category tag', file: 'OS Notes', date: '2h ago' },
              { id: '2', user: 'Jane D.', reason: 'Broken link', file: 'Math PYQ 2023', date: '5h ago' }
            ].map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-rose-100 text-rose-500 rounded-lg">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{report.reason}</p>
                    <p className="text-xs text-slate-500">Reported by {report.user} on {report.file}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:text-emerald-500"><CheckCircle size={18} /></button>
                  <button className="p-1 hover:text-rose-500"><XCircle size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Resource Moderation Queue</h2>
          <button className="text-indigo-600 font-bold text-sm">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4 text-left">Resource</th>
              <th className="px-6 py-4 text-left">Uploader</th>
              <th className="px-6 py-4 text-left">Upload Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {resources.map(resource => (
              <tr key={resource.id} className="text-sm">
                <td className="px-6 py-4 font-medium text-slate-900">{resource.title}</td>
                <td className="px-6 py-4 text-slate-600">{resource.uploaderName}</td>
                <td className="px-6 py-4 text-slate-500">{resource.uploadDate}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

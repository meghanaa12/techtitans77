
import React from 'react';
import { Resource } from '../types';
import { 
  Download, 
  Star, 
  Calendar, 
  Tag, 
  FileText, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  compact?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, compact = false }) => {
  const categoryColors: Record<string, string> = {
    'Question Paper': 'bg-rose-100 text-rose-600 border-rose-200',
    'Class Notes': 'bg-amber-100 text-amber-600 border-amber-200',
    'Study Material': 'bg-indigo-100 text-indigo-600 border-indigo-200',
    'Reference Book': 'bg-emerald-100 text-emerald-600 border-emerald-200',
    'Project Report': 'bg-purple-100 text-purple-600 border-purple-200',
    'Assignment': 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${categoryColors[resource.category] || 'bg-slate-100'}`}>
          {resource.category}
        </span>
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
          <Star size={14} fill="currentColor" />
          {resource.rating}
        </div>
      </div>

      <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors mb-2">
        {resource.title}
      </h3>
      
      {!compact && (
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {resource.description}
        </p>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Tag size={12} />
          <span className="font-medium">{resource.subject} • Sem {resource.semester}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Calendar size={12} />
          <span>Uploaded {new Date(resource.uploadDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
            {resource.uploaderName.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-slate-700">{resource.uploaderName}</span>
        </div>
        <button className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">
          <Download size={12} />
          {resource.downloads}
        </button>
      </div>

      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="text-indigo-400" size={20} />
      </div>
    </div>
  );
};

export default ResourceCard;

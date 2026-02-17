
import React, { useState, useRef } from 'react';
import { X, Upload, FileText, BrainCircuit, Sparkles, CheckCircle2, File, Trash2 } from 'lucide-react';
import { summarizeResource } from '../services/geminiService';
import { ResourceCategory, Resource, User } from '../types';

interface UploadModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpload: (resource: Resource) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ user, isOpen, onClose, onUpload }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Question Paper' as ResourceCategory,
    subject: '',
    semester: '1'
  });
  const [aiResult, setAiResult] = useState<{ summary: string, tags: string[] } | null>(null);

  const categories: ResourceCategory[] = [
    'Question Paper', 'Class Notes', 'Study Material', 'Reference Book', 'Project Report', 'Assignment'
  ];

  const handleProcessAI = async () => {
    if (!formData.title || !formData.description) return;
    setIsProcessing(true);
    const result = await summarizeResource(formData.title, formData.description);
    setAiResult(result);
    setIsProcessing(false);
    setStep(2);
  };

  const handlePublish = () => {
    if (!selectedFile) return;

    const newResource: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      uploaderId: user.id,
      uploaderName: user.name,
      category: formData.category,
      subject: formData.subject || 'General',
      semester: parseInt(formData.semester),
      uploadDate: new Date().toISOString(),
      rating: 0,
      downloads: 0,
      tags: aiResult?.tags || [],
      aiSummary: aiResult?.summary,
      fileUrl: '#', // In a real app, this would be the Supabase Storage URL
      visibility: user.network
    };

    onUpload(newResource);
    // Reset form for next time
    setStep(1);
    setFormData({
      title: '',
      description: '',
      category: 'Question Paper',
      subject: '',
      semester: '1'
    });
    setSelectedFile(null);
    setAiResult(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-[2rem] w-full max-w-xl relative shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Share Knowledge</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <X size={24} />
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Resource Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. CS201 - Data Structures 2024 Final PYQ" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as ResourceCategory})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Semester</label>
                  <select 
                    value={formData.semester}
                    onChange={e => setFormData({...formData, semester: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Subject Code / Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. CS201 Computer Science" 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Brief Description</label>
                <textarea 
                  placeholder="Describe what this resource contains..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={handleProcessAI}
                  disabled={isProcessing || !formData.title || !formData.description}
                  className="flex-1 bg-indigo-600 text-white rounded-2xl py-4 font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <BrainCircuit className="animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      AI Summarize & Tag
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
                 <h3 className="text-emerald-800 font-bold mb-2 flex items-center gap-2">
                   <CheckCircle2 size={18} />
                   AI Insights Ready
                 </h3>
                 <p className="text-emerald-700 text-sm leading-relaxed">
                   {aiResult?.summary}
                 </p>
                 <div className="mt-4 flex flex-wrap gap-2">
                   {aiResult?.tags.map((tag, i) => (
                     <span key={i} className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-emerald-600 shadow-sm">
                       #{tag}
                     </span>
                   ))}
                 </div>
               </div>

               <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.docx,.zip"
               />

               {!selectedFile ? (
                 <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
                      isDragging 
                      ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' 
                      : 'border-slate-200 bg-slate-50 hover:border-indigo-400 group'
                    }`}
                 >
                   <Upload className={`mx-auto mb-4 transition-colors ${isDragging ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} size={32} />
                   <p className="font-bold text-slate-700">Drop your file here</p>
                   <p className="text-slate-400 text-sm mt-1">PDF, DOCX, or ZIP (Max 50MB)</p>
                 </div>
               ) : (
                 <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                     <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                       <File size={24} />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900 truncate max-w-[200px]">{selectedFile.name}</p>
                       <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => setSelectedFile(null)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                   >
                     <Trash2 size={20} />
                   </button>
                 </div>
               )}

               <div className="flex gap-4">
                 <button 
                  onClick={() => setStep(1)}
                  className="flex-1 border border-slate-200 text-slate-600 rounded-2xl py-4 font-bold hover:bg-slate-50 transition-all"
                 >
                   Back
                 </button>
                 <button 
                  onClick={handlePublish}
                  disabled={!selectedFile}
                  className="flex-[2] bg-slate-900 text-white rounded-2xl py-4 font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50"
                 >
                   Confirm & Publish
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

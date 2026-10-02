import React, { useState } from 'react';
import JSZip from 'jszip';
import { Download, Copy, Check, FileCode, Search, Folder, Terminal, Sparkles, Layers } from 'lucide-react';
import { ANDROID_PROJECT_FILES } from '../data/androidProjectFiles';
import { AndroidCodeFile } from '../types';

import { downloadAndroidProjectZip } from '../utils/zipExport';

export const AndroidCodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<AndroidCodeFile>(ANDROID_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDownloading, setIsDownloading] = useState(false);

  const categories = [
    { id: 'all', label: 'جميع الملفات' },
    { id: 'gradle', label: 'إعدادات Gradle' },
    { id: 'manifest', label: 'المانيفيست' },
    { id: 'model', label: 'Models' },
    { id: 'repository', label: 'Repository' },
    { id: 'adapter', label: 'Adapters' },
    { id: 'activity', label: 'Activities' },
    { id: 'layout', label: 'XML Layouts' },
    { id: 'values', label: 'الألوان والترجمات' },
  ];

  const filteredFiles = ANDROID_PROJECT_FILES.filter(file => {
    const matchesCat = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesQuery = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await downloadAndroidProjectZip();
    } catch (err) {
      console.error('Failed to generate zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              مشروع Android Studio الكامل (Java + XML)
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                جاهز للاستيراد 100%
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              جميع الملفات البرمجية، الـ Activities، نماذج Firebase، وتصميمات XML
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 transition active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isDownloading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>تحميل مشروع Android Studio كاملاً (.ZIP)</span>
        </button>
      </div>

      {/* Main Container: File tree + Code view */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: File list */}
        <div className="w-full md:w-80 bg-slate-900/70 border-b md:border-b-0 md:border-l border-slate-800 flex flex-col">
          {/* Search box */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="بحث في ملفات المشروع..."
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Files List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredFiles.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-right p-2.5 rounded-lg flex items-start gap-2.5 transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/15 border border-blue-500/40 text-blue-300'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${
                    file.type === 'java' ? 'text-amber-400' :
                    file.type === 'xml' ? 'text-emerald-400' :
                    file.type === 'gradle' ? 'text-blue-400' : 'text-slate-400'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono font-medium truncate direction-ltr text-right">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {file.description}
                    </p>
                  </div>
                </button>
              );
            })}

            {filteredFiles.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                لا توجد ملفات مطابقة للبحث
              </div>
            )}
          </div>
        </div>

        {/* Right Code Display */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* File Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/50 border-b border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <Folder className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-mono text-slate-400 truncate direction-ltr">
                {selectedFile.path}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
          </div>

          {/* Description banner */}
          <div className="px-4 py-2 bg-blue-950/20 border-b border-blue-900/20 flex items-center justify-between text-xs text-blue-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {selectedFile.description}
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-blue-900/40 text-blue-300 rounded">
              {selectedFile.type.toUpperCase()}
            </span>
          </div>

          {/* Code Viewer with Syntax */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200 bg-[#0d1117] select-text">
            <pre className="direction-ltr text-left">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { CategoryId } from '../../types';
import { ChevronLeft, Layers } from 'lucide-react';

interface CategoriesScreenProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ onSelectCategory }) => {
  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            أقسام المتجر
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">تصفح المنتجات التقنية مصنفة حسب القسم</p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-lg">
          {CATEGORIES.length} أقسام رئيسية
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="group relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/80 p-3.5 flex items-center justify-between cursor-pointer hover:border-blue-500/80 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3.5 z-10">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {category.nameEn}
                </span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 font-medium px-2 py-0.5 rounded-full border border-blue-500/20">
                    {category.itemCount} منتج متوفر
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-700/50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
              <ChevronLeft className="w-4 h-4" />
            </div>

            {/* Gradient accent */}
            <div className={`absolute left-0 bottom-0 top-0 w-1 bg-gradient-to-b ${category.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

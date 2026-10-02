import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../../types';
import { CATEGORIES } from '../../data/mockData';
import { Search, SlidersHorizontal, Star, Heart, ShoppingBag, LayoutGrid, List, X, Filter } from 'lucide-react';

interface ProductsScreenProps {
  products: Product[];
  initialCategoryId?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: string[];
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({
  products,
  initialCategoryId = 'all',
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  favorites
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'rating'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // newest
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-4 pb-20 p-4">
      {/* Search and View controls */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث في جميع المنتجات..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition cursor-pointer font-medium ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            الكل ({products.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition cursor-pointer font-medium ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort selector bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
          <span>نتائج البحث: <strong className="text-white">{filteredProducts.length}</strong> منتج</span>
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-800">الأحدث إضافة</option>
              <option value="price_asc" className="bg-slate-800">السعر: من الأقل</option>
              <option value="price_desc" className="bg-slate-800">السعر: من الأعلى</option>
              <option value="rating" className="bg-slate-800">الأعلى تقييماً</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-slate-800/40 rounded-2xl border border-slate-700/60 p-6">
          <Filter className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">لم يتم العثور على أي منتجات!</h3>
          <p className="text-xs text-slate-400">جرب البحث بكلمة أخرى أو قم بإلغاء الفلاتر المحددة</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-2.5 flex flex-col justify-between hover:border-slate-600 transition shadow-sm group relative"
              >
                {/* Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product);
                  }}
                  className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 flex items-center justify-center text-slate-300 hover:text-rose-500 cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Discount */}
                {product.discountPercentage && (
                  <span className="absolute top-2 right-2 z-10 text-[9px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded-md">
                    خصم {product.discountPercentage}%
                  </span>
                )}

                <div 
                  onClick={() => onSelectProduct(product)} 
                  className="cursor-pointer space-y-2"
                >
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-[10px] font-semibold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-200 line-clamp-2 leading-relaxed">
                    {product.name}
                  </h3>

                  <div className="pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-blue-400">
                        {product.price.toLocaleString('ar-SA')} ر.س
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-slate-500 line-through">
                          {product.oldPrice.toLocaleString('ar-SA')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="mt-2.5 w-full py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>أضف للسلة</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredProducts.map(product => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-3 flex items-center gap-3 hover:border-slate-600 cursor-pointer transition relative"
              >
                <div className="w-24 h-24 rounded-xl bg-slate-900 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400 text-[10px]">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-500">({product.reviewsCount})</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-white truncate mt-1">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-blue-400">
                        {product.price.toLocaleString('ar-SA')} ر.س
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-slate-500 line-through">
                          {product.oldPrice.toLocaleString('ar-SA')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>أضف</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

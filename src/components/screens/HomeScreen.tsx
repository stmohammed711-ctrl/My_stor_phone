import React, { useState, useEffect } from 'react';
import { Search, Flame, Sparkles, Star, ChevronLeft, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, Category } from '../../types';
import { CATEGORIES } from '../../data/mockData';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: string[];
  onSelectCategory: (categoryId: string) => void;
  onSearchClick: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  favorites,
  onSelectCategory,
  onSearchClick
}) => {
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'عروض قوية على آيفون 15 برو ماكس',
      subtitle: 'خصومات تصل حتى 15% مع تقسيط بدون فوائد وشحن مجاني',
      badge: 'عرض خاص محدود',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
      gradient: 'from-blue-700 via-indigo-800 to-slate-900',
    },
    {
      id: 2,
      title: 'أجهزة ومنصات الألعاب الاحترافية',
      subtitle: 'بلايستيشن 5 سليم وشاشات OLED 240Hz مع هدايا قيمة',
      badge: 'عشاق الألعاب',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
      gradient: 'from-purple-800 via-rose-900 to-slate-900',
    },
    {
      id: 3,
      title: 'عالم الصوتيات الفاخرة',
      subtitle: 'سماعات سوني وآبل مع عزل ضوضاء متفوق وبطارية تدوم أياماً',
      badge: 'الأعلى تقييماً',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      gradient: 'from-amber-700 via-orange-800 to-slate-900',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival || p.isFeatured);

  return (
    <div className="space-y-5 pb-20">
      {/* Search Header Bar */}
      <div className="px-4 pt-3">
        <div 
          onClick={onSearchClick}
          className="flex items-center gap-2.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 shadow-inner cursor-pointer hover:border-blue-500 transition"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400">ابحث عن جوال، لابتوب، سماعة، شاحن...</span>
        </div>
      </div>

      {/* Hero Banner Carousel */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-2xl h-44 shadow-lg border border-slate-800">
          {banners.map((b, idx) => (
            <div
              key={b.id}
              className={`absolute inset-0 transition-opacity duration-700 p-4 flex flex-col justify-between bg-gradient-to-l ${b.gradient} ${
                idx === activeBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20">
                  {b.badge}
                </span>
                <span className="text-[10px] text-white/70 font-mono">
                  {idx + 1} / {banners.length}
                </span>
              </div>

              <div className="relative z-10 max-w-[70%]">
                <h3 className="text-sm font-black text-white leading-tight mb-1">
                  {b.title}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-2">
                  {b.subtitle}
                </p>
              </div>

              {/* Dots */}
              <div className="flex gap-1.5 z-10">
                {banners.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveBanner(dotIdx)}
                    className={`h-1.5 rounded-full transition-all ${
                      dotIdx === activeBanner ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Background preview image */}
              <img
                src={b.image}
                alt=""
                className="absolute left-0 bottom-0 top-0 w-36 object-cover opacity-40 mix-blend-overlay pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Categories Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-xs font-bold text-slate-200">تسوق حسب الأقسام</h2>
          <button 
            onClick={() => onSelectCategory('all')} 
            className="text-[11px] text-blue-400 font-semibold flex items-center hover:underline cursor-pointer"
          >
            <span>عرض الكل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-1.5 min-w-[68px] group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 shadow-md group-hover:scale-105 transition-transform`}>
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:opacity-90" />
                </div>
              </div>
              <span className="text-[11px] text-slate-300 font-medium text-center line-clamp-1">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="text-xs font-bold text-white">الأكثر مبيعاً</h2>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            طلب متزايد
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4">
          {bestSellers.map(product => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-2.5 flex flex-col justify-between hover:border-slate-600 transition shadow-sm group relative"
              >
                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product);
                  }}
                  className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 flex items-center justify-center text-slate-300 hover:text-rose-500 cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Discount Badge */}
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

                {/* Quick Add to Cart */}
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
      </div>

      {/* New Arrivals Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-white">وصل حديثاً</h2>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            أحدث الأجهزة 2026
          </span>
        </div>

        <div className="space-y-2 px-4">
          {newArrivals.slice(0, 3).map(product => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-2.5 flex items-center gap-3 hover:border-slate-600 cursor-pointer transition"
            >
              <div className="w-20 h-20 rounded-xl bg-slate-900 p-1 shrink-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    جديد
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-200 truncate mt-1">
                  {product.name}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-black text-blue-400">
                    {product.price.toLocaleString('ar-SA')} ر.س
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Product } from '../../types';
import { ChevronRight, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check } from 'lucide-react';

interface ProductDetailScreenProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
  isFavorite,
  onSelectRelated,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const related = allProducts.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 pb-24 overflow-y-auto">
      {/* Top Toolbar */}
      <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-slate-300 truncate max-w-[200px]">
          تفاصيل المنتج
        </span>

        <button
          onClick={() => onToggleFavorite(product)}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-rose-500 hover:bg-slate-700 transition cursor-pointer"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Main Image Gallery */}
      <div className="p-4 space-y-3">
        <div className="relative w-full h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
          <img
            src={gallery[activeImageIndex] || product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />

          {product.discountPercentage && (
            <span className="absolute top-3 right-3 text-xs font-bold bg-rose-600 text-white px-2.5 py-1 rounded-lg shadow">
              خصم {product.discountPercentage}%
            </span>
          )}

          <span className="absolute bottom-3 left-3 text-[10px] font-medium bg-black/60 backdrop-blur text-white px-2 py-0.5 rounded-full">
            {activeImageIndex + 1} / {gallery.length}
          </span>
        </div>

        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex gap-2 justify-center">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                  i === activeImageIndex ? 'border-blue-500' : 'border-slate-800 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details Header */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-600'}`} />
              ))}
            </div>
            <span>{product.rating}</span>
            <span className="text-slate-500">({product.reviewsCount} تقييم)</span>
          </div>

          <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
            product.stock > 5 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
          }`}>
            {product.stock > 0 ? `متوفر في المخزون (${product.stock})` : 'نفذت الكمية'}
          </span>
        </div>

        <h1 className="text-base font-black text-white leading-snug">
          {product.name}
        </h1>

        {/* Price Box */}
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-blue-400">
                {product.price.toLocaleString('ar-SA')} ر.س
              </span>
              {product.oldPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {product.oldPrice.toLocaleString('ar-SA')} ر.س
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">السعر شامل ضريبة القيمة المضافة 15%</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1 gap-2">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-white w-5 text-center font-mono">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 disabled:opacity-30 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Guarantees Badges */}
        <div className="grid grid-cols-3 gap-2 py-2 text-center">
          <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-2 space-y-1">
            <Truck className="w-4 h-4 text-blue-400 mx-auto" />
            <p className="text-[10px] font-bold text-white">توصيل سريع</p>
            <p className="text-[9px] text-slate-400">خلال 24-48 ساعة</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-2 space-y-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
            <p className="text-[10px] font-bold text-white">ضمان أصلي</p>
            <p className="text-[9px] text-slate-400">سنتين من الوكيل</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-2 space-y-1">
            <RotateCcw className="w-4 h-4 text-amber-400 mx-auto" />
            <p className="text-[10px] font-bold text-white">إرجاع سهل</p>
            <p className="text-[9px] text-slate-400">خلال 14 يوم</p>
          </div>
        </div>

        {/* Tabs for Info */}
        <div className="border-b border-slate-800 flex gap-4 text-xs font-bold pt-2">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2.5 transition border-b-2 cursor-pointer ${
              activeTab === 'specs' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            المواصفات التقنية
          </button>
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-2.5 transition border-b-2 cursor-pointer ${
              activeTab === 'desc' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            تفاصيل المنتج
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2.5 transition border-b-2 cursor-pointer ${
              activeTab === 'reviews' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            التقييمات ({product.reviewsCount})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="space-y-2 py-1">
            {Object.entries(product.specifications || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-xs py-2 border-b border-slate-800/80">
                <span className="text-slate-400">{key}</span>
                <span className="text-slate-200 font-semibold text-left direction-ltr">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'desc' && (
          <div className="py-2 text-xs text-slate-300 leading-relaxed">
            {product.description}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3 py-2">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-black">{product.rating} من 5</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">بناءً على {product.reviewsCount} تقييم موثق</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                تقييم إيجابي 98%
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">سعد الشمري</span>
                  <span className="text-[10px] text-slate-500">قبل 3 أيام</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                </div>
                <p className="text-[11px] text-slate-300">منتج ممتاز وتوصيل سريع جداً في نفس اليوم بالرياض! الجهاز أصلي ومغلف تغليف المصنع.</p>
              </div>

              <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">أحمد الغامدي</span>
                  <span className="text-[10px] text-slate-500">قبل أسبوع</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
                </div>
                <p className="text-[11px] text-slate-300">السعر منافس جداً مقارنة بالسوق والخدمة ممتازة، شكرًا تكنوستور.</p>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pt-4 space-y-2">
            <h3 className="text-xs font-bold text-white">منتجات ذات صلة</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {related.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectRelated(p)}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2 cursor-pointer hover:border-blue-500 transition"
                >
                  <img src={p.image} alt={p.name} className="w-full h-24 object-contain rounded-lg bg-slate-900 p-1" />
                  <h4 className="text-[11px] font-bold text-white truncate mt-1">{p.name}</h4>
                  <span className="text-xs font-black text-blue-400">{p.price.toLocaleString('ar-SA')} ر.س</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Bar (Add to cart & Buy now) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[420px] mx-auto bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 flex gap-2 z-30">
        <button
          onClick={() => onAddToCart(product, quantity)}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-blue-400" />
          <span>أضف للسلة</span>
        </button>

        <button
          onClick={() => onBuyNow(product, quantity)}
          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>شراء الآن</span>
        </button>
      </div>
    </div>
  );
};

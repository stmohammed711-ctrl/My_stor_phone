import React from 'react';
import { Product } from '../../types';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

interface FavoritesScreenProps {
  favorites: string[];
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onRemoveFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreProducts: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  allProducts,
  onSelectProduct,
  onRemoveFavorite,
  onAddToCart,
  onExploreProducts
}) => {
  const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[500px] space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">قائمة المفضلة فارغة!</h3>
          <p className="text-xs text-slate-400 max-w-xs">
            اضغط على علامة القلب في أي منتج لإضافته إلى قائمة أمنياتك والرجوع إليه لاحقاً.
          </p>
        </div>
        <button
          onClick={onExploreProducts}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-lg shadow-blue-500/20"
        >
          استكشف المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            المنتجات المفضلة
          </h2>
          <p className="text-xs text-slate-400">لديك {favoriteProducts.length} أجهزة محفوظة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {favoriteProducts.map(product => (
          <div
            key={product.id}
            className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3 flex gap-3 items-center hover:border-slate-600 transition"
          >
            <div
              onClick={() => onSelectProduct(product)}
              className="w-20 h-20 rounded-xl bg-slate-900 p-1 shrink-0 cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <h3
                onClick={() => onSelectProduct(product)}
                className="text-xs font-bold text-white truncate cursor-pointer hover:text-blue-400"
              >
                {product.name}
              </h3>
              <p className="text-xs font-black text-blue-400">
                {product.price.toLocaleString('ar-SA')} ر.س
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onAddToCart(product)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>أضف للسلة</span>
                </button>
                <button
                  onClick={() => onRemoveFavorite(product)}
                  className="p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                  title="حذف من المفضلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

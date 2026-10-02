import React, { useState } from 'react';
import { CartItem } from '../../types';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'TECH10') {
      setDiscountPercent(10);
      setCouponSuccess('تم تطبيق خصم 10% بنجاح!');
    } else if (code === 'WELCOME') {
      setDiscountPercent(15);
      setCouponSuccess('تم تطبيق خصم 15% للترحيب!');
    } else {
      setCouponError('رمز الخصم غير صالح أو منتهي الصلاحية');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[500px] space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">سلة التسوق فارغة!</h3>
          <p className="text-xs text-slate-400 max-w-xs">
            لم تقم بإضافة أي أجهزة إلكترونية إلى سلتك بعد. تصفح أحدث الجوالات واللابتوبات الآن.
          </p>
        </div>
        <button
          onClick={onStartShopping}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-lg shadow-blue-500/20"
        >
          ابدأ التسوق الآن
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-white">سلة المشتريات</h2>
          <p className="text-xs text-slate-400">لديك {cart.reduce((a, b) => a + b.quantity, 0)} منتج في السلة</p>
        </div>
        {subtotal > 500 && (
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
            🎉 مبروك! الشحن مجاني
          </span>
        )}
      </div>

      {/* Cart items list */}
      <div className="space-y-3">
        {cart.map(item => (
          <div
            key={item.product.id}
            className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3 flex gap-3 items-center shadow-sm"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-xl bg-slate-900 p-1 shrink-0 overflow-hidden flex items-center justify-center border border-slate-800">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                  {item.product.name}
                </h3>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition cursor-pointer"
                  title="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-black text-blue-400">
                  {(item.product.price * item.quantity).toLocaleString('ar-SA')} ر.س
                </span>

                {/* Counter */}
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5 gap-1">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-white w-5 text-center font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon box */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>كوبون الخصم</span>
          <span className="text-[10px] text-slate-500 font-normal">(جرب: TECH10 أو WELCOME)</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            placeholder="أدخل كود الخصم هنا..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            تطبيق
          </button>
        </div>
        {couponSuccess && <p className="text-[11px] text-emerald-400">{couponSuccess}</p>}
        {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
      </div>

      {/* Price breakdown */}
      <div className="bg-slate-800/90 border border-slate-700/70 rounded-2xl p-3.5 space-y-2.5 text-xs">
        <h4 className="font-bold text-white border-b border-slate-700 pb-2">ملخص الفاتورة</h4>
        <div className="flex justify-between text-slate-400">
          <span>المجموع الفرعي:</span>
          <span className="text-white font-mono">{subtotal.toLocaleString('ar-SA')} ر.س</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>تكلفة الشحن والتوصيل:</span>
          <span className={shippingFee === 0 ? "text-emerald-400 font-bold" : "text-white font-mono"}>
            {shippingFee === 0 ? 'مجاني' : `${shippingFee} ر.س`}
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>الخصم ({discountPercent}%):</span>
            <span className="font-mono">- {discountAmount.toLocaleString('ar-SA')} ر.س</span>
          </div>
        )}
        <div className="border-t border-slate-700 pt-2 flex justify-between items-baseline font-black text-sm">
          <span className="text-white">الإجمالي النهائي:</span>
          <span className="text-blue-400 font-mono text-base">{total.toLocaleString('ar-SA')} ر.س</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onProceedToCheckout}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition active:scale-95 cursor-pointer"
      >
        <span>متابعة إتمام الطلب</span>
        <ArrowLeft className="w-4 h-4" />
      </button>
    </div>
  );
};

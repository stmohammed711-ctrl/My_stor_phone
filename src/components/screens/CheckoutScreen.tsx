import React, { useState } from 'react';
import { CartItem, Order, UserProfile } from '../../types';
import { ChevronRight, CreditCard, Banknote, ShieldCheck, CheckCircle2, MapPin, Phone, User, FileText } from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  currentUser: UserProfile;
  onBack: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  currentUser,
  onBack,
  onOrderSuccess
}) => {
  const [name, setName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [city, setCity] = useState(currentUser.city || 'الرياض');
  const [address, setAddress] = useState(currentUser.address || '');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal > 500 ? 0 : 25;
  const total = subtotal + shippingFee;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'الاسم مطلوب';
    if (!phone.trim()) err.phone = 'رقم الهاتف مطلوب';
    if (!city.trim()) err.city = 'المدينة مطلوبة';
    if (!address.trim()) err.address = 'العنوان بالتفصيل مطلوب';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: 'ord-' + Date.now(),
        orderNumber: 'TK-' + Math.floor(10000 + Math.random() * 90000),
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        subtotal,
        shippingFee,
        discount: 0,
        total,
        status: 'pending',
        customerName: name,
        phoneNumber: phone,
        city,
        address,
        notes,
        paymentMethod
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 pb-24 overflow-y-auto">
      {/* Top Toolbar */}
      <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-white">إتمام طلب الشراء</span>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-4">
        {/* Shipping details form */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-700 pb-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            بيانات الشحن والتوصيل
          </h3>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">اسم العميل بالكامل *</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: محمد العمري"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              {errors.name && <p className="text-[10px] text-rose-400 mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-slate-400 mb-1">رقم الهاتف الجوال *</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 direction-ltr text-right"
                />
              </div>
              {errors.phone && <p className="text-[10px] text-rose-400 mt-0.5">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">المدينة *</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="الخبر">الخبر</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">الحي</label>
                <input
                  type="text"
                  placeholder="مثال: حي النرجس"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">العنوان بالتفصيل (الشارع والمبنى) *</label>
              <textarea
                rows={2}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="اسم الشارع، رقم الفيلا أو الشقة، أي علامة مميزة..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              {errors.address && <p className="text-[10px] text-rose-400 mt-0.5">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-slate-400 mb-1">ملاحظات التوصيل (اختياري)</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="الاتصال قبل الوصول، عدم الضغط على الجرس..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-700 pb-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            اختر طريقة الدفع
          </h3>

          <div className="space-y-2">
            <label
              onClick={() => setPaymentMethod('cod')}
              className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                paymentMethod === 'cod'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Banknote className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-xs font-bold text-white">الدفع نقدًا أو مدى عند الاستلام (COD)</p>
                  <p className="text-[10px] text-slate-400">ادفع للمندوب عند وصول شحنتك لمنزلك</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="text-blue-600"
              />
            </label>

            <label
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs font-bold text-white">بطاقة مدى / فيزا / ماستركارد / Apple Pay</p>
                  <p className="text-[10px] text-slate-400">دفع إلكتروني آمن ومشفر 100%</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="text-blue-600"
              />
            </label>
          </div>
        </div>

        {/* Order Summary Recap */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>عدد الأصناف:</span>
            <span className="text-white">{cart.reduce((a, b) => a + b.quantity, 0)} قطعة</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>المجموع:</span>
            <span className="text-white">{subtotal.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>الشحن:</span>
            <span className={shippingFee === 0 ? "text-emerald-400 font-bold" : "text-white"}>
              {shippingFee === 0 ? 'مجاني' : `${shippingFee} ر.س`}
            </span>
          </div>
          <div className="border-t border-slate-700 pt-2 flex justify-between font-black text-sm">
            <span className="text-white">المجموع الإجمالي:</span>
            <span className="text-blue-400">{total.toLocaleString('ar-SA')} ر.س</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>جاري تسجيل الطلب في Firebase...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>تأكيد الطلب النهائي ({total.toLocaleString('ar-SA')} ر.س)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

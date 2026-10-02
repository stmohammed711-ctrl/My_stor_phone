import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { User, Mail, Phone, MapPin, Package, Heart, Shield, LogOut, ChevronLeft, Edit3, Check } from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onNavigateToOrders: () => void;
  onNavigateToFavorites: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onNavigateToOrders,
  onNavigateToFavorites,
  onOpenAdmin,
  onLogout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [address, setAddress] = useState(user.address);

  const handleSave = () => {
    onUpdateUser({
      ...user,
      name,
      phone,
      city,
      address
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-4 relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border-2 border-blue-500/40 p-0.5 overflow-hidden shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-white truncate">{user.name}</h2>
              {user.isAdmin && (
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  مدير النظام
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
            <p className="text-[11px] text-blue-400 font-mono mt-0.5 direction-ltr text-right">{user.phone}</p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition"
          >
            {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4" />}
          </button>
        </div>

        {/* Edit fields collapsible */}
        {isEditing && (
          <div className="mt-4 pt-4 border-t border-slate-700/80 space-y-2.5 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">رقم الهاتف</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">المدينة</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">العنوان</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                />
              </div>
            </div>
            <button
              onClick={handleSave}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer"
            >
              حفظ التعديلات
            </button>
          </div>
        )}
      </div>

      {/* Admin Panel Banner if admin */}
      {user.isAdmin && (
        <button
          onClick={onOpenAdmin}
          className="w-full p-3.5 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-700/20 border border-amber-500/30 rounded-2xl flex items-center justify-between text-right cursor-pointer hover:border-amber-500/60 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-200">لوحة تحكم الإدارة (Admin Panel)</h3>
              <p className="text-[10px] text-slate-400">إضافة وتعديل المنتجات، متابعة الطلبات، وتغيير حالات الشحن</p>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
        </button>
      )}

      {/* Action Links */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden divide-y divide-slate-700/70">
        <button
          onClick={onNavigateToOrders}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/40 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">طلباتي السابقة والحالية</h4>
              <p className="text-[10px] text-slate-400">تتبع مسار شحناتك وفواتيرك</p>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onNavigateToFavorites}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-700/40 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">قائمة المفضلة</h4>
              <p className="text-[10px] text-slate-400">الأجهزة التي قمت بحفظها</p>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-bold text-white">العنوان الافتراضي للتوصيل</h4>
              <p className="text-[10px] text-slate-400">{user.city} - {user.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3 bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>تسجيل الخروج من الحساب</span>
      </button>
    </div>
  );
};

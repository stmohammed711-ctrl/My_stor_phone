import React, { useState, useEffect } from 'react';
import { Smartphone, Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white select-none">
      <div className="w-full" />

      <div className="flex flex-col items-center space-y-4 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-500 p-1 shadow-2xl shadow-blue-500/40 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Smartphone className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-white">تكنوستور</h1>
          <p className="text-xs text-blue-300 font-medium tracking-wide">عالم التقنية والإلكترونيات الذكية</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3 pb-6">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-[11px] text-slate-400 font-mono">الإصدار 1.0.0 (Android SDK 34)</span>
      </div>
    </div>
  );
};

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigateToRegister: () => void;
  onSkip: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onSkip
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('almmrymhmdhsyn39@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone.trim() || !password.trim()) {
      setError('يرجى إدخال البيانات كاملة');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        id: 'usr-901',
        name: 'محمد حسين العمري',
        email: emailOrPhone.includes('@') ? emailOrPhone : 'user@technostore.com',
        phone: emailOrPhone.includes('@') ? '+966 50 123 4567' : emailOrPhone,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        city: 'الرياض',
        address: 'حي النرجس، شارع أنس بن مالك',
        isAdmin: true
      });
    }, 900);
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-slate-900 text-white overflow-y-auto">
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-bold text-blue-400">تكنوستور</span>
        <button
          onClick={onSkip}
          className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
        >
          تخطي والتصفح كزائر
        </button>
      </div>

      <div className="py-6 space-y-6">
        <div>
          <h2 className="text-xl font-black text-white">مرحباً بك مجدداً 👋</h2>
          <p className="text-xs text-slate-400 mt-1">سجل دخولك لمتابعة طلباتك ومشترياتك الإلكترونية</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        {forgotSent && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني!
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-300 block mb-1 font-medium">البريد الإلكتروني أو رقم الهاتف</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={e => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com أو 05XXXXXXXX"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-medium">كلمة المرور</label>
              <button
                type="button"
                onClick={() => setForgotSent(true)}
                className="text-[11px] text-blue-400 hover:underline cursor-pointer"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>تسجيل الدخول</span>
            )}
          </button>
        </form>
      </div>

      <div className="pt-4 text-center border-t border-slate-800">
        <p className="text-xs text-slate-400">
          ليس لديك حساب بعد؟{' '}
          <button
            onClick={onNavigateToRegister}
            className="text-blue-400 font-bold hover:underline cursor-pointer"
          >
            إنشاء حساب جديد
          </button>
        </p>
      </div>
    </div>
  );
};

interface RegisterScreenProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !phone || !email || !password) {
      setError('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن لا تقل عن 6 خانات');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({
        id: 'usr-' + Date.now(),
        name,
        email,
        phone,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        city: 'الرياض',
        address: 'شارع الملك فهد',
        isAdmin: false
      });
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-slate-900 text-white overflow-y-auto">
      <div className="py-2">
        <h2 className="text-xl font-black text-white">إنشاء حساب جديد ✨</h2>
        <p className="text-xs text-slate-400 mt-1">انضم إلى تكنوستور وتمتع بخصومات حصرية وشحن سريع</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-3 text-xs my-auto">
        <div>
          <label className="text-slate-300 block mb-1">الاسم الكامل *</label>
          <div className="relative">
            <User className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="مثال: أحمد محمد"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 block mb-1">رقم الهاتف *</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="05XXXXXXXX"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 direction-ltr text-right"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 block mb-1">البريد الإلكتروني *</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-slate-300 block mb-1">كلمة المرور *</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">تأكيد كلمة المرور *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition active:scale-95 disabled:opacity-50 cursor-pointer mt-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            <span>إنشاء الحساب ومتابعة التسوق</span>
          )}
        </button>
      </form>

      <div className="pt-4 text-center border-t border-slate-800">
        <p className="text-xs text-slate-400">
          لديك حساب بالفعل؟{' '}
          <button
            onClick={onNavigateToLogin}
            className="text-blue-400 font-bold hover:underline cursor-pointer"
          >
            تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Share2, PlusSquare, CheckCircle2, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold">
        <CheckCircle2 className="w-4 h-4" />
        <span>التطبيق مثبت على جهازك</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setJustInstalled(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/25 transition active:scale-95 cursor-pointer animate-pulse hover:animate-none"
      >
        <Smartphone className="w-4 h-4" />
        <span>تثبيت التطبيق طوالي 📲</span>
      </button>

      {/* Guide Dialog for iOS or manual install */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">تثبيت التطبيق على هاتفك</h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p className="text-slate-400">
                يمكنك تثبيت تطبيق <strong>تكنوستور</strong> مباشرة ليعمل كأي تطبيق أصلي على الشاشة الرئيسية بدون الحاجة لمتجر:
              </p>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>على أجهزة أندرويد (Google Chrome):</span>
                </p>
                <p className="text-slate-400 pr-6">
                  اضغط على قائمة المتصفح (⋮) ثم اختر <strong>"تثبيت التطبيق"</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong>.
                </p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>على أجهزة آيفون (Safari):</span>
                </p>
                <p className="text-slate-400 pr-6">
                  اضغط على زر المشاركة <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-400" /> في أسفل الشاشة، ثم مرر لأسفل واختر <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              فهمت، حسناً
            </button>
          </div>
        </div>
      )}
    </>
  );
};

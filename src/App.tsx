import React, { useState } from 'react';
import { 
  Smartphone, Code2, Download, ShieldCheck, 
  HelpCircle, Layers, CheckCircle2, Copy, BookOpen, FileArchive, Sparkles
} from 'lucide-react';
import { PRODUCTS, MOCK_ORDERS, CURRENT_USER } from './data/mockData';
import { Product, Order, UserProfile, OrderStatus } from './types';
import { AndroidSimulator } from './components/AndroidSimulator';
import { AndroidCodeExplorer } from './components/AndroidCodeExplorer';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { 
  downloadAndroidStudioPCZip, 
  downloadAndroidIDEMobileZip, 
  downloadAndroidProjectZip 
} from './utils/zipExport';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'guide'>('simulator');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [isZippingPC, setIsZippingPC] = useState(false);
  const [isZippingMobile, setIsZippingMobile] = useState(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleCreateOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const handleDownloadPC = async () => {
    setIsZippingPC(true);
    try {
      await downloadAndroidStudioPCZip();
    } finally {
      setIsZippingPC(false);
    }
  };

  const handleDownloadMobile = async () => {
    setIsZippingMobile(true);
    try {
      await downloadAndroidIDEMobileZip();
    } finally {
      setIsZippingMobile(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">تكنوستور للإلكترونيات</h1>
                <span className="text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  تطبيق مثبت + كود Android Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">
                جاهز للتثبيت المباشر على الهاتف أو الفتح في Android Studio (Java & XML)
              </p>
            </div>
          </div>

          {/* Action buttons: Direct Install PWA & Direct Zip Downloads */}
          <div className="flex items-center gap-2">
            {/* Direct PWA Install Button */}
            <PWAInstallButton />

            {/* Direct PC Android Studio Download */}
            <button
              onClick={handleDownloadPC}
              disabled={isZippingPC}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isZippingPC ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>نسخة الكمبيوتر (Android Studio PC) 💻</span>
            </button>
          </div>

          {/* Navigation View Switcher */}
          <div className="w-full sm:w-auto flex items-center bg-slate-800/90 p-1 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>معاينة التطبيق</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>ملفات المشروع (Java & XML)</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>دليل التشغيل في الكمبيوتر</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* Quick Multi-Option Banner */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: PC Version */}
          <div className="bg-gradient-to-br from-blue-950/50 via-indigo-950/40 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg shadow-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                  موصى به للكمبيوتر
                </span>
                <h3 className="text-xs font-black text-white mt-1">نسخة أندرويد ستوديو (PC)</h3>
                <p className="text-[11px] text-slate-400">لأجهزة Windows / Mac / Linux مع Gradle 8.2</p>
              </div>
            </div>
            <button
              onClick={handleDownloadPC}
              disabled={isZippingPC}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow"
            >
              {isZippingPC ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>تحميل نسخة الكمبيوتر (.ZIP) 💻</span>
            </button>
          </div>

          {/* Card 2: Phone Direct Install */}
          <div className="bg-gradient-to-br from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  تثبيت مباشر
                </span>
                <h3 className="text-xs font-black text-white mt-1">تثبيت فوري طوالي على الهاتف</h3>
                <p className="text-[11px] text-slate-400">يتثبت مباشرة كأيقونة على الشاشة بدون كود</p>
              </div>
            </div>
            <PWAInstallButton />
          </div>

          {/* Card 3: Mobile AndroidIDE */}
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <FileArchive className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  تطبيق الهاتف
                </span>
                <h3 className="text-xs font-black text-white mt-1">نسخة تطبيق AndroidIDE</h3>
                <p className="text-[11px] text-slate-400">معدلة لـ Gradle 7.4.2 على هواتف أندرويد</p>
              </div>
            </div>
            <button
              onClick={handleDownloadMobile}
              disabled={isZippingMobile}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
            >
              {isZippingMobile ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>تحميل نسخة الهاتف (.ZIP) 📱</span>
            </button>
          </div>
        </div>

        {activeTab === 'simulator' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            {/* The Phone Simulator */}
            <div className="w-full max-w-[420px] mx-auto shrink-0">
              <AndroidSimulator
                products={products}
                orders={orders}
                currentUser={currentUser}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onCreateOrder={handleCreateOrder}
                onUpdateUser={setCurrentUser}
              />
            </div>

            {/* Quick Feature Highlights & Tech Details */}
            <div className="flex-1 space-y-4 max-w-xl">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  مواصفات التطبيق والمشروع:
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span><strong>تثبيت فوري (PWA):</strong> يدعم التثبيت المباشر على أندرويد وآيفون والكمبيوتر ليعمل كتطبيق أصلي منفصل.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span><strong>ملف مضغوط جاهز (.ZIP):</strong> يضم مشروع Android Studio كاملاً بلغة Java مع Gradle 8 و SDK 34.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span><strong>واجهات XML عربية:</strong> Material Design 3، ودعم RTL الكامل والوضع الليلي والتفاعلي.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span><strong>تكامل Firebase كامل:</strong> Firestore Database للمنتجات والطلبات والمستخدمين + Firebase Auth.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span><strong>لوحة تحكم المشرف:</strong> إمكانية إضافة وحذف وتعديل الأجهزة ومتابعة حالات التوصيل مباشرة.</span>
                  </li>
                </ul>
              </div>

              {/* Install and Zip shortcuts */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  طريقتان لاستخدام التطبيق:
                </h4>
                <div className="space-y-2 text-xs text-slate-400">
                  <p>1. <strong>إذا أردت استخدامه على هاتفك فوراً دون كود:</strong> اضغط على زر "تثبيت التطبيق طوالي" في الأعلى وسيظهر في شاشة هاتفك مثل أي تطبيق مثبت.</p>
                  <p>2. <strong>إذا أردت تعديل أو تطوير كود الأندرويد في Android Studio:</strong> اضغط على زر "تحميل الملف المضغوط (.ZIP)" لفك الضغط وتشغيله في بيئة Android Studio البرمجية.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <AndroidCodeExplorer />
        )}

        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white">دليل تثبيت التطبيق طوالي واستيراد الملف المضغوط</h2>
              <p className="text-xs text-slate-400">
                إليك الخطوات لتثبيت التطبيق مباشرة على هاتفك، أو فتح الملف المضغوط في Android Studio:
              </p>
            </div>

            <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
              {/* Option A */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
                <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  أولاً: كيفية تثبيت التطبيق طوالي على الهاتف (PWA Direct Install)
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pr-2">
                  <li>اضغط على زر <strong>"تثبيت التطبيق طوالي 📲"</strong> الأخضر في أعلى الشاشة.</li>
                  <li><strong>على هواتف أندرويد (متصفح كروم):</strong> ستظهر لك نافذة تثبيت فورية اضغط "تثبيت" وسيتم إضافة التطبيق لقائمة التطبيقات والشاشة الرئيسية فوراً.</li>
                  <li><strong>على هواتف آيفون (متصفح سفاري):</strong> اضغط على زر المشاركة ثم اختر <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong>.</li>
                  <li>سيعمل التطبيق في شاشة كاملة وبدون شريط المتصفح وبشكل فائق السرعة!</li>
                </ol>
              </div>

              {/* Option B */}
              <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-4 space-y-2">
                <h3 className="font-bold text-blue-400 text-sm flex items-center gap-2">
                  <FileArchive className="w-4 h-4" />
                  ثانياً: فتح الملف المضغوط (.ZIP) في Android Studio
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pr-2">
                  <li>اضغط على زر <strong>"تحميل الملف المضغوط (.ZIP) 📦"</strong> لتنزيل المشروع كاملاً.</li>
                  <li>فك ضغط الملف المضغوط <code className="bg-slate-800 px-1 py-0.5 rounded text-white">TechnoStore-Android-Project.zip</code> على جهازك.</li>
                  <li>افتح برنامج <strong>Android Studio</strong> واختر <strong>Open</strong> ثم حدد مجلد المشروع المستخرج.</li>
                  <li>انتظر اكتمال مزامنة Gradle Sync.</li>
                  <li>ضع ملف <code className="bg-slate-800 px-1 py-0.5 rounded text-white">google-services.json</code> الخاص بمشروعك في Firebase داخل مجلد <code className="bg-slate-800 px-1 py-0.5 rounded text-white">app/</code>.</li>
                  <li>اضغط على زر <strong>Run ▶</strong> لتشغيل التطبيق على الهاتف أو المحاكي.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Offline Mode Indicator */}
      <OfflineIndicator />
    </div>
  );
}

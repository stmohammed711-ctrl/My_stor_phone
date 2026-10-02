import React, { useState } from 'react';
import { 
  Home, Grid, ShoppingBag, Package, User, Wifi, Battery, 
  Signal, Search, Bell, Shield, ArrowRight, Circle, Square, Triangle 
} from 'lucide-react';
import { Product, CartItem, Order, UserProfile, OrderStatus } from '../types';
import { SplashScreen, LoginScreen, RegisterScreen } from './screens/AuthScreens';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { ProductsScreen } from './screens/ProductsScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';

type ScreenType = 
  | 'splash'
  | 'login'
  | 'register'
  | 'home'
  | 'categories'
  | 'products'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'favorites'
  | 'profile'
  | 'admin';

interface AndroidSimulatorProps {
  products: Product[];
  orders: Order[];
  currentUser: UserProfile;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onCreateOrder: (order: Order) => void;
  onUpdateUser: (user: UserProfile) => void;
}

export const AndroidSimulator: React.FC<AndroidSimulatorProps> = ({
  products,
  orders,
  currentUser,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onCreateOrder,
  onUpdateUser
}) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([
    { product: products[0], quantity: 1 }
  ]);
  const [favorites, setFavorites] = useState<string[]>([products[0]?.id || '', products[4]?.id || '']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`تمت إضافة "${product.name.slice(0, 20)}..." للسلة بنجاح! 🛒`);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    navigateTo('cart');
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast('تمت الإزالة من المفضلة');
        return prev.filter(id => id !== product.id);
      } else {
        showToast('تمت الإضافة إلى المفضلة ❤️');
        return [...prev, product.id];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('تم حذف المنتج من السلة');
  };

  const navigateTo = (screen: ScreenType) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const openProductDetail = (prod: Product) => {
    setSelectedProduct(prod);
    navigateTo('product_detail');
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    navigateTo('products');
  };

  const handleOrderSuccess = (order: Order) => {
    onCreateOrder(order);
    setCart([]);
    setConfirmedOrder(order);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Bottom navigation visibility condition
  const showBottomNav = ['home', 'categories', 'products', 'cart', 'orders', 'profile'].includes(currentScreen);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 min-h-[calc(100vh-140px)]">
      {/* Smartphone Device Mockup */}
      <div className="relative w-full max-w-[400px] h-[780px] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-slate-700/80 flex flex-col overflow-hidden">
        
        {/* Device Notch & Camera */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center gap-2 border border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
        </div>

        {/* Status Bar */}
        <div className="relative z-30 pt-1 pb-1.5 px-6 flex items-center justify-between text-[11px] font-mono text-slate-300 select-none bg-slate-900/80 backdrop-blur border-b border-slate-800/60">
          <span className="font-bold">12:45</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400">5G</span>
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px]">98%</span>
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Top App Bar (Toolbar) */}
        {showBottomNav && (
          <div className="relative z-20 px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                TK
              </div>
              <div>
                <h1 className="text-xs font-black text-white leading-none">تكنوستور</h1>
                <p className="text-[9px] text-blue-400 font-medium">TechnoStore App</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {currentUser.isAdmin && (
                <button
                  onClick={() => navigateTo('admin')}
                  className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition cursor-pointer"
                  title="لوحة الإدارة"
                >
                  <Shield className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => navigateTo('cart')}
                className="relative p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Screen Viewport */}
        <div className="relative flex-1 bg-slate-900 overflow-y-auto scrollbar-none">
          {currentScreen === 'splash' && (
            <SplashScreen onFinish={() => setCurrentScreen('home')} />
          )}

          {currentScreen === 'login' && (
            <LoginScreen
              onLoginSuccess={(u) => {
                onUpdateUser(u);
                setCurrentScreen('home');
                showToast(`أهلاً بك مجدداً يا ${u.name}`);
              }}
              onNavigateToRegister={() => setCurrentScreen('register')}
              onSkip={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'register' && (
            <RegisterScreen
              onRegisterSuccess={(u) => {
                onUpdateUser(u);
                setCurrentScreen('home');
                showToast(`تم إنشاء حسابك بنجاح يا ${u.name}! 🎉`);
              }}
              onNavigateToLogin={() => setCurrentScreen('login')}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              products={products}
              onSelectProduct={openProductDetail}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
              onSelectCategory={handleSelectCategory}
              onSearchClick={() => navigateTo('products')}
            />
          )}

          {currentScreen === 'categories' && (
            <CategoriesScreen onSelectCategory={handleSelectCategory} />
          )}

          {currentScreen === 'products' && (
            <ProductsScreen
              products={products}
              initialCategoryId={selectedCategoryId}
              onSelectProduct={openProductDetail}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          )}

          {currentScreen === 'product_detail' && selectedProduct && (
            <ProductDetailScreen
              product={selectedProduct}
              allProducts={products}
              onBack={() => navigateTo(previousScreen)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(selectedProduct.id)}
              onSelectRelated={openProductDetail}
            />
          )}

          {currentScreen === 'cart' && (
            <CartScreen
              cart={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onProceedToCheckout={() => navigateTo('checkout')}
              onStartShopping={() => navigateTo('home')}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutScreen
              cart={cart}
              currentUser={currentUser}
              onBack={() => navigateTo('cart')}
              onOrderSuccess={handleOrderSuccess}
            />
          )}

          {currentScreen === 'orders' && (
            <OrdersScreen orders={orders} />
          )}

          {currentScreen === 'favorites' && (
            <FavoritesScreen
              favorites={favorites}
              allProducts={products}
              onSelectProduct={openProductDetail}
              onRemoveFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              onExploreProducts={() => navigateTo('home')}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              user={currentUser}
              onUpdateUser={onUpdateUser}
              onNavigateToOrders={() => navigateTo('orders')}
              onNavigateToFavorites={() => navigateTo('favorites')}
              onOpenAdmin={() => navigateTo('admin')}
              onLogout={() => navigateTo('login')}
            />
          )}

          {currentScreen === 'admin' && (
            <AdminScreen
              products={products}
              orders={orders}
              onAddProduct={onAddProduct}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              onUpdateOrderStatus={onUpdateOrderStatus}
              onBack={() => navigateTo('home')}
            />
          )}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 z-50 bg-slate-800/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl border border-blue-500/40 shadow-2xl text-center animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Confirmed Order Dialog Modal */}
        {confirmedOrder && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 w-full text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500/30">
                <Package className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-white">تم تأكيد الطلب بنجاح! 🎉</h3>
                <p className="text-xs text-blue-400 font-mono font-bold">
                  رقم الشحنة: {confirmedOrder.orderNumber}
                </p>
                <p className="text-[11px] text-slate-400">
                  الإجمالي: {confirmedOrder.total.toLocaleString('ar-SA')} ر.س • طريقة الدفع: {confirmedOrder.paymentMethod === 'cod' ? 'عند الاستلام' : 'بطاقة إلكترونية'}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    navigateTo('orders');
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  متابعة وتتبع الطلب
                </button>
                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    navigateTo('home');
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  العودة للرئيسية
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar (Android Material 3) */}
        {showBottomNav && (
          <div className="relative z-30 bg-slate-950/95 backdrop-blur border-t border-slate-800/80 px-2 py-2 flex items-center justify-around select-none">
            <button
              onClick={() => navigateTo('home')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition cursor-pointer ${
                currentScreen === 'home' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentScreen === 'home' ? 'bg-blue-600/20' : ''}`}>
                <Home className="w-4 h-4" />
              </div>
              <span>الرئيسية</span>
            </button>

            <button
              onClick={() => navigateTo('categories')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition cursor-pointer ${
                currentScreen === 'categories' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentScreen === 'categories' ? 'bg-blue-600/20' : ''}`}>
                <Grid className="w-4 h-4" />
              </div>
              <span>الأقسام</span>
            </button>

            <button
              onClick={() => navigateTo('cart')}
              className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold transition cursor-pointer ${
                currentScreen === 'cart' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentScreen === 'cart' ? 'bg-blue-600/20' : ''}`}>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span>السلة</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 right-2 bg-blue-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('orders')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition cursor-pointer ${
                currentScreen === 'orders' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentScreen === 'orders' ? 'bg-blue-600/20' : ''}`}>
                <Package className="w-4 h-4" />
              </div>
              <span>طلباتي</span>
            </button>

            <button
              onClick={() => navigateTo('profile')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition cursor-pointer ${
                currentScreen === 'profile' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${currentScreen === 'profile' ? 'bg-blue-600/20' : ''}`}>
                <User className="w-4 h-4" />
              </div>
              <span>حسابي</span>
            </button>
          </div>
        )}

        {/* Android Hardware 3-Button Navigation Bar */}
        <div className="relative z-30 h-6 bg-slate-950 flex items-center justify-around px-12 border-t border-slate-900 select-none">
          <button
            onClick={() => {
              if (currentScreen !== 'home') navigateTo(previousScreen);
            }}
            className="text-slate-500 hover:text-white p-1 cursor-pointer"
            title="رجوع"
          >
            <Triangle className="w-3 h-3 -rotate-90 fill-current" />
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="text-slate-500 hover:text-white p-1 cursor-pointer"
            title="الرئيسية"
          >
            <Circle className="w-3 h-3 fill-current" />
          </button>
          <button
            onClick={() => navigateTo('orders')}
            className="text-slate-500 hover:text-white p-1 cursor-pointer"
            title="التطبيقات الحديثة"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        </div>

      </div>
    </div>
  );
};

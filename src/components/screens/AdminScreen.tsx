import React, { useState } from 'react';
import { Product, Order, OrderStatus, CategoryId } from '../../types';
import { CATEGORIES } from '../../data/mockData';
import { 
  Shield, Plus, Trash2, Edit2, Package, Users, DollarSign, 
  TrendingUp, Check, X, ChevronRight, Image as ImageIcon, 
  Layers, ArrowLeft, RefreshCw 
} from 'lucide-react';

interface AdminScreenProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onBack: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders'>('stats');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>('phones');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const activeOrdersCount = orders.filter(o => ['pending', 'processing', 'shipped', 'in_transit'].includes(o.status)).length;

  const handleOpenAdd = () => {
    setName('');
    setCategoryId('phones');
    setPrice('');
    setOldPrice('');
    setStock('10');
    setImageUrl('https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700&auto=format&fit=crop&q=80');
    setDescription('');
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setName(prod.name);
    setCategoryId(prod.categoryId);
    setPrice(prod.price.toString());
    setOldPrice(prod.oldPrice ? prod.oldPrice.toString() : '');
    setStock(prod.stock.toString());
    setImageUrl(prod.image);
    setDescription(prod.description);
    setEditingProduct(prod);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const prNum = parseFloat(price);
    const oldPrNum = oldPrice ? parseFloat(oldPrice) : 0;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name,
        categoryId,
        price: prNum,
        oldPrice: oldPrNum,
        discountPercentage: oldPrNum > prNum ? Math.round(((oldPrNum - prNum) / oldPrNum) * 100) : undefined,
        stock: parseInt(stock) || 1,
        image: imageUrl || editingProduct.image,
        description: description || editingProduct.description,
      };
      onUpdateProduct(updated);
    } else {
      const newP: Product = {
        id: 'prod-' + Date.now(),
        name,
        nameEn: name,
        categoryId,
        price: prNum,
        oldPrice: oldPrNum,
        discountPercentage: oldPrNum > prNum ? Math.round(((oldPrNum - prNum) / oldPrNum) * 100) : undefined,
        rating: 5.0,
        reviewsCount: 1,
        image: imageUrl || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700&auto=format&fit=crop&q=80',
        gallery: [imageUrl || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700&auto=format&fit=crop&q=80'],
        description: description || 'منتج إلكتروني عالي الجودة مع ضمان سنتين.',
        specifications: {
          'الضمان': 'سنتان الوكيل المعتمد',
          'الحالة': 'جديد بالكرتون'
        },
        stock: parseInt(stock) || 10,
        isNewArrival: true,
      };
      onAddProduct(newP);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 pb-20 overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white">لوحة تحكم الإدارة (Admin)</span>
        </div>

        <button
          onClick={handleOpenAdd}
          className="p-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition cursor-pointer flex items-center gap-1 text-[11px] font-bold px-2.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إضافة منتج</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="p-4 pb-0">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'stats' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            الإحصائيات والمبيعات
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'products' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            إدارة المنتجات ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'orders' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            طلبات الشراء ({orders.length})
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* STATS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-1">
                <div className="p-2 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-slate-400">إجمالي المبيعات</p>
                <p className="text-base font-black text-white font-mono">{totalRevenue.toLocaleString('ar-SA')} ر.س</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-1">
                <div className="p-2 w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-slate-400">طلبات نشطة للتجهيز</p>
                <p className="text-base font-black text-white font-mono">{activeOrdersCount} طلب</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-1">
                <div className="p-2 w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-slate-400">الطلبات المسلّمة</p>
                <p className="text-base font-black text-white font-mono">{completedOrders} طلب</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-1">
                <div className="p-2 w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-slate-400">إجمالي المنتجات</p>
                <p className="text-base font-black text-white font-mono">{products.length} صنف</p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 space-y-2">
              <h3 className="text-xs font-bold text-white">إجراءات سريعة</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleOpenAdd}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة منتج جديد</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>تحديث حالة الطلبات</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-3">
            {products.map(prod => (
              <div
                key={prod.id}
                className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3 flex items-center justify-between gap-3"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-900 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={prod.image} alt="" className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="text-blue-400 font-bold">{prod.price.toLocaleString('ar-SA')} ر.س</span>
                    <span>•</span>
                    <span>المخزون: {prod.stock}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white transition cursor-pointer"
                    title="تعديل"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(prod.id)}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-black text-white font-mono">{order.orderNumber}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{order.customerName} - {order.phoneNumber}</p>
                    <p className="text-[10px] text-slate-500">{order.city} - {order.address}</p>
                  </div>
                  <span className="text-xs font-black text-blue-400 font-mono">
                    {order.total.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>

                {/* Status Changer */}
                <div className="pt-2 border-t border-slate-700/70 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">تغيير حالة الطلب:</span>
                  <select
                    value={order.status}
                    onChange={e => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="processing">قيد التجهيز</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="in_transit">في الطريق</option>
                    <option value="delivered">تم التسليم</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">
                {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج إلكتروني جديد'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-2.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">اسم المنتج *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: سماعات سوني WH-1000XM5"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">القسم</label>
                  <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value as CategoryId)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">المخزون المتوفر</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">السعر الحالي (ر.س) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="مثال: 1299"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">السعر القديم (إن وجد)</label>
                  <input
                    type="number"
                    value={oldPrice}
                    onChange={e => setOldPrice(e.target.value)}
                    placeholder="مثال: 1499"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">رابط صورة المنتج (URL)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white direction-ltr text-right"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">الوصف والمواصفات</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="أدخل وصف تفصيلي للمنتج ومواصفاته..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition cursor-pointer"
                >
                  {editingProduct ? 'حفظ التعديل' : 'إضافة المنتج إلى المتجر'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';

interface OrdersScreenProps {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ orders }) => {
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'قيد الانتظار', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30', step: 1 };
      case 'processing':
        return { label: 'قيد التجهيز في المستودع', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30', step: 2 };
      case 'shipped':
        return { label: 'تم الشحن مع مندوب التوصيل', color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30', step: 3 };
      case 'in_transit':
        return { label: 'الشحنة في الطريق إليك', color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', step: 4 };
      case 'delivered':
        return { label: 'تم التسليم بنجاح', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', step: 5 };
      case 'cancelled':
        return { label: 'تم إلغاء الطلب', color: 'bg-rose-500/15 text-rose-400 border-rose-500/30', step: 0 };
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filterTab === 'active') return ['pending', 'processing', 'shipped', 'in_transit'].includes(order.status);
    if (filterTab === 'completed') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-400" />
            سجل طلباتي
          </h2>
          <p className="text-xs text-slate-400">متابعة حالة شحن وتوصيل الأجهزة</p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-lg">
          {orders.length} طلبات إجمالاً
        </span>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
        <button
          onClick={() => setFilterTab('all')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
            filterTab === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          الكل ({orders.length})
        </button>
        <button
          onClick={() => setFilterTab('active')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
            filterTab === 'active' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          الطلبات الحالية
        </button>
        <button
          onClick={() => setFilterTab('completed')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
            filterTab === 'completed' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          المكتملة والسابقة
        </button>
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-700/60 p-6 space-y-2">
          <Package className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-xs font-bold text-white">لا توجد طلبات في هذا القسم حالياً</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 space-y-3 shadow-sm hover:border-slate-600 transition"
              >
                {/* Top order info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white font-mono">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.items.length} منتجات</span>
                    </div>
                  </div>

                  <span className="text-sm font-black text-blue-400 font-mono">
                    {order.total.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>

                {/* Progress bar for status tracking */}
                {order.status !== 'cancelled' && (
                  <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-medium text-slate-400">
                      <span>تأكيد الطلب</span>
                      <span>التجهيز</span>
                      <span>الشحن</span>
                      <span>التسليم</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (statusInfo.step / 5) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Items preview */}
                <div className="flex gap-2 overflow-x-auto py-1">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700/70 shrink-0 p-1 flex items-center justify-center relative"
                    >
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Expand Toggle for details */}
                <button
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="w-full pt-1 text-slate-400 hover:text-white text-[11px] font-medium flex items-center justify-center gap-1 border-t border-slate-700/60 cursor-pointer"
                >
                  <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض تفاصيل العنوان والمنتجات'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">{order.customerName} ({order.phoneNumber})</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{order.city} - {order.address}</p>
                        {order.notes && <p className="text-[10px] text-slate-500 mt-0.5">ملاحظات: {order.notes}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-300 line-clamp-1">{it.product.name} × {it.quantity}</span>
                          <span className="text-white font-mono shrink-0">{(it.product.price * it.quantity).toLocaleString('ar-SA')} ر.س</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

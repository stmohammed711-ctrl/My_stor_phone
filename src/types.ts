export type CategoryId = 
  | 'phones' 
  | 'laptops' 
  | 'audio' 
  | 'smartwatches' 
  | 'tvs' 
  | 'gaming' 
  | 'chargers' 
  | 'accessories';

export interface Category {
  id: CategoryId;
  name: string;
  nameEn: string;
  icon: string;
  itemCount: number;
  image: string;
  color: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  categoryId: CategoryId;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  specifications: Record<string, string>;
  stock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus = 
  | 'pending'       // قيد الانتظار
  | 'processing'    // قيد التجهيز
  | 'shipped'       // تم الشحن
  | 'in_transit'    // في الطريق
  | 'delivered'     // تم التسليم
  | 'cancelled';    // ملغي

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'card';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  address: string;
  isAdmin: boolean;
}

export interface AndroidCodeFile {
  path: string;
  name: string;
  type: 'java' | 'xml' | 'gradle' | 'json' | 'properties';
  category: 'manifest' | 'gradle' | 'model' | 'repository' | 'adapter' | 'activity' | 'fragment' | 'layout' | 'values';
  description: string;
  content: string;
}

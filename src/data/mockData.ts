import { Category, Product, Order, UserProfile } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'phones',
    name: 'الهواتف الذكية',
    nameEn: 'Smartphones',
    icon: 'Smartphone',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'laptops',
    name: 'أجهزة اللابتوب',
    nameEn: 'Laptops',
    icon: 'Laptop',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80',
    color: 'from-purple-500 to-indigo-700'
  },
  {
    id: 'audio',
    name: 'السماعات والصوتيات',
    nameEn: 'Headphones & Audio',
    icon: 'Headphones',
    itemCount: 32,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-500 to-rose-600'
  },
  {
    id: 'smartwatches',
    name: 'الساعات الذكية',
    nameEn: 'Smartwatches',
    icon: 'Watch',
    itemCount: 15,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'tvs',
    name: 'الشاشات والتلفزيونات',
    nameEn: 'Displays & TVs',
    icon: 'Tv',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=80',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'gaming',
    name: 'أجهزة ومنصات الألعاب',
    nameEn: 'Gaming Consoles',
    icon: 'Gamepad2',
    itemCount: 19,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=80',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'chargers',
    name: 'الشواحن والبطاريات',
    nameEn: 'Chargers & Power',
    icon: 'BatteryCharging',
    itemCount: 28,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'accessories',
    name: 'الإكسسوارات والملحقات',
    nameEn: 'Accessories',
    icon: 'Cpu',
    itemCount: 45,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80',
    color: 'from-slate-600 to-slate-800'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'آيفون 15 برو ماكس (256 جيجابايت) - تيتانيوم طبيعي',
    nameEn: 'iPhone 15 Pro Max 256GB - Natural Titanium',
    categoryId: 'phones',
    price: 4999,
    oldPrice: 5499,
    discountPercentage: 9,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'يتميز هاتف iPhone 15 Pro Max بتصميم متين وخفيف الوزن من التيتانيوم المستخدم في مجال صناعة الطائرات، مع شريحة A17 Pro الجبارة لأداء فائق في الألعاب وتعدد المهام، ونظام كاميرات احترافي بدقة 48 ميجابكسل مع تقريب بصري 5x.',
    specifications: {
      'المعالج': 'شريحة A17 Pro سداسية النوى',
      'الشاشة': 'Super Retina XDR OLED بحجم 6.7 إنش مع ProMotion 120Hz',
      'التخزين': '256 جيجابايت',
      'البطارية': 'تدوم حتى 29 ساعة تشغيل فيديو',
      'نظام التشغيل': 'iOS 17'
    },
    stock: 14,
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'سامسونج جالاكسي S24 ألترا (512 جيجابايت) - تيتانيوم رمادي',
    nameEn: 'Samsung Galaxy S24 Ultra 512GB - Titanium Gray',
    categoryId: 'phones',
    price: 4699,
    oldPrice: 5299,
    discountPercentage: 11,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'عصر جديد من الذكاء الاصطناعي مع Galaxy AI. هيكل متين من التيتانيوم، قلم S-Pen مدمج فائق الدقة، وكاميرا جبارة بدقة 200 ميجابكسل تمنحك صوراً مذهلة ليلاً ونهاراً.',
    specifications: {
      'المعالج': 'Snapdragon 8 Gen 3 for Galaxy',
      'الشاشة': 'Dynamic AMOLED 2X قياس 6.8 إنش QHD+ بتردد 120Hz',
      'التخزين': '512 جيجابايت مع 12 جيجابايت RAM',
      'الكاميرا': 'رباعية 200MP + 50MP + 12MP + 10MP',
      'البطارية': '5000 مللي أمبير مع شحن سريع 45W'
    },
    stock: 9,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'prod-3',
    name: 'ماك بوك برو 16 إنش (M3 Pro - 18GB RAM - 512GB SSD)',
    nameEn: 'MacBook Pro 16" M3 Pro 18GB 512GB - Space Black',
    categoryId: 'laptops',
    price: 9999,
    oldPrice: 10799,
    discountPercentage: 7,
    rating: 5.0,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'الحاسوب المحمول الأكثر تطوراً للمحترفين. يقدم معالج M3 Pro سرعة استثنائية مع كفاءة طاقة لا مثيل لها وتدوم البطارية حتى 22 ساعة مع شاشة Liquid Retina XDR الخلابة.',
    specifications: {
      'المعالج': 'Apple M3 Pro (12-core CPU, 18-core GPU)',
      'الذاكرة': '18 جيجابايت موحدة',
      'سعة التخزين': '512 جيجابايت SSD فائق السرعة',
      'الشاشة': 'Liquid Retina XDR قياس 16.2 إنش بدقة 3456x2234',
      'المنافذ': '3 منافذ Thunderbolt 4، منفذ HDMI، قارئ بطاقات SDXC'
    },
    stock: 5,
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'سماعات سوني اللاسلكية WH-1000XM5 مع عزل الضجيج الرائد',
    nameEn: 'Sony WH-1000XM5 Noise Cancelling Headphones - Black',
    categoryId: 'audio',
    price: 1349,
    oldPrice: 1599,
    discountPercentage: 15,
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'قمة هندسة الصوت مع أفضل تقنية لإلغاء الضجيج النشط في العالم مدعومة بمعالجين وميكروفونات متعددة. تدوم البطارية حتى 30 ساعة مع صوت عالي الدقة بدون أسلاك.',
    specifications: {
      'نوع الاتصال': 'Bluetooth 5.2 مع دعم LDAC و AAC',
      'عزل الضجيج': 'معالج إلغاء الضوضاء HD QN1 مخصص',
      'عمر البطارية': 'حتى 30 ساعة (مع ANC) أو 40 ساعة بدون',
      'الشحن السريع': '3 دقائق شحن تمنح 3 ساعات تشغيل'
    },
    stock: 22,
    isBestSeller: true
  },
  {
    id: 'prod-5',
    name: 'ساعة آبل الترا 2 (Apple Watch Ultra 2) مع حزام تريل رمادي',
    nameEn: 'Apple Watch Ultra 2 GPS + Cellular 49mm Titanium',
    categoryId: 'smartwatches',
    price: 3299,
    oldPrice: 3499,
    discountPercentage: 5,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'الساعة الرياضية الأكثر صلابة وقدرة على الإطلاق. هيكل من التيتانيوم المقاوم للتآكل بمقاس 49 مم، شاشة فائقة السطوع تصل حتى 3000 شمعة، ونظام GPS ثنائي التردد عالي الدقة.',
    specifications: {
      'الهيكل': 'تيتانيوم فضائي 49 مم مع واجهة كريستال ياقوتي',
      'مقاومة الماء': 'حتى 100 متر ومناسبة للغوص الترفيهي حتى 40 متر',
      'البطارية': 'حتى 36 ساعة استخدام عادي أو 72 ساعة بنمط الطاقة المنخفضة',
      'المستشعرات': 'مقياس نبضات القلب، تخطيط القلب ECG، أكسجين الدم، مقياس الحرارة'
    },
    stock: 8,
    isNewArrival: true
  },
  {
    id: 'prod-6',
    name: 'جهاز بلايستيشن 5 سليم نسخة الأقراص (PS5 Slim 1TB)',
    nameEn: 'PlayStation 5 Slim Disc Edition 1TB Console',
    categoryId: 'gaming',
    price: 2199,
    oldPrice: 2399,
    discountPercentage: 8,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'استمتع بألعاب الجيل الجديد بتصميم أنحف وأخف وزناً مع سعة تخزين 1 تيرابايت SSD فائق السرعة، ومحرك أقراص Ultra HD Blu-ray مدمج، مع يد تحكم DualSense اللاسلكية ذات ردود الفعل اللمسية.',
    specifications: {
      'التخزين': '1 تيرابايت SSD داخلي فائق السرعة',
      'دقة العرض': 'دعم حتى 4K بتردد 120Hz وإمكانية 8K مع تتبع الأشعة',
      'الصوت': 'تقنية الصوت ثلاثي الأبعاد Tempest 3D AudioTech',
      'الملحقات': 'يد تحكم DualSense اللاسلكية + كيبل HDMI عالي السرعة'
    },
    stock: 12,
    isBestSeller: true
  },
  {
    id: 'prod-7',
    name: 'شاشة سامسونج أوديسي أوليد G9 المنحنية 49 إنش للألعاب 240Hz',
    nameEn: 'Samsung Odyssey OLED G9 49" Curved Gaming Monitor',
    categoryId: 'tvs',
    price: 5499,
    oldPrice: 6299,
    discountPercentage: 12,
    rating: 4.7,
    reviewsCount: 43,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'شاشة ألعاب ثورية منحنية بنصف قطر 1800R وبدقة Dual QHD فائقة الاتساع. لوحة OLED تمنحك سواداً حقيقياً مع زمن استجابة خارق 0.03ms ومعدل تحديث 240Hz لتجربة لا تضاهى.',
    specifications: {
      'المقاس والإنحناء': '49 إنش، انحناء 1800R، نسبة أبعاد 32:9',
      'الدقة ومعدل التحديث': 'Dual QHD (5120 x 1440) @ 240Hz',
      'زمن الاستجابة': '0.03 ميلي ثانية (GtG)',
      'المنافذ': 'HDMI 2.1، Micro HDMI 2.1، DisplayPort 1.4، USB Hub'
    },
    stock: 4,
    isFeatured: true
  },
  {
    id: 'prod-8',
    name: 'شاحن أنكر نانو II بقدرة 65 واط بتقنية GaN لجميع الأجهزة',
    nameEn: 'Anker Nano II 65W GaN Fast Wall Charger',
    categoryId: 'chargers',
    price: 189,
    oldPrice: 229,
    discountPercentage: 17,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80'
    ],
    description: 'شاحن جداري فائق الصغر والأناقة بتقنية GaN II المتطورة. قادر على شحن اللابتوبات والهواتف والأجهزة اللوحية بأعلى سرعة وأمان مع حماية من الحرارة الزائدة.',
    specifications: {
      'القدرة الإجمالية': '65 واط بتقنية PowerIQ 3.0',
      'المنافذ': 'منفذ USB-C مع دعم PPS لشحن سامسونج فائق السرعة',
      'التوافق': 'MacBook، iPhone، iPad، Galaxy، Dell XPS، والمزيد',
      'الأبعاد': 'أصغر بنسبة 58% مقارنة بشواحن اللابتوب العادية'
    },
    stock: 50,
    isBestSeller: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'TK-84920',
    date: '2026-09-27',
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[7], quantity: 2 }
    ],
    subtotal: 5377,
    shippingFee: 0,
    discount: 100,
    total: 5277,
    status: 'in_transit',
    customerName: 'محمد حسين العمري',
    phoneNumber: '+966 50 123 4567',
    city: 'الرياض',
    address: 'حي النرجس، شارع أنس بن مالك، مبنى 42',
    notes: 'يرجى الاتصال قبل الوصول بنصف ساعة',
    paymentMethod: 'card'
  },
  {
    id: 'ord-102',
    orderNumber: 'TK-79114',
    date: '2026-09-25',
    items: [
      { product: PRODUCTS[3], quantity: 1 }
    ],
    subtotal: 1349,
    shippingFee: 25,
    discount: 0,
    total: 1374,
    status: 'delivered',
    customerName: 'محمد حسين العمري',
    phoneNumber: '+966 50 123 4567',
    city: 'الرياض',
    address: 'حي النرجس، شارع أنس بن مالك، مبنى 42',
    paymentMethod: 'cod'
  },
  {
    id: 'ord-103',
    orderNumber: 'TK-68302',
    date: '2026-09-20',
    items: [
      { product: PRODUCTS[5], quantity: 1 }
    ],
    subtotal: 2199,
    shippingFee: 0,
    discount: 50,
    total: 2149,
    status: 'delivered',
    customerName: 'محمد حسين العمري',
    phoneNumber: '+966 50 123 4567',
    city: 'جدة',
    address: 'حي الشاطئ، طريق الكورنيش',
    paymentMethod: 'card'
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'usr-901',
  name: 'محمد حسين العمري',
  email: 'almmrymhmdhsyn39@gmail.com',
  phone: '+966 50 123 4567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  city: 'الرياض',
  address: 'حي النرجس، شارع أنس بن مالك، فيلا 42',
  isAdmin: true
};

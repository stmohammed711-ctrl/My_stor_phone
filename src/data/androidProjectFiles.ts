import { AndroidCodeFile } from '../types';

export const ANDROID_PROJECT_FILES: AndroidCodeFile[] = [
  // 0. settings.gradle
  {
    path: 'settings.gradle',
    name: 'settings.gradle',
    type: 'gradle',
    category: 'gradle',
    description: 'إعدادات المستودعات وإدارة الـ Plugins المتوافقة مع Android Studio و AndroidIDE',
    content: `pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
        maven { url 'https://plugins.gradle.org/m2/' }
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}

rootProject.name = "TechnoStore"
include ':app'`
  },

  // 0.1 gradle.properties
  {
    path: 'gradle.properties',
    name: 'gradle.properties',
    type: 'properties',
    category: 'gradle',
    description: 'خصائص الذاكرة، إلغاء build scan التلقائي، وتفعيل AndroidX و IPv4 في الهواتف',
    content: `org.gradle.jvmargs=-Xmx1536m -Dfile.encoding=UTF-8 -Djava.net.preferIPv4Stack=true
android.useAndroidX=true
android.nonTransitiveRClass=true
# منع طلب plugin build scan التلقائي في أجهزة أندرويد
systemProp.gradle.scan.disabled=true
org.gradle.warning.mode=none`
  },

  // 0.2 gradle-wrapper.properties
  {
    path: 'gradle/wrapper/gradle-wrapper.properties',
    name: 'gradle-wrapper.properties',
    type: 'properties',
    category: 'gradle',
    description: 'تحديد إصدار Gradle 7.4.2 المتوافق مع AndroidIDE وهواتف أندرويد',
    content: `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-7.4.2-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists`
  },

  // 1. Project Root build.gradle
  {
    path: 'build.gradle',
    name: 'build.gradle (Project)',
    type: 'gradle',
    category: 'gradle',
    description: 'ملف إعدادات Gradle على مستوى المشروع الرئيسي المتوافق مع Gradle 7.4.2 و 8.x',
    content: `buildscript {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
        maven { url 'https://plugins.gradle.org/m2/' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.4.2'
        classpath 'com.google.gms:google-services:4.4.1'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}`
  },

  // 2.0 app/google-services.json
  {
    path: 'app/google-services.json',
    name: 'google-services.json',
    type: 'json',
    category: 'gradle',
    description: 'ملف تكوين Firebase الافتراضي (يمكنك استبداله بملف مشروعك الحقيقي)',
    content: `{
  "project_info": {
    "project_number": "1234567890",
    "project_id": "technostore-app",
    "storage_bucket": "technostore-app.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:1234567890:android:abcdef123456",
        "android_client_info": {
          "package_name": "com.example.electronicsstore"
        }
      },
      "oauth_client": [],
      "api_key": [
        {
          "current_key": "AIzaSyDummyKeyForTechnoStoreApp12345"
        }
      ],
      "services": {
        "analytics_service": {
          "status": 1
        }
      }
    }
  ],
  "configuration_version": "1"
}`
  },

  // 2. App Module build.gradle
  {
    path: 'app/build.gradle',
    name: 'build.gradle (:app)',
    type: 'gradle',
    category: 'gradle',
    description: 'مكتبات المشروع (Material Design 3, Firebase, Glide, ViewModel, LiveData)',
    content: `plugins {
    id 'com.android.application'
    id 'com.google.gms.google-services'
}

android {
    namespace 'com.example.electronicsstore'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.electronicsstore"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    buildFeatures {
        viewBinding true
    }
}

dependencies {
    // AndroidX & UI
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'

    // Architecture Components (Lifecycle & ViewModel)
    implementation 'androidx.lifecycle:lifecycle-viewmodel:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata:2.7.0'

    // Firebase BoM & Services
    implementation platform('com.google.firebase:firebase-bom:32.7.4')
    implementation 'com.google.firebase:firebase-auth'
    implementation 'com.google.firebase:firebase-firestore'
    implementation 'com.google.firebase:firebase-storage'

    // Glide for image loading
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.16.0'

    // CircleImageView
    implementation 'de.hdodenhof:circleimageview:3.1.0'

    // Testing
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}`
  },

  // 3. AndroidManifest.xml
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    type: 'xml',
    category: 'manifest',
    description: 'بيان التطبيق (الصلاحيات، والأنشطة، ودعم RTL واللغة العربية)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- الصلاحيات المطلوبة -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />

    <application
        android:name=".ElectronicsApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ElectronicsStore"
        tools:targetApi="34">

        <!-- شاشة البداية Splash -->
        <activity
            android:name=".ui.SplashActivity"
            android:exported="true"
            android:theme="@style/Theme.ElectronicsStore.Splash">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- شاشات تسجيل الدخول والإنشاء -->
        <activity android:name=".ui.LoginActivity" android:exported="false" />
        <activity android:name=".ui.RegisterActivity" android:exported="false" />

        <!-- الشاشة الرئيسية -->
        <activity
            android:name=".ui.MainActivity"
            android:exported="false"
            android:windowSoftInputMode="adjustPan" />

        <!-- شاشة تفاصيل المنتج -->
        <activity android:name=".ui.ProductDetailActivity" android:exported="false" />

        <!-- شاشة إتمام الطلب -->
        <activity android:name=".ui.CheckoutActivity" android:exported="false" />

        <!-- شاشة الإدارة -->
        <activity android:name=".ui.AdminActivity" android:exported="false" />

    </application>

</manifest>`
  },

  // 4. strings.xml
  {
    path: 'app/src/main/res/values/strings.xml',
    name: 'strings.xml',
    type: 'xml',
    category: 'values',
    description: 'النصوص والترجمات العربية الكاملة للواجهات',
    content: `<resources>
    <string name="app_name">تكنوستور للإلكترونيات</string>
    <string name="tagline">عالم التقنية بين يديك بأفضل الأسعار</string>

    <!-- الأزرار العامة -->
    <string name="login">تسجيل الدخول</string>
    <string name="register">إنشاء حساب جديد</string>
    <string name="forgot_password">نسيت كلمة المرور؟</string>
    <string name="add_to_cart">أضف إلى السلة</string>
    <string name="buy_now">شراء الآن</string>
    <string name="checkout">إتمام الطلب</string>
    <string name="confirm_order">تأكيد الطلب</string>
    <string name="save">حفظ</string>
    <string name="cancel">إلغاء</string>
    <string name="retry">إعادة المحاولة</string>
    <string name="apply">تطبيق</string>

    <!-- القوائم والتنقل -->
    <string name="nav_home">الرئيسية</string>
    <string name="nav_categories">الأقسام</string>
    <string name="nav_cart">السلة</string>
    <string name="nav_orders">طلباتي</string>
    <string name="nav_profile">حسابي</string>
    <string name="nav_favorites">المفضلة</string>
    <string name="nav_admin">لوحة الإدارة</string>

    <!-- الحقول -->
    <string name="hint_search">ابحث عن هاتف، لابتوب، سماعة...</string>
    <string name="hint_name">الاسم الكامل</string>
    <string name="hint_email">البريد الإلكتروني</string>
    <string name="hint_phone">رقم الهاتف</string>
    <string name="hint_password">كلمة المرور</string>
    <string name="hint_confirm_password">تأكيد كلمة المرور</string>
    <string name="hint_city">المدينة</string>
    <string name="hint_address">العنوان بالتفصيل (الحي، الشارع، المبنى)</string>
    <string name="hint_notes">ملاحظات التوصيل (اختياري)</string>

    <!-- العناوين الرئيسية -->
    <string name="best_sellers">الأكثر مبيعاً</string>
    <string name="new_arrivals">وصل حديثاً</string>
    <string name="special_offers">عروض وخصومات حصرية</string>
    <string name="specifications">المواصفات التقنية</string>
    <string name="reviews">تقييمات العملاء</string>
    <string name="related_products">منتجات مشابهة قد تعجبك</string>
    <string name="cart_summary">ملخص السلة</string>
    <string name="currency">ر.س</string>

    <!-- حالات الطلب -->
    <string name="status_pending">قيد الانتظار</string>
    <string name="status_processing">قيد التجهيز</string>
    <string name="status_shipped">تم الشحن</string>
    <string name="status_in_transit">في الطريق</string>
    <string name="status_delivered">تم التسليم</string>
    <string name="status_cancelled">ملغي</string>

    <!-- طرق الدفع -->
    <string name="payment_cod">الدفع نقدًا عند الاستلام (COD)</string>
    <string name="payment_card">بطاقة مدى / فيزا / ماستركارد</string>
</resources>`
  },

  // 5. colors.xml
  {
    path: 'app/src/main/res/values/colors.xml',
    name: 'colors.xml',
    type: 'xml',
    category: 'values',
    description: 'ألوان التطبيق المستوحاة من متاجر التقنية العصرية (Material 3)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary">#2563EB</color>
    <color name="primary_dark">#1D4ED8</color>
    <color name="primary_light">#DBEAFE</color>
    <color name="accent">#F59E0B</color>

    <color name="background_light">#F8FAFC</color>
    <color name="surface_light">#FFFFFF</color>
    <color name="card_stroke">#E2E8F0</color>

    <color name="text_primary">#0F172A</color>
    <color name="text_secondary">#64748B</color>
    <color name="text_muted">#94A3B8</color>

    <color name="success">#10B981</color>
    <color name="danger">#EF4444</color>
    <color name="warning">#F59E0B</color>
    <color name="info">#0EA5E9</color>

    <color name="status_pending">#FEF3C7</color>
    <color name="status_pending_text">#D97706</color>
    <color name="status_processing">#E0E7FF</color>
    <color name="status_processing_text">#4F46E5</color>
    <color name="status_shipped">#E0F2FE</color>
    <color name="status_shipped_text">#0284C7</color>
    <color name="status_delivered">#DCFCE7</color>
    <color name="status_delivered_text">#16A34A</color>
    <color name="status_cancelled">#FEE2E2</color>
    <color name="status_cancelled_text">#DC2626</color>
</resources>`
  },

  // 6. themes.xml
  {
    path: 'app/src/main/res/values/themes.xml',
    name: 'themes.xml',
    type: 'xml',
    category: 'values',
    description: 'ثيم Material Design 3 الداعم للغة العربية والوضع الليلي',
    content: `<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="Theme.ElectronicsStore" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="colorPrimary">@color/primary</item>
        <item name="colorOnPrimary">@android:color/white</item>
        <item name="colorSecondary">@color/accent</item>
        <item name="android:statusBarColor">@color/primary_dark</item>
        <item name="android:windowLightStatusBar">false</item>
        <item name="android:windowBackground">@color/background_light</item>
    </style>

    <style name="Theme.ElectronicsStore.Splash" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="android:windowBackground">@color/primary_dark</item>
        <item name="android:statusBarColor">@color/primary_dark</item>
        <item name="android:navigationBarColor">@color/primary_dark</item>
    </style>
</resources>`
  },

  // 7. Product.java Model
  {
    path: 'app/src/main/java/com/example/electronicsstore/model/Product.java',
    name: 'Product.java',
    type: 'java',
    category: 'model',
    description: 'نموذج بيانات المنتج متوافق بالكامل مع Firebase Firestore',
    content: `package com.example.electronicsstore.model;

import com.google.firebase.firestore.Exclude;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * نموذج بيانات المنتج لمتجر الإلكترونيات
 */
public class Product implements Serializable {
    private String id;
    private String name;
    private String nameEn;
    private String categoryId;
    private double price;
    private double oldPrice;
    private int discountPercentage;
    private double rating;
    private int reviewsCount;
    private String image;
    private List<String> gallery = new ArrayList<>();
    private String description;
    private Map<String, String> specifications = new HashMap<>();
    private int stock;
    private boolean isNewArrival;
    private boolean isBestSeller;
    private boolean isFeatured;

    // مُنشئ افتراضي مطلوب لـ Firebase Firestore
    public Product() {
    }

    public Product(String id, String name, String categoryId, double price, double oldPrice,
                   double rating, String image, String description, int stock) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.price = price;
        this.oldPrice = oldPrice;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.stock = stock;
        if (oldPrice > price) {
            this.discountPercentage = (int) Math.round(((oldPrice - price) / oldPrice) * 100);
        }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getOldPrice() { return oldPrice; }
    public void setOldPrice(double oldPrice) { this.oldPrice = oldPrice; }

    public int getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(int discountPercentage) { this.discountPercentage = discountPercentage; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<String> getGallery() { return gallery; }
    public void setGallery(List<String> gallery) { this.gallery = gallery; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Map<String, String> getSpecifications() { return specifications; }
    public void setSpecifications(Map<String, String> specifications) { this.specifications = specifications; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public boolean isNewArrival() { return isNewArrival; }
    public void setNewArrival(boolean newArrival) { isNewArrival = newArrival; }

    public boolean isBestSeller() { return isBestSeller; }
    public void setBestSeller(boolean bestSeller) { isBestSeller = bestSeller; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    @Exclude
    public boolean hasDiscount() {
        return oldPrice > price;
    }
}`
  },

  // 8. Category.java Model
  {
    path: 'app/src/main/java/com/example/electronicsstore/model/Category.java',
    name: 'Category.java',
    type: 'java',
    category: 'model',
    description: 'نموذج بيانات الأقسام (هواتف، لابتوبات، شاشات، ألعاب...)',
    content: `package com.example.electronicsstore.model;

import java.io.Serializable;

public class Category implements Serializable {
    private String id;
    private String name;
    private String nameEn;
    private String icon;
    private int itemCount;
    private String image;

    public Category() {}

    public Category(String id, String name, String icon, int itemCount, String image) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.itemCount = itemCount;
        this.image = image;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getItemCount() { return itemCount; }
    public void setItemCount(int itemCount) { this.itemCount = itemCount; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}`
  },

  // 9. CartItem.java Model
  {
    path: 'app/src/main/java/com/example/electronicsstore/model/CartItem.java',
    name: 'CartItem.java',
    type: 'java',
    category: 'model',
    description: 'نموذج عنصر سلة الشراء مع حساب الإجمالي والكمية',
    content: `package com.example.electronicsstore.model;

import java.io.Serializable;

public class CartItem implements Serializable {
    private Product product;
    private int quantity;
    private String selectedColor;

    public CartItem() {}

    public CartItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getSelectedColor() { return selectedColor; }
    public void setSelectedColor(String selectedColor) { this.selectedColor = selectedColor; }

    public double getTotalPrice() {
        return product != null ? product.getPrice() * quantity : 0.0;
    }
}`
  },

  // 10. Order.java Model
  {
    path: 'app/src/main/java/com/example/electronicsstore/model/Order.java',
    name: 'Order.java',
    type: 'java',
    category: 'model',
    description: 'نموذج الطلب مع التفاصيل، العنوان، وحالات التوصيل المتعددة',
    content: `package com.example.electronicsstore.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Order implements Serializable {
    private String id;
    private String orderNumber;
    private String userId;
    private String date;
    private List<CartItem> items = new ArrayList<>();
    private double subtotal;
    private double shippingFee;
    private double discount;
    private double total;
    private String status; // pending, processing, shipped, in_transit, delivered, cancelled
    private String customerName;
    private String phoneNumber;
    private String city;
    private String address;
    private String notes;
    private String paymentMethod; // cod, card

    public Order() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public double getShippingFee() { return shippingFee; }
    public void setShippingFee(double shippingFee) { this.shippingFee = shippingFee; }

    public double getDiscount() { return discount; }
    public void setDiscount(double discount) { this.discount = discount; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}`
  },

  // 11. User.java Model
  {
    path: 'app/src/main/java/com/example/electronicsstore/model/User.java',
    name: 'User.java',
    type: 'java',
    category: 'model',
    description: 'نموذج المستخدم مع دعم الصلاحيات وحالة المسؤول isAdmin',
    content: `package com.example.electronicsstore.model;

import java.io.Serializable;

public class User implements Serializable {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String avatar;
    private String city;
    private String address;
    private boolean isAdmin;

    public User() {}

    public User(String id, String name, String email, String phone, boolean isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.isAdmin = isAdmin;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public boolean isAdmin() { return isAdmin; }
    public void setAdmin(boolean admin) { isAdmin = admin; }
}`
  },

  // 12. FirebaseRepository.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/repository/FirebaseRepository.java',
    name: 'FirebaseRepository.java',
    type: 'java',
    category: 'repository',
    description: 'المستودع المركزي لعمليات Firestore و Firebase Auth كاملة',
    content: `package com.example.electronicsstore.repository;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.electronicsstore.model.Category;
import com.example.electronicsstore.model.Order;
import com.example.electronicsstore.model.Product;
import com.example.electronicsstore.model.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;

import java.util.ArrayList;
import java.util.List;

/**
 * مستودع البيانات المركزي - يتولى جلب وتحديث البيانات مع Firebase Firestore و Authentication
 */
public class FirebaseRepository {
    private static FirebaseRepository instance;
    private final FirebaseFirestore db;
    private final FirebaseAuth auth;

    public interface DataCallback<T> {
        void onSuccess(T data);
        void onError(String message);
    }

    private FirebaseRepository() {
        db = FirebaseFirestore.getInstance();
        auth = FirebaseAuth.getInstance();
    }

    public static synchronized FirebaseRepository getInstance() {
        if (instance == null) {
            instance = new FirebaseRepository();
        }
        return instance;
    }

    // جلب جميع المنتجات
    public LiveData<List<Product>> getProducts() {
        MutableLiveData<List<Product>> data = new MutableLiveData<>();
        db.collection("products")
                .get()
                .addOnSuccessListener(snapshots -> {
                    List<Product> list = new ArrayList<>();
                    for (QueryDocumentSnapshot doc : snapshots) {
                        Product p = doc.toObject(Product.class);
                        p.setId(doc.getId());
                        list.add(p);
                    }
                    data.setValue(list);
                })
                .addOnFailureListener(e -> data.setValue(new ArrayList<>()));
        return data;
    }

    // جلب المنتجات حسب القسم
    public LiveData<List<Product>> getProductsByCategory(String categoryId) {
        MutableLiveData<List<Product>> data = new MutableLiveData<>();
        db.collection("products")
                .whereEqualTo("categoryId", categoryId)
                .get()
                .addOnSuccessListener(snapshots -> {
                    List<Product> list = new ArrayList<>();
                    for (QueryDocumentSnapshot doc : snapshots) {
                        Product p = doc.toObject(Product.class);
                        p.setId(doc.getId());
                        list.add(p);
                    }
                    data.setValue(list);
                })
                .addOnFailureListener(e -> data.setValue(new ArrayList<>()));
        return data;
    }

    // جلب الأقسام
    public LiveData<List<Category>> getCategories() {
        MutableLiveData<List<Category>> data = new MutableLiveData<>();
        db.collection("categories")
                .get()
                .addOnSuccessListener(snapshots -> {
                    List<Category> list = new ArrayList<>();
                    for (QueryDocumentSnapshot doc : snapshots) {
                        Category c = doc.toObject(Category.class);
                        c.setId(doc.getId());
                        list.add(c);
                    }
                    data.setValue(list);
                })
                .addOnFailureListener(e -> data.setValue(new ArrayList<>()));
        return data;
    }

    // إنشاء طلب جديد
    public void createOrder(Order order, DataCallback<String> callback) {
        db.collection("orders")
                .add(order)
                .addOnSuccessListener(docRef -> {
                    order.setId(docRef.getId());
                    callback.onSuccess(docRef.getId());
                })
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    // جلب طلبات المستخدم
    public LiveData<List<Order>> getUserOrders(String userId) {
        MutableLiveData<List<Order>> data = new MutableLiveData<>();
        db.collection("orders")
                .whereEqualTo("userId", userId)
                .orderBy("date", Query.Direction.DESCENDING)
                .get()
                .addOnSuccessListener(snapshots -> {
                    List<Order> list = new ArrayList<>();
                    for (QueryDocumentSnapshot doc : snapshots) {
                        Order o = doc.toObject(Order.class);
                        o.setId(doc.getId());
                        list.add(o);
                    }
                    data.setValue(list);
                })
                .addOnFailureListener(e -> data.setValue(new ArrayList<>()));
        return data;
    }

    // إضافة أو تعديل منتج (للمشرفين)
    public void saveProduct(Product product, DataCallback<Void> callback) {
        if (product.getId() == null || product.getId().isEmpty()) {
            db.collection("products").add(product)
                    .addOnSuccessListener(doc -> callback.onSuccess(null))
                    .addOnFailureListener(e -> callback.onError(e.getMessage()));
        } else {
            db.collection("products").document(product.getId()).set(product)
                    .addOnSuccessListener(doc -> callback.onSuccess(null))
                    .addOnFailureListener(e -> callback.onError(e.getMessage()));
        }
    }

    // حذف منتج
    public void deleteProduct(String productId, DataCallback<Void> callback) {
        db.collection("products").document(productId).delete()
                .addOnSuccessListener(doc -> callback.onSuccess(null))
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    // تحديث حالة الطلب
    public void updateOrderStatus(String orderId, String newStatus, DataCallback<Void> callback) {
        db.collection("orders").document(orderId)
                .update("status", newStatus)
                .addOnSuccessListener(aVoid -> callback.onSuccess(null))
                .addOnFailureListener(e -> callback.onError(e.getMessage()));
    }

    public FirebaseUser getCurrentUser() {
        return auth.getCurrentUser();
    }
}`
  },

  // 13. ProductAdapter.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/adapter/ProductAdapter.java',
    name: 'ProductAdapter.java',
    type: 'java',
    category: 'adapter',
    description: 'محول RecyclerView للمنتجات مع التحميل بالصور Glide والخصومات والأزرار',
    content: `package com.example.electronicsstore.adapter;

import android.content.Context;
import android.graphics.Paint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.example.electronicsstore.R;
import com.example.electronicsstore.model.Product;
import com.google.android.material.button.MaterialButton;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ProductViewHolder> {

    public interface OnProductClickListener {
        void onProductClick(Product product);
        void onAddToCartClick(Product product);
        void onFavoriteToggleClick(Product product);
    }

    private final Context context;
    private List<Product> productList = new ArrayList<>();
    private final OnProductClickListener listener;

    public ProductAdapter(Context context, OnProductClickListener listener) {
        this.context = context;
        this.listener = listener;
    }

    public void setProducts(List<Product> products) {
        this.productList = products;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ProductViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_product, parent, false);
        return new ProductViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) {
        Product product = productList.get(position);
        holder.bind(product, listener);
    }

    @Override
    public int getItemCount() {
        return productList != null ? productList.size() : 0;
    }

    class ProductViewHolder extends RecyclerView.ViewHolder {
        ImageView imgProduct, imgFavorite;
        TextView tvTitle, tvPrice, tvOldPrice, tvDiscountBadge, tvRating;
        MaterialButton btnAddToCart;

        public ProductViewHolder(@NonNull View itemView) {
            super(itemView);
            imgProduct = itemView.findViewById(R.id.imgProduct);
            imgFavorite = itemView.findViewById(R.id.imgFavorite);
            tvTitle = itemView.findViewById(R.id.tvTitle);
            tvPrice = itemView.findViewById(R.id.tvPrice);
            tvOldPrice = itemView.findViewById(R.id.tvOldPrice);
            tvDiscountBadge = itemView.findViewById(R.id.tvDiscountBadge);
            tvRating = itemView.findViewById(R.id.tvRating);
            btnAddToCart = itemView.findViewById(R.id.btnAddToCart);
        }

        void bind(Product product, OnProductClickListener listener) {
            tvTitle.setText(product.getName());
            tvPrice.setText(String.format(Locale.getDefault(), "%.0f ر.س", product.getPrice()));
            tvRating.setText(String.format(Locale.getDefault(), "★ %.1f", product.getRating()));

            if (product.hasDiscount()) {
                tvOldPrice.setVisibility(View.VISIBLE);
                tvOldPrice.setText(String.format(Locale.getDefault(), "%.0f ر.س", product.getOldPrice()));
                tvOldPrice.setPaintFlags(tvOldPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);

                tvDiscountBadge.setVisibility(View.VISIBLE);
                tvDiscountBadge.setText(String.format(Locale.getDefault(), "خصم %d%%", product.getDiscountPercentage()));
            } else {
                tvOldPrice.setVisibility(View.GONE);
                tvDiscountBadge.setVisibility(View.GONE);
            }

            Glide.with(context)
                    .load(product.getImage())
                    .placeholder(R.drawable.placeholder_electronics)
                    .into(imgProduct);

            itemView.setOnClickListener(v -> {
                if (listener != null) listener.onProductClick(product);
            });

            btnAddToCart.setOnClickListener(v -> {
                if (listener != null) listener.onAddToCartClick(product);
            });

            imgFavorite.setOnClickListener(v -> {
                if (listener != null) listener.onFavoriteToggleClick(product);
            });
        }
    }
}`
  },

  // 14. MainActivity.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/ui/MainActivity.java',
    name: 'MainActivity.java',
    type: 'java',
    category: 'activity',
    description: 'النشاط الرئيسي مع BottomNavigationView والتبديل بين الشاشات',
    content: `package com.example.electronicsstore.ui;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import com.example.electronicsstore.R;
import com.example.electronicsstore.databinding.ActivityMainBinding;
import com.example.electronicsstore.ui.fragments.CartFragment;
import com.example.electronicsstore.ui.fragments.CategoriesFragment;
import com.example.electronicsstore.ui.fragments.HomeFragment;
import com.example.electronicsstore.ui.fragments.OrdersFragment;
import com.example.electronicsstore.ui.fragments.ProfileFragment;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // تحميل الشاشة الرئيسية الافتراضية
        if (savedInstanceState == null) {
            loadFragment(new HomeFragment());
        }

        setupBottomNavigation();
    }

    private void setupBottomNavigation() {
        binding.bottomNavigation.setOnItemSelectedListener(item -> {
            Fragment selectedFragment = null;
            int itemId = item.getItemId();

            if (itemId == R.id.nav_home) {
                selectedFragment = new HomeFragment();
            } else if (itemId == R.id.nav_categories) {
                selectedFragment = new CategoriesFragment();
            } else if (itemId == R.id.nav_cart) {
                selectedFragment = new CartFragment();
            } else if (itemId == R.id.nav_orders) {
                selectedFragment = new OrdersFragment();
            } else if (itemId == R.id.nav_profile) {
                selectedFragment = new ProfileFragment();
            }

            if (selectedFragment != null) {
                loadFragment(selectedFragment);
                return true;
            }
            return false;
        });
    }

    public void loadFragment(Fragment fragment) {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragmentContainer, fragment)
                .commit();
    }

    public void openAdminPanel() {
        Intent intent = new Intent(this, AdminActivity.class);
        startActivity(intent);
    }
}`
  },

  // 15. ProductDetailActivity.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/ui/ProductDetailActivity.java',
    name: 'ProductDetailActivity.java',
    type: 'java',
    category: 'activity',
    description: 'شاشة تفاصيل المنتج والمواصفات والكمية وزر أضف للسلة',
    content: `package com.example.electronicsstore.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.electronicsstore.R;
import com.example.electronicsstore.databinding.ActivityProductDetailBinding;
import com.example.electronicsstore.model.Product;
import com.example.electronicsstore.utils.CartManager;
import java.util.Locale;

public class ProductDetailActivity extends AppCompatActivity {
    private ActivityProductDetailBinding binding;
    private Product product;
    private int selectedQuantity = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityProductDetailBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        product = (Product) getIntent().getSerializableExtra("extra_product");
        if (product == null) {
            finish();
            return;
        }

        setupViews();
        setupListeners();
    }

    private void setupViews() {
        binding.toolbar.setNavigationOnClickListener(v -> finish());
        binding.tvProductName.setText(product.getName());
        binding.tvProductPrice.setText(String.format(Locale.getDefault(), "%.0f ر.س", product.getPrice()));
        binding.tvDescription.setText(product.getDescription());
        binding.tvStock.setText(String.format(Locale.getDefault(), "الكمية المتوفرة: %d قطع", product.getStock()));
        binding.tvRating.setText(String.format(Locale.getDefault(), "★ %.1f (%d تقييم)", product.getRating(), product.getReviewsCount()));

        Glide.with(this)
                .load(product.getImage())
                .placeholder(R.drawable.placeholder_electronics)
                .into(binding.imgProduct);

        updateQuantityDisplay();
    }

    private void setupListeners() {
        binding.btnIncrease.setOnClickListener(v -> {
            if (selectedQuantity < product.getStock()) {
                selectedQuantity++;
                updateQuantityDisplay();
            } else {
                Toast.makeText(this, "وصلت للحد الأقصى المتوفر", Toast.LENGTH_SHORT).show();
            }
        });

        binding.btnDecrease.setOnClickListener(v -> {
            if (selectedQuantity > 1) {
                selectedQuantity--;
                updateQuantityDisplay();
            }
        });

        binding.btnAddToCart.setOnClickListener(v -> {
            CartManager.getInstance().addItem(product, selectedQuantity);
            Toast.makeText(this, "تمت إضافة " + selectedQuantity + " إلى السلة بنجاح", Toast.LENGTH_SHORT).show();
        });

        binding.btnBuyNow.setOnClickListener(v -> {
            CartManager.getInstance().addItem(product, selectedQuantity);
            Intent intent = new Intent(this, CheckoutActivity.class);
            startActivity(intent);
        });
    }

    private void updateQuantityDisplay() {
        binding.tvQuantity.setText(String.valueOf(selectedQuantity));
    }
}`
  },

  // 16. CheckoutActivity.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/ui/CheckoutActivity.java',
    name: 'CheckoutActivity.java',
    type: 'java',
    category: 'activity',
    description: 'شاشة إتمام الطلب والتحقق من العنوان وطريقة الدفع وإنشاء الطلب',
    content: `package com.example.electronicsstore.ui;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.example.electronicsstore.R;
import com.example.electronicsstore.databinding.ActivityCheckoutBinding;
import com.example.electronicsstore.model.Order;
import com.example.electronicsstore.repository.FirebaseRepository;
import com.example.electronicsstore.utils.CartManager;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CheckoutActivity extends AppCompatActivity {
    private ActivityCheckoutBinding binding;
    private CartManager cartManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCheckoutBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        cartManager = CartManager.getInstance();
        binding.toolbar.setNavigationOnClickListener(v -> finish());

        setupOrderSummary();
        binding.btnConfirmOrder.setOnClickListener(v -> validateAndPlaceOrder());
    }

    private void setupOrderSummary() {
        double subtotal = cartManager.calculateSubtotal();
        double shipping = subtotal > 500 ? 0.0 : 25.0;
        double total = subtotal + shipping;

        binding.tvSubtotal.setText(String.format(Locale.getDefault(), "%.0f ر.س", subtotal));
        binding.tvShipping.setText(shipping == 0 ? "مجاني" : String.format(Locale.getDefault(), "%.0f ر.س", shipping));
        binding.tvTotal.setText(String.format(Locale.getDefault(), "%.0f ر.س", total));
    }

    private void validateAndPlaceOrder() {
        String name = binding.etName.getText().toString().trim();
        String phone = binding.etPhone.getText().toString().trim();
        String city = binding.etCity.getText().toString().trim();
        String address = binding.etAddress.getText().toString().trim();
        String notes = binding.etNotes.getText().toString().trim();

        if (TextUtils.isEmpty(name)) {
            binding.etName.setError("الرجاء إدخال الاسم");
            return;
        }
        if (TextUtils.isEmpty(phone)) {
            binding.etPhone.setError("الرجاء إدخال رقم الهاتف");
            return;
        }
        if (TextUtils.isEmpty(city)) {
            binding.etCity.setError("الرجاء إدخال المدينة");
            return;
        }
        if (TextUtils.isEmpty(address)) {
            binding.etAddress.setError("الرجاء إدخال العنوان بالتفصيل");
            return;
        }

        binding.progressBar.setVisibility(View.VISIBLE);
        binding.btnConfirmOrder.setEnabled(false);

        Order order = new Order();
        order.setOrderNumber("TK-" + ((int)(Math.random() * 90000) + 10000));
        order.setDate(new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date()));
        order.setCustomerName(name);
        order.setPhoneNumber(phone);
        order.setCity(city);
        order.setAddress(address);
        order.setNotes(notes);
        order.setStatus("pending");
        order.setPaymentMethod(binding.rbCod.isChecked() ? "cod" : "card");
        order.setItems(cartManager.getCartItems());
        order.setSubtotal(cartManager.calculateSubtotal());
        order.setShippingFee(order.getSubtotal() > 500 ? 0 : 25);
        order.setTotal(order.getSubtotal() + order.getShippingFee());

        FirebaseRepository.getInstance().createOrder(order, new FirebaseRepository.DataCallback<String>() {
            @Override
            public void onSuccess(String orderId) {
                binding.progressBar.setVisibility(View.GONE);
                cartManager.clear();
                showSuccessDialog(order.getOrderNumber());
            }

            @Override
            public void onError(String message) {
                binding.progressBar.setVisibility(View.GONE);
                binding.btnConfirmOrder.setEnabled(true);
                Toast.makeText(CheckoutActivity.this, "خطأ أثناء تسجيل الطلب: " + message, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void showSuccessDialog(String orderNumber) {
        new AlertDialog.Builder(this)
                .setTitle("تم تأكيد الطلب بنجاح! 🎉")
                .setMessage("شكراً لتسوقك معنا في تكنوستور.\\nرقم طلبك هو: " + orderNumber + "\\nسنقوم بالتواصل معك لتأكيد موعد التوصيل.")
                .setPositiveButton("العودة للرئيسية", (dialog, which) -> finish())
                .setCancelable(false)
                .show();
    }
}`
  },

  // 17. AdminActivity.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/ui/AdminActivity.java',
    name: 'AdminActivity.java',
    type: 'java',
    category: 'activity',
    description: 'لوحة تحكم المشرف (إضافة/تعديل/حذف المنتجات، متابعة الطلبات، الإحصائيات)',
    content: `package com.example.electronicsstore.ui;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.example.electronicsstore.databinding.ActivityAdminBinding;
import com.example.electronicsstore.model.Product;
import com.example.electronicsstore.repository.FirebaseRepository;
import java.util.UUID;

public class AdminActivity extends AppCompatActivity {
    private ActivityAdminBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAdminBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.toolbar.setNavigationOnClickListener(v -> finish());
        setupCategorySpinner();

        binding.btnSaveProduct.setOnClickListener(v -> saveNewProduct());
    }

    private void setupCategorySpinner() {
        String[] categories = {"الهواتف الذكية", "أجهزة اللابتوب", "السماعات والصوتيات", "الساعات الذكية", "الشاشات", "أجهزة الألعاب"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, categories);
        binding.spinnerCategories.setAdapter(adapter);
    }

    private void saveNewProduct() {
        String name = binding.etName.getText().toString().trim();
        String priceStr = binding.etPrice.getText().toString().trim();
        String oldPriceStr = binding.etOldPrice.getText().toString().trim();
        String stockStr = binding.etStock.getText().toString().trim();
        String desc = binding.etDescription.getText().toString().trim();
        String imageUrl = binding.etImageUrl.getText().toString().trim();

        if (TextUtils.isEmpty(name) || TextUtils.isEmpty(priceStr)) {
            Toast.makeText(this, "يرجى تعبئة الحقول الأساسية", Toast.LENGTH_SHORT).show();
            return;
        }

        Product product = new Product();
        product.setId(UUID.randomUUID().toString());
        product.setName(name);
        product.setPrice(Double.parseDouble(priceStr));
        product.setOldPrice(oldPriceStr.isEmpty() ? 0 : Double.parseDouble(oldPriceStr));
        product.setStock(stockStr.isEmpty() ? 10 : Integer.parseInt(stockStr));
        product.setDescription(desc);
        product.setImage(imageUrl.isEmpty() ? "https://images.unsplash.com/photo-1592750475338-74b7b21085ab" : imageUrl);
        product.setRating(5.0);

        binding.progressBar.setVisibility(View.VISIBLE);
        FirebaseRepository.getInstance().saveProduct(product, new FirebaseRepository.DataCallback<Void>() {
            @Override
            public void onSuccess(Void data) {
                binding.progressBar.setVisibility(View.GONE);
                Toast.makeText(AdminActivity.this, "تم إضافة المنتج بنجاح!", Toast.LENGTH_SHORT).show();
                finish();
            }

            @Override
            public void onError(String message) {
                binding.progressBar.setVisibility(View.GONE);
                Toast.makeText(AdminActivity.this, "فشل الإضافة: " + message, Toast.LENGTH_LONG).show();
            }
        });
    }
}`
  },

  // 18. CartManager.java
  {
    path: 'app/src/main/java/com/example/electronicsstore/utils/CartManager.java',
    name: 'CartManager.java',
    type: 'java',
    category: 'model',
    description: 'مدير سلة التسوق بنمط Singleton لحساب الأسعار وإدارة الكميات',
    content: `package com.example.electronicsstore.utils;

import com.example.electronicsstore.model.CartItem;
import com.example.electronicsstore.model.Product;
import java.util.ArrayList;
import java.util.List;

public class CartManager {
    private static CartManager instance;
    private final List<CartItem> cartItems = new ArrayList<>();

    private CartManager() {}

    public static synchronized CartManager getInstance() {
        if (instance == null) {
            instance = new CartManager();
        }
        return instance;
    }

    public void addItem(Product product, int quantity) {
        for (CartItem item : cartItems) {
            if (item.getProduct().getId().equals(product.getId())) {
                item.setQuantity(item.getQuantity() + quantity);
                return;
            }
        }
        cartItems.add(new CartItem(product, quantity));
    }

    public void updateQuantity(Product product, int newQuantity) {
        if (newQuantity <= 0) {
            removeItem(product);
            return;
        }
        for (CartItem item : cartItems) {
            if (item.getProduct().getId().equals(product.getId())) {
                item.setQuantity(newQuantity);
                return;
            }
        }
    }

    public void removeItem(Product product) {
        cartItems.removeIf(item -> item.getProduct().getId().equals(product.getId()));
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public double calculateSubtotal() {
        double sum = 0;
        for (CartItem item : cartItems) {
            sum += item.getTotalPrice();
        }
        return sum;
    }

    public int getTotalCount() {
        int count = 0;
        for (CartItem item : cartItems) {
            count += item.getQuantity();
        }
        return count;
    }

    public void clear() {
        cartItems.clear();
    }
}`
  },

  // 19. XML Layout item_product.xml
  {
    path: 'app/src/main/res/layout/item_product.xml',
    name: 'item_product.xml',
    type: 'xml',
    category: 'layout',
    description: 'واجهة تصميم كرت المنتج في شبكة العرض مع شارة الخصم والمفضلة',
    content: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="6dp"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp"
    app:strokeColor="@color/card_stroke"
    app:strokeWidth="1dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="10dp">

        <!-- صورة المنتج -->
        <ImageView
            android:id="@+id/imgProduct"
            android:layout_width="0dp"
            android:layout_height="140dp"
            android:scaleType="centerCrop"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            tools:srcCompat="@tools:sample/avatars" />

        <!-- زر المفضلة -->
        <ImageView
            android:id="@+id/imgFavorite"
            android:layout_width="32dp"
            android:layout_height="32dp"
            android:src="@drawable/ic_favorite_border"
            android:background="?attr/selectableItemBackgroundBorderless"
            android:padding="4dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintEnd_toEndOf="parent" />

        <!-- شارة الخصم -->
        <TextView
            android:id="@+id/tvDiscountBadge"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="@drawable/bg_discount_badge"
            android:textColor="@android:color/white"
            android:textSize="11sp"
            android:textStyle="bold"
            android:paddingHorizontal="6dp"
            android:paddingVertical="2dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            tools:text="خصم 15%" />

        <!-- التقييم -->
        <TextView
            android:id="@+id/tvRating"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:textColor="@color/accent"
            android:textSize="12sp"
            android:textStyle="bold"
            app:layout_constraintTop_toBottomOf="@id/imgProduct"
            app:layout_constraintStart_toStartOf="parent"
            tools:text="★ 4.9" />

        <!-- اسم المنتج -->
        <TextView
            android:id="@+id/tvTitle"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:ellipsize="end"
            android:maxLines="2"
            android:textColor="@color/text_primary"
            android:textSize="14sp"
            android:textStyle="bold"
            app:layout_constraintTop_toBottomOf="@id/tvRating"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            tools:text="آيفون 15 برو ماكس 256 جيجابايت" />

        <!-- السعر الحالي -->
        <TextView
            android:id="@+id/tvPrice"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:textColor="@color/primary"
            android:textSize="15sp"
            android:textStyle="bold"
            app:layout_constraintTop_toBottomOf="@id/tvTitle"
            app:layout_constraintStart_toStartOf="parent"
            tools:text="4999 ر.س" />

        <!-- السعر القديم المشطوب -->
        <TextView
            android:id="@+id/tvOldPrice"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:textColor="@color/text_muted"
            android:textSize="12sp"
            app:layout_constraintBaseline_toBaselineOf="@id/tvPrice"
            app:layout_constraintStart_toEndOf="@id/tvPrice"
            tools:text="5499 ر.س" />

        <!-- زر إضافة إلى السلة -->
        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnAddToCart"
            android:layout_width="0dp"
            android:layout_height="38dp"
            android:layout_marginTop="8dp"
            android:text="@string/add_to_cart"
            android:textSize="12sp"
            app:cornerRadius="8dp"
            app:icon="@drawable/ic_cart_plus"
            app:iconGravity="textStart"
            app:iconSize="14dp"
            app:layout_constraintTop_toBottomOf="@id/tvPrice"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</com.google.android.material.card.MaterialCardView>`
  },

  // 20. XML Layout activity_main.xml
  {
    path: 'app/src/main/res/layout/activity_main.xml',
    name: 'activity_main.xml',
    type: 'xml',
    category: 'layout',
    description: 'واجهة النشاط الرئيسي مع Bottom Navigation Bar العربي',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/background_light">

    <!-- حاوية الـ Fragments للشاشات الخمس -->
    <FrameLayout
        android:id="@+id/fragmentContainer"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toTopOf="@id/bottomNavigation"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <!-- شريط التنقل السفلي Bottom Navigation -->
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNavigation"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:background="@color/surface_light"
        app:elevation="8dp"
        app:itemIconTint="@color/nav_item_color"
        app:itemTextColor="@color/nav_item_color"
        app:labelVisibilityMode="labeled"
        app:menu="@menu/bottom_nav_menu"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`
  },

  // 21. res/menu/bottom_nav_menu.xml
  {
    path: 'app/src/main/res/menu/bottom_nav_menu.xml',
    name: 'bottom_nav_menu.xml',
    type: 'xml',
    category: 'values',
    description: 'قائمة عناصر شريط التنقل السفلي Bottom Navigation',
    content: `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_home"
        android:icon="@drawable/ic_home"
        android:title="@string/nav_home" />
    <item
        android:id="@+id/nav_categories"
        android:icon="@drawable/ic_categories"
        android:title="@string/nav_categories" />
    <item
        android:id="@+id/nav_cart"
        android:icon="@drawable/ic_cart"
        android:title="@string/nav_cart" />
    <item
        android:id="@+id/nav_orders"
        android:icon="@drawable/ic_orders"
        android:title="@string/nav_orders" />
    <item
        android:id="@+id/nav_profile"
        android:icon="@drawable/ic_profile"
        android:title="@string/nav_profile" />
</menu>`
  },

  // 22. res/color/nav_item_color.xml
  {
    path: 'app/src/main/res/color/nav_item_color.xml',
    name: 'nav_item_color.xml',
    type: 'xml',
    category: 'values',
    description: 'ألوان تحديد الأيقونات لشريط التنقل السفلي',
    content: `<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="@color/primary" android:state_checked="true" />
    <item android:color="@color/text_secondary" />
</selector>`
  },

  // 23. res/drawable/ic_home.xml
  {
    path: 'app/src/main/res/drawable/ic_home.xml',
    name: 'ic_home.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة الشاشة الرئيسية Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF2563EB"
      android:pathData="M10,20v-6h4v6h5v-8h3L12,3 2,12h3v8z"/>
</vector>`
  },

  // 24. res/drawable/ic_categories.xml
  {
    path: 'app/src/main/res/drawable/ic_categories.xml',
    name: 'ic_categories.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة الأقسام Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF2563EB"
      android:pathData="M4,11h5V5H4v6zm0,7h5v-6H4v6zm6,0h5v-6h-5v6zm6,0h5v-6h-5v6zm-6,-7h5V5h-5v6zm6,-6v6h5V5h-5z"/>
</vector>`
  },

  // 25. res/drawable/ic_cart.xml
  {
    path: 'app/src/main/res/drawable/ic_cart.xml',
    name: 'ic_cart.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة سلة الشراء Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF2563EB"
      android:pathData="M7,18c-1.1,0 -1.99,0.9 -1.99,2S5.9,22 7,22s2,-0.9 2,-2 -0.9,-2 -2,-2zm10,0c-1.1,0 -1.99,0.9 -1.99,2s0.89,2 1.99,2 2,-0.9 2,-2 -0.9,-2 -2,-2zm-9.83,-3.25l0.03,-0.12 0.9,-1.63h7.45c0.75,0 1.41,-0.41 1.75,-1.03l3.58,-6.49c0.08,-0.14 0.12,-0.31 0.12,-0.48 0,-0.55 -0.45,-1 -1,-1H5.21l-0.94,-2H1v2h2l3.6,7.59 -1.35,2.44C4.52,15.37 5.48,17 7,17h12v-2H7.42c-0.14,0 -0.25,-0.11 -0.25,-0.25z"/>
</vector>`
  },

  // 26. res/drawable/ic_orders.xml
  {
    path: 'app/src/main/res/drawable/ic_orders.xml',
    name: 'ic_orders.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة الطلبات والشحنات Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF2563EB"
      android:pathData="M20,6h-4V4c0,-1.11 -0.89,-2 -2,-2h-4c-1.11,0 -2,0.89 -2,2v2H4c-1.11,0 -1.99,0.89 -1.99,2L2,19c0,1.11 0.89,2 2,2h16c1.11,0 2,-0.89 2,-2V8c0,-1.11 -0.89,-2 -2,-2zm-6,0h-4V4h4v2z"/>
</vector>`
  },

  // 27. res/drawable/ic_profile.xml
  {
    path: 'app/src/main/res/drawable/ic_profile.xml',
    name: 'ic_profile.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة الحساب الشخصي Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF2563EB"
      android:pathData="M12,12c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4 -4,1.79 -4,4 1.79,4 4,4zm0,2c-2.67,0 -8,1.34 -8,4v2h16v-2c0,-2.66 -5.33,-4 -8,-4z"/>
</vector>`
  },

  // 28. res/drawable/ic_favorite_border.xml
  {
    path: 'app/src/main/res/drawable/ic_favorite_border.xml',
    name: 'ic_favorite_border.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة المفضلة Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF64748B"
      android:pathData="M16.5,3c-1.74,0 -3.41,0.81 -4.5,2.09C10.91,3.81 9.24,3 7.5,3 4.42,3 2,5.42 2,8.5c0,3.78 3.4,6.86 8.55,11.54L12,21.35l1.45,-1.32C18.6,15.36 22,12.28 22,8.5 22,5.42 19.58,3 16.5,3zM12.1,18.55l-0.1,0.1 -0.1,-0.1C7.14,14.24 4,11.39 4,8.5 4,6.5 5.5,5 7.5,5c1.54,0 3.04,0.99 3.57,2.36h1.87C13.46,5.99 14.96,5 16.5,5c2,0 3.5,1.5 3.5,3.5 0,2.89 -3.14,5.74 -7.9,10.05z"/>
</vector>`
  },

  // 29. res/drawable/ic_cart_plus.xml
  {
    path: 'app/src/main/res/drawable/ic_cart_plus.xml',
    name: 'ic_cart_plus.xml',
    type: 'xml',
    category: 'layout',
    description: 'أيقونة إضافة للسلة Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FFFFFFFF"
      android:pathData="M11,9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4,9c-1.1,0 -1.99,0.9 -1.99,2S5.9,22 7,22s2,-0.9 2,-2 -0.9,-2 -2,-2zm10,0c-1.1,0 -1.99,0.9 -1.99,2s0.89,2 1.99,2 2,-0.9 2,-2 -0.9,-2 -2,-2zm-8.9,-5h7.45c0.75,0 1.41,-0.41 1.75,-1.03l3.86,-7.01L19.42,4l-3.87,7H8.53L4.27,2H1v2h2l3.6,7.59 -1.35,2.44C4.52,15.37 5.48,17 7,17h12v-2H7l1.1,-2z"/>
</vector>`
  },

  // 30. res/drawable/bg_discount_badge.xml
  {
    path: 'app/src/main/res/drawable/bg_discount_badge.xml',
    name: 'bg_discount_badge.xml',
    type: 'xml',
    category: 'layout',
    description: 'خلفية شارة الخصم Shape Drawable',
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="@color/danger" />
    <corners android:radius="6dp" />
</shape>`
  },

  // 31. res/drawable/placeholder_electronics.xml
  {
    path: 'app/src/main/res/drawable/placeholder_electronics.xml',
    name: 'placeholder_electronics.xml',
    type: 'xml',
    category: 'layout',
    description: 'صورة مؤقتة للأجهزة Vector Drawable',
    content: `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="120dp"
    android:height="120dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF334155"
      android:pathData="M17,1.01L7,1c-1.1,0 -2,0.9 -2,2v18c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2V3c0,-1.1 -0.9,-1.99 -2,-1.99zM17,19H7V5h10v14z"/>
</vector>`
  }
];

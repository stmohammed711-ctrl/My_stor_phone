import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from '../data/androidProjectFiles';

/**
 * نسخة مخصصة للكمبيوتر (Android Studio على Windows / Mac / Linux)
 * تستخدم إصدار Gradle الحديث (8.2) و Android Gradle Plugin 8.2.2 القياسي
 */
export async function downloadAndroidStudioPCZip() {
  const zip = new JSZip();

  // إضافة جميع الملفات المصدرية
  ANDROID_PROJECT_FILES.forEach(file => {
    // تعديل الإعدادات لتكون بنمط Android Studio الحديث على الكمبيوتر
    if (file.path === 'build.gradle') {
      const pcBuildGradle = `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id 'com.android.application' version '8.2.2' apply false
    id 'com.google.gms.google-services' version '4.4.1' apply false
}

task clean(type: Delete) {
    delete rootProject.buildDir
}`;
      zip.file(file.path, pcBuildGradle);
    } else if (file.path === 'settings.gradle') {
      const pcSettingsGradle = `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "TechnoStore"
include ':app'`;
      zip.file(file.path, pcSettingsGradle);
    } else if (file.path === 'gradle/wrapper/gradle-wrapper.properties') {
      const pcWrapper = `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists`;
      zip.file(file.path, pcWrapper);
    } else if (file.path === 'gradle.properties') {
      const pcProps = `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true`;
      zip.file(file.path, pcProps);
    } else {
      zip.file(file.path, file.content);
    }
  });

  // تعليمات التشغيل لأندرويد ستوديو على الكمبيوتر
  const readmeContent = `# متجر تكنوستور للإلكترونيات (TechnoStore) - نسخة الكمبيوتر (Android Studio PC)

هذه النسخة مجهزة بالكامل للعمل على برامج **Android Studio** الحديثة (Iguana, Jellyfish, Koala, Ladybug, Giraffe, Flamingo) على أجهزة الكمبيوتر (Windows / Mac / Linux).

## 💻 طريقة التشغيل في Android Studio على الكمبيوتر:
1. قم بفك ضغط هذا الملف المضغوط (\`TechnoStore_AndroidStudio_PC.zip\`).
2. افتح برنامج **Android Studio**.
3. في الشاشة الرئيسية اضغط على **Open** (أو من القائمة: **File > Open**).
4. حدد المجلد الذي قمت بفك ضغطه واضغط **OK**.
5. انتظر حتى تكتمل عملية مزامنة **Gradle Sync** التلقائية (تستغرق دقيقة أو دقيقتين في المرة الأولى لتحميل المكتبات).
6. اختر جهاز محاكي (**Android Emulator**) أو قم بتوصيل هاتفك بكابل USB مع تفعيل **USB Debugging**.
7. اضغط على الزر الأخضر للتشغيل (**Run ▶** أو اختصار Shift + F10).

## 📱 التقنيات:
- لغة البرمجة: Java (JDK 17)
- بيئة التشغيل: Android Studio مع Gradle 8.2 & AGP 8.2.2
- واجهات المستخدم: Material Design 3 (XML)
- التوافق: Android 7.0 (API 24) وحتى Android 14+ (API 34)
- قاعدة البيانات: Firebase Firestore & Authentication (ملف google-services.json الافتراضي مُضمن مسبقاً داخل app/).
`;
  zip.file('README_PC.md', readmeContent);

  // Gradle wrapper scripts for Windows and Linux/Mac
  zip.file('gradlew', '#!/usr/bin/env sh\nexec gradle "$@"\n');
  zip.file('gradlew.bat', `@rem Gradle startup script for Windows\r\n@if "%DEBUG%"=="" @echo off\r\nset DIRNAME=%~dp0\r\nif "%DIRNAME%"=="" set DIRNAME=.\r\n"%DIRNAME%gradlew" %*\r\n`);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'TechnoStore_AndroidStudio_PC.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * نسخة الهاتف (AndroidIDE)
 */
export async function downloadAndroidIDEMobileZip() {
  const zip = new JSZip();

  ANDROID_PROJECT_FILES.forEach(file => {
    zip.file(file.path, file.content);
  });

  const readmeContent = `# متجر تكنوستور للإلكترونيات - نسخة تطبيق AndroidIDE على الهاتف
هذه النسخة مجهزة لتعمل مع تطبيق AndroidIDE في هواتف أندرويد (Gradle 7.4.2).
`;
  zip.file('README.md', readmeContent);
  zip.file('gradlew', '#!/usr/bin/env sh\nexec gradle "$@"\n');

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'TechnoStore_AndroidIDE_Mobile.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// دالة التحميل الافتراضية
export async function downloadAndroidProjectZip() {
  return downloadAndroidStudioPCZip();
}

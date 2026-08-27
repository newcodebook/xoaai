<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="hasHomeContent" class="min-h-screen">
    <!-- iframe mode -->
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Compact Home Page -->
  <div
    v-else-if="compactHomeEnabled"
    data-testid="compact-home"
    class="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-dark-950 dark:text-white"
  >
    <header class="border-b border-gray-200 px-4 py-4 sm:px-6 dark:border-dark-800">
      <nav class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <img
            :src="siteLogo || '/logo.svg'"
            alt="Logo"
            class="h-9 w-9 shrink-0 rounded-lg object-contain"
          />
          <span class="min-w-0 truncate text-base font-semibold">{{ siteName }}</span>
        </div>
        <div class="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-2">
          <LocaleSwitcher />
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-dark-400 dark:hover:bg-dark-800"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>
          <router-link
            v-if="showModelPlazaEntry"
            to="/model-plaza"
            class="flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-white"
            :title="t('nav.modelPlaza')"
          >
            <Icon name="grid" size="md" />
            <span class="hidden sm:inline">{{ t('nav.modelPlaza') }}</span>
          </router-link>
          <button
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-dark-400 dark:hover:bg-dark-800"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            @click="toggleTheme"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/login'"
            class="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="flex min-w-0 flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div class="min-w-0 max-w-2xl text-center">
        <img
          :src="siteLogo || '/logo.svg'"
          alt="Logo"
          class="mx-auto mb-6 h-20 w-20 rounded-2xl object-contain"
        />
        <h1 class="[overflow-wrap:anywhere] text-3xl font-bold md:text-4xl">{{ siteName }}</h1>
        <p class="mt-4 whitespace-pre-wrap [overflow-wrap:anywhere] text-base text-gray-600 dark:text-dark-300">{{ siteSubtitle }}</p>
        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="mt-8 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.login') }}
        </router-link>
      </div>
    </main>

    <footer class="min-w-0 border-t border-gray-200 px-4 py-5 text-center text-sm text-gray-500 [overflow-wrap:anywhere] sm:px-6 dark:border-dark-800 dark:text-dark-400">
      &copy; {{ currentYear }} {{ siteName }}
    </footer>
  </div>

  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- Default Landing Page                                       -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <div v-else class="landing" :class="{ 'landing-dark': isDark }">

    <!-- ── Nav ── -->
    <header class="landing-nav" :class="{ scrolled: headerScrolled }">
      <nav class="nav-inner">
        <router-link to="/" class="nav-brand">
          <img :src="siteLogo || '/logo.svg'" alt="" class="nav-logo" />
          <span class="nav-name">{{ siteName }}</span>
        </router-link>

        <!-- Desktop nav links -->
        <div class="nav-links">
          <router-link to="/products" class="nav-link">{{ t('home.nav.products') }}</router-link>
          <router-link to="/pricing" class="nav-link">{{ t('home.nav.pricing') }}</router-link>
          <router-link to="/help" class="nav-link">{{ t('home.nav.help') }}</router-link>
          <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="nav-link">{{ t('home.nav.docs') }}</a>
        </div>

        <!-- Right actions -->
        <div class="nav-actions">
          <LocaleSwitcher />
          <button @click="toggleTheme" class="nav-icon-btn" :title="isDark ? t('home.switchToLight') : t('home.switchToDark')">
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link v-if="!isAuthenticated" to="/login" class="nav-login">
            {{ t('home.login') }}
          </router-link>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/register'"
            class="nav-cta"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.getStarted') }}
          </router-link>
          <!-- Mobile hamburger -->
          <button class="nav-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" :aria-label="t('home.nav.menu')">
            <span class="hamburger-bar" :class="{ open: mobileMenuOpen }"></span>
            <span class="hamburger-bar" :class="{ open: mobileMenuOpen }"></span>
            <span class="hamburger-bar" :class="{ open: mobileMenuOpen }"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile menu -->
      <div class="mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">
        <router-link to="/products" class="mobile-link" @click="mobileMenuOpen = false">{{ t('home.nav.products') }}</router-link>
        <router-link to="/pricing" class="mobile-link" @click="mobileMenuOpen = false">{{ t('home.nav.pricing') }}</router-link>
        <router-link to="/help" class="mobile-link" @click="mobileMenuOpen = false">{{ t('home.nav.help') }}</router-link>
        <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="mobile-link">{{ t('home.nav.docs') }}</a>
        <router-link v-if="showModelPlazaEntry" to="/model-plaza" class="mobile-link" @click="mobileMenuOpen = false">{{ t('nav.modelPlaza') }}</router-link>
        <div class="mobile-menu-divider"></div>
        <router-link v-if="!isAuthenticated" to="/login" class="mobile-link" @click="mobileMenuOpen = false">{{ t('home.login') }}</router-link>
        <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="mobile-cta" @click="mobileMenuOpen = false">
          {{ isAuthenticated ? t('home.dashboard') : t('home.getStarted') }}
        </router-link>
      </div>
    </header>

    <!-- ── § 1  Hero ── -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-heading">
          <span class="hero-heading-gradient">{{ t('home.heroSubtitle') }}</span>
        </h1>
        <p class="hero-desc">{{ t('home.heroDescription') }}</p>
        <div class="hero-actions">
          <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="hero-btn-primary">
            {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
            <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2.5" />
          </router-link>
          <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="hero-btn-secondary">
            {{ t('home.docs') }}
          </a>
        </div>
      </div>
    </section>

    <!-- ── § 2  Provider Strip ── -->
    <section class="strip">
      <div class="strip-inner">
        <span class="strip-label">{{ t('home.providers.title') }}</span>
        <div class="strip-logos">
          <span v-for="p in providerNames" :key="p" class="strip-logo-item">{{ p }}</span>
        </div>
      </div>
    </section>

    <!-- ── § 3  Pain → Solution ── -->
    <section id="features" class="contrast-section sa" data-sa>
      <div class="contrast-inner">
        <!-- Pain side -->
        <div class="contrast-col contrast-pain">
          <h2 class="contrast-heading">{{ t('home.painPoints.title') }}</h2>
          <ul class="contrast-list">
            <li v-for="item in painPointItems" :key="item.key" class="contrast-item pain-item">
              <span class="contrast-icon pain-icon"><Icon :name="item.icon" size="md" /></span>
              <div>
                <strong>{{ t(`home.painPoints.items.${item.key}.title`) }}</strong>
                <p>{{ t(`home.painPoints.items.${item.key}.desc`) }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- Divider -->
        <div class="contrast-divider">
          <Icon name="arrowRight" size="lg" class="contrast-arrow" />
        </div>
        <!-- Solution side -->
        <div class="contrast-col contrast-solution">
          <h2 class="contrast-heading">{{ t('home.solutions.title') }}</h2>
          <ul class="contrast-list">
            <li v-for="f in featureItems" :key="f.key" class="contrast-item solution-item">
              <span class="contrast-icon solution-icon"><Icon :name="f.icon" size="md" /></span>
              <div>
                <strong>{{ t(`home.features.${f.key}`) }}</strong>
                <p>{{ t(`home.features.${f.key}Desc`) }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── § 4  Core Advantages ── -->
    <section class="advantages sa" data-sa>
      <div class="advantages-inner">
        <div v-for="(adv, i) in advantages" :key="adv.key" class="advantage-block">
          <div class="advantage-number">{{ String(i + 1).padStart(2, '0') }}</div>
          <h3 class="advantage-title">{{ t(`home.features.${adv.key}`) }}</h3>
          <p class="advantage-desc">{{ t(`home.features.${adv.key}Desc`) }}</p>
        </div>
      </div>
    </section>

    <!-- ── § 5  Comparison ── -->
    <section id="comparison" class="comparison sa" data-sa>
      <div class="comparison-inner">
        <h2 class="comparison-heading">{{ t('home.comparison.title') }}</h2>
        <div class="comparison-table">
          <div class="comp-row comp-header">
            <div class="comp-cell comp-feature"></div>
            <div class="comp-cell comp-official">{{ t('home.comparison.headers.official') }}</div>
            <div class="comp-cell comp-us">{{ t('home.comparison.headers.us') }}</div>
          </div>
          <div v-for="key in comparisonKeys" :key="key" class="comp-row">
            <div class="comp-cell comp-feature">{{ t(`home.comparison.items.${key}.feature`) }}</div>
            <div class="comp-cell comp-official">{{ t(`home.comparison.items.${key}.official`) }}</div>
            <div class="comp-cell comp-us">
              <Icon name="check" size="sm" class="comp-check" />
              {{ t(`home.comparison.items.${key}.us`) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── § 6  CTA Banner ── -->
    <section class="cta-banner">
      <div class="cta-banner-inner">
        <h2 class="cta-heading">{{ t('home.cta.title') }}</h2>
        <p class="cta-desc">{{ t('home.cta.description') }}</p>
        <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="cta-btn">
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.cta.button') }}
          <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2.5" />
        </router-link>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="landing-footer">
      <div class="footer-main">
        <!-- Brand column -->
        <div class="footer-brand-col">
          <router-link to="/" class="footer-brand">
            <img :src="siteLogo || '/logo.svg'" alt="" class="footer-logo" />
            <span class="footer-name">{{ siteName }}</span>
          </router-link>
          <p class="footer-tagline">{{ t('home.footer.tagline') }}</p>
        </div>

        <!-- Link columns -->
        <div class="footer-columns">
          <div class="footer-col">
            <h4 class="footer-col-title">{{ t('home.footer.product') }}</h4>
            <ul class="footer-col-links">
              <li><router-link to="/products">{{ t('home.footer.aiServices') }}</router-link></li>
              <li><router-link to="/pricing">{{ t('home.footer.pricing') }}</router-link></li>
              <li><router-link to="/key-usage">{{ t('home.footer.apiUsage') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">{{ t('home.footer.support') }}</h4>
            <ul class="footer-col-links">
              <li><router-link to="/help">{{ t('home.footer.quickStart') }}</router-link></li>
              <li v-if="docUrl"><a :href="docUrl" target="_blank" rel="noopener noreferrer">{{ t('home.footer.documentation') }}</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">{{ t('home.footer.legal') }}</h4>
            <ul class="footer-col-links">
              <li><router-link to="/legal/terms-of-service">{{ t('home.footer.termsOfService') }}</router-link></li>
              <li><router-link to="/legal/privacy-policy">{{ t('home.footer.privacyPolicy') }}</router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import { sanitizeUrl } from '@/utils/url'
import { FeatureFlags, isFeatureFlagEnabled } from '@/utils/featureFlags'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

// Pain point items
const painPointItems = [
  { key: 'expensive', icon: 'dollar' as const },
  { key: 'complex', icon: 'key' as const },
  { key: 'unstable', icon: 'bolt' as const },
  { key: 'noControl', icon: 'eyeOff' as const },
]

// Feature items for the solution side
const featureItems = [
  { key: 'unifiedGateway', icon: 'globe' as const },
  { key: 'multiAccount', icon: 'shield' as const },
  { key: 'balanceQuota', icon: 'chart' as const },
]

// Advantages — same features, displayed as numbered blocks
const advantages = [
  { key: 'unifiedGateway' },
  { key: 'multiAccount' },
  { key: 'balanceQuota' },
]

// Comparison table keys
const comparisonKeys = ['pricing', 'models', 'management', 'stability', 'control']

// Provider names for the strip
const providerNames = ['Claude', 'GPT', 'Gemini', 'Antigravity']

// Mobile menu
const mobileMenuOpen = ref(false)

// Header scroll effect
const headerScrolled = ref(false)

// Site settings
const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'XOAAI')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'All AI Services, One Platform')
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const hasHomeContent = computed(() => homeContent.value.trim().length > 0)
const compactHomeEnabled = computed(() => appStore.cachedPublicSettings?.compact_home_enabled === true)
const modelPlazaEnabled = computed(() => isFeatureFlagEnabled(FeatureFlags.modelPlaza))

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

// Theme
const isDark = ref(document.documentElement.classList.contains('dark'))

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const modelPlazaRequiresAuth = computed(
  () => appStore.cachedPublicSettings?.model_plaza_require_auth === true,
)
const showModelPlazaEntry = computed(
  () => modelPlazaEnabled.value && (isAuthenticated.value || !modelPlazaRequiresAuth.value),
)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')

const currentYear = computed(() => new Date().getFullYear())

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

function onScroll() {
  headerScrolled.value = window.scrollY > 40
}

let sectionObserver: IntersectionObserver | null = null

onMounted(() => {
  initTheme()
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sa-visible')
          sectionObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('[data-sa]').forEach((el) => {
    sectionObserver?.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  sectionObserver?.disconnect()
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   Design tokens
   ═══════════════════════════════════════════════ */
.landing {
  --brand: #3875f6;
  --brand-light: #6492f9;
  --brand-dark: #2458d4;
  --mint: #79f4bd;
  --cyan: #39d9e7;
  --text: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
  --surface: #ffffff;
  --surface-alt: #f8fafc;
  --border: #e2e8f0;
  --radius: 12px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--text);
  background: var(--surface);
  min-height: 100vh;
  overflow-x: hidden;
}

.landing-dark {
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --surface: #0f172a;
  --surface-alt: #1e293b;
  --border: #1e293b;
}

/* Scroll-triggered animation */
.sa {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.sa-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════════
   Nav
   ═══════════════════════════════════════════════ */
.landing-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 0 24px;
  transition: background 0.3s, box-shadow 0.3s;
}
.landing-nav.scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
}
.landing-dark .landing-nav.scrolled {
  background: rgba(15, 23, 42, 0.92);
}
.nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 40px;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  flex-shrink: 0;
}
.nav-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: contain;
}
.nav-name {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.02em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}
.nav-link:hover {
  color: var(--text);
  background: var(--surface-alt);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}
.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--text-tertiary);
  transition: background 0.15s, color 0.15s;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-icon-btn:hover {
  background: var(--surface-alt);
  color: var(--text);
}
.nav-login {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}
.nav-login:hover {
  color: var(--text);
}
.nav-cta {
  margin-left: 2px;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  transition: opacity 0.15s;
}
.nav-cta:hover {
  opacity: 0.88;
}

/* Hamburger — mobile only */
.nav-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 8px 6px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s;
}
.nav-hamburger:hover {
  background: var(--surface-alt);
}
.hamburger-bar {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}
.hamburger-bar.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger-bar.open:nth-child(2) {
  opacity: 0;
}
.hamburger-bar.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu panel — hidden on desktop, toggled on mobile */
.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 0 24px 20px;
  gap: 2px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
@media (max-width: 768px) {
  .mobile-menu-open {
    display: flex;
  }
}
.mobile-link {
  padding: 12px 8px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.mobile-link:hover {
  background: var(--surface-alt);
  color: var(--text);
}
.mobile-menu-divider {
  height: 1px;
  background: var(--border);
  margin: 8px 0;
}
.mobile-cta {
  display: block;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  transition: opacity 0.15s;
}
.mobile-cta:hover {
  opacity: 0.88;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-login { display: none; }
  .nav-cta { display: none; }
  .nav-hamburger { display: flex; }
  .nav-inner { gap: 12px; }
}

/* ═══════════════════════════════════════════════
   § 1  Hero
   ═══════════════════════════════════════════════ */
.hero {
  padding: 100px 24px 80px;
  text-align: center;
}
.hero-inner {
  max-width: 720px;
  margin: 0 auto;
}
.hero-heading {
  font-size: clamp(36px, 5.5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}
.hero-heading-gradient {
  background: linear-gradient(135deg, var(--mint) 0%, var(--cyan) 40%, var(--brand) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto 40px;
}
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(56, 117, 246, 0.35);
  transition: transform 0.15s, box-shadow 0.15s;
}
.hero-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 32px rgba(56, 117, 246, 0.45);
}
.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}
.hero-btn-secondary:hover {
  border-color: var(--brand-light);
  color: var(--brand);
}

/* ═══════════════════════════════════════════════
   § 2  Provider Strip
   ═══════════════════════════════════════════════ */
.strip {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
}
.strip-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 20px 0;
  overflow-x: auto;
}
.strip-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  white-space: nowrap;
  flex-shrink: 0;
}
.strip-logos {
  display: flex;
  align-items: center;
  gap: 32px;
}
.strip-logo-item {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-tertiary);
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition: color 0.15s;
}
.strip-logo-item:hover {
  color: var(--text);
}

/* ═══════════════════════════════════════════════
   § 3  Pain → Solution
   ═══════════════════════════════════════════════ */
.contrast-section {
  padding: 96px 24px;
  background: var(--surface-alt);
}
.contrast-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 48px;
  align-items: start;
}
@media (max-width: 768px) {
  .contrast-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .contrast-divider {
    justify-self: center;
  }
  .contrast-arrow {
    transform: rotate(90deg);
  }
}
.contrast-heading {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
}
.contrast-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.contrast-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.contrast-item strong {
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}
.contrast-item p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0;
}
.contrast-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pain-icon {
  background: #fef2f2;
  color: #ef4444;
}
.landing-dark .pain-icon {
  background: rgba(239, 68, 68, 0.12);
}
.solution-icon {
  background: #eff6ff;
  color: var(--brand);
}
.landing-dark .solution-icon {
  background: rgba(56, 117, 246, 0.12);
}
.contrast-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  flex-shrink: 0;
}
.contrast-arrow {
  color: var(--brand);
}

/* ═══════════════════════════════════════════════
   § 4  Advantages (numbered)
   ═══════════════════════════════════════════════ */
.advantages {
  padding: 96px 24px;
}
.advantages-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}
@media (max-width: 768px) {
  .advantages-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.advantage-block {
  position: relative;
}
.advantage-number {
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--mint), var(--cyan), var(--brand));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.advantage-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
}
.advantage-desc {
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* ═══════════════════════════════════════════════
   § 5  Comparison
   ═══════════════════════════════════════════════ */
.comparison {
  padding: 96px 24px;
  background: var(--surface-alt);
}
.comparison-inner {
  max-width: 800px;
  margin: 0 auto;
}
.comparison-heading {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  margin-bottom: 48px;
}
.comparison-table {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
}
.comp-row {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 1.5fr;
  border-bottom: 1px solid var(--border);
}
.comp-row:last-child {
  border-bottom: none;
}
.comp-header {
  background: var(--surface-alt);
}
.comp-cell {
  padding: 16px 20px;
  font-size: 14px;
  line-height: 1.5;
}
.comp-feature {
  font-weight: 600;
}
.comp-official {
  color: var(--text-tertiary);
  text-align: center;
  border-left: 1px solid var(--border);
}
.comp-us {
  color: var(--brand);
  font-weight: 500;
  text-align: center;
  border-left: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.comp-header .comp-official,
.comp-header .comp-us {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.comp-header .comp-us {
  color: var(--brand);
}
.comp-check {
  flex-shrink: 0;
  color: var(--brand);
}

@media (max-width: 640px) {
  .comp-row {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .comp-cell {
    padding: 12px 10px;
    font-size: 12px;
  }
}

/* ═══════════════════════════════════════════════
   § 6  CTA Banner
   ═══════════════════════════════════════════════ */
.cta-banner {
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%);
  color: #fff;
}
.cta-banner-inner {
  text-align: center;
  padding: 96px 24px;
  max-width: 600px;
  margin: 0 auto;
}
.cta-heading {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.cta-desc {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.85;
  margin-bottom: 36px;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  background: #fff;
  color: var(--brand);
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
}
.cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* ═══════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════ */
.landing-footer {
  background: var(--surface-alt);
  border-top: 1px solid var(--border);
  color: var(--text);
}
.footer-main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 24px 48px;
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  gap: 64px;
}
.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}
.footer-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: contain;
}
.footer-name {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.02em;
}
.footer-tagline {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 240px;
}
.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.footer-col-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text);
  margin-bottom: 16px;
}
.footer-col-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-col-links a {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}
.footer-col-links a:hover {
  color: var(--brand);
}
.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 20px 24px;
  max-width: 1120px;
  margin: 0 auto;
  font-size: 13px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px 24px 32px;
  }
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .footer-columns {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>

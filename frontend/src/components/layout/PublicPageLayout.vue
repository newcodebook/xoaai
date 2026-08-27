<template>
  <div class="pub" :class="{ 'pub-dark': isDark }">
    <!-- Nav -->
    <header class="pub-nav" :class="{ scrolled: headerScrolled }">
      <nav class="pub-nav-inner">
        <router-link to="/" class="pub-brand">
          <img :src="siteLogo || '/logo.svg'" alt="" class="pub-logo" />
          <span class="pub-name">{{ siteName }}</span>
        </router-link>

        <div class="pub-links">
          <router-link to="/products" class="pub-link" :class="{ active: $route.path === '/products' }">{{ t('home.nav.products') }}</router-link>
          <router-link to="/pricing" class="pub-link" :class="{ active: $route.path === '/pricing' }">{{ t('home.nav.pricing') }}</router-link>
          <router-link to="/help" class="pub-link" :class="{ active: $route.path === '/help' }">{{ t('home.nav.help') }}</router-link>
          <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="pub-link">{{ t('home.nav.docs') }}</a>
        </div>

        <div class="pub-actions">
          <LocaleSwitcher />
          <button @click="toggleTheme" class="pub-icon-btn" :title="isDark ? t('home.switchToLight') : t('home.switchToDark')">
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link v-if="!isAuthenticated" to="/login" class="pub-login">{{ t('home.login') }}</router-link>
          <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="pub-cta">
            {{ isAuthenticated ? t('home.dashboard') : t('home.getStarted') }}
          </router-link>
          <button class="pub-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" :aria-label="t('home.nav.menu')">
            <span class="hb" :class="{ open: mobileMenuOpen }"></span>
            <span class="hb" :class="{ open: mobileMenuOpen }"></span>
            <span class="hb" :class="{ open: mobileMenuOpen }"></span>
          </button>
        </div>
      </nav>

      <div class="pub-mobile" :class="{ 'pub-mobile-open': mobileMenuOpen }">
        <router-link to="/products" class="pub-mobile-link" @click="mobileMenuOpen = false">{{ t('home.nav.products') }}</router-link>
        <router-link to="/pricing" class="pub-mobile-link" @click="mobileMenuOpen = false">{{ t('home.nav.pricing') }}</router-link>
        <router-link to="/help" class="pub-mobile-link" @click="mobileMenuOpen = false">{{ t('home.nav.help') }}</router-link>
        <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="pub-mobile-link">{{ t('home.nav.docs') }}</a>
        <div class="pub-mobile-divider"></div>
        <router-link v-if="!isAuthenticated" to="/login" class="pub-mobile-link" @click="mobileMenuOpen = false">{{ t('home.login') }}</router-link>
        <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="pub-mobile-cta" @click="mobileMenuOpen = false">
          {{ isAuthenticated ? t('home.dashboard') : t('home.getStarted') }}
        </router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pub-main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="pub-footer">
      <div class="pub-footer-main">
        <div class="pub-footer-brand-col">
          <router-link to="/" class="pub-footer-brand">
            <img :src="siteLogo || '/logo.svg'" alt="" class="pub-footer-logo" />
            <span class="pub-footer-name">{{ siteName }}</span>
          </router-link>
          <p class="pub-footer-tagline">{{ t('home.footer.tagline') }}</p>
        </div>
        <div class="pub-footer-columns">
          <div class="pub-footer-col">
            <h4 class="pub-footer-col-title">{{ t('home.footer.product') }}</h4>
            <ul class="pub-footer-col-links">
              <li><router-link to="/products">{{ t('home.footer.aiServices') }}</router-link></li>
              <li><router-link to="/pricing">{{ t('home.footer.pricing') }}</router-link></li>
              <li><router-link to="/key-usage">{{ t('home.footer.apiUsage') }}</router-link></li>
            </ul>
          </div>
          <div class="pub-footer-col">
            <h4 class="pub-footer-col-title">{{ t('home.footer.support') }}</h4>
            <ul class="pub-footer-col-links">
              <li><router-link to="/help">{{ t('home.footer.quickStart') }}</router-link></li>
              <li v-if="docUrl"><a :href="docUrl" target="_blank" rel="noopener noreferrer">{{ t('home.footer.documentation') }}</a></li>
            </ul>
          </div>
          <div class="pub-footer-col">
            <h4 class="pub-footer-col-title">{{ t('home.footer.legal') }}</h4>
            <ul class="pub-footer-col-links">
              <li><router-link to="/legal/terms-of-service">{{ t('home.footer.termsOfService') }}</router-link></li>
              <li><router-link to="/legal/privacy-policy">{{ t('home.footer.privacyPolicy') }}</router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pub-footer-bottom">
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

const { t } = useI18n()
const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'XOAAI')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const currentYear = computed(() => new Date().getFullYear())

const isDark = ref(document.documentElement.classList.contains('dark'))
const headerScrolled = ref(false)
const mobileMenuOpen = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function onScroll() {
  headerScrolled.value = window.scrollY > 40
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Tokens */
.pub {
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
  display: flex;
  flex-direction: column;
}
.pub-dark {
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --surface: #0f172a;
  --surface-alt: #1e293b;
  --border: #1e293b;
}

/* Nav */
.pub-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 0 24px;
  transition: background 0.3s, box-shadow 0.3s;
}
.pub-nav.scrolled {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
}
.pub-dark .pub-nav.scrolled {
  background: rgba(15,23,42,0.92);
}
.pub-nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 40px;
}
.pub-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  flex-shrink: 0;
}
.pub-logo { width: 32px; height: 32px; border-radius: 8px; object-fit: contain; }
.pub-name { font-weight: 700; font-size: 18px; letter-spacing: -0.02em; }
.pub-links { display: flex; align-items: center; gap: 4px; }
.pub-link {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}
.pub-link:hover, .pub-link.active { color: var(--text); background: var(--surface-alt); }
.pub-actions { display: flex; align-items: center; gap: 6px; margin-left: auto; }
.pub-icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 8px;
  color: var(--text-tertiary); background: none; border: none; cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.pub-icon-btn:hover { background: var(--surface-alt); color: var(--text); }
.pub-login {
  padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500;
  color: var(--text-secondary); text-decoration: none; transition: color 0.15s;
}
.pub-login:hover { color: var(--text); }
.pub-cta {
  margin-left: 2px; padding: 8px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
  background: var(--brand); color: #fff; text-decoration: none; transition: opacity 0.15s;
}
.pub-cta:hover { opacity: 0.88; }

/* Hamburger */
.pub-hamburger {
  display: none; flex-direction: column; justify-content: center; gap: 5px;
  width: 36px; height: 36px; padding: 8px 6px;
  background: none; border: none; cursor: pointer; border-radius: 8px;
  transition: background 0.15s;
}
.pub-hamburger:hover { background: var(--surface-alt); }
.hb {
  display: block; width: 100%; height: 2px; background: var(--text);
  border-radius: 2px; transition: transform 0.25s, opacity 0.25s;
}
.hb.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hb.open:nth-child(2) { opacity: 0; }
.hb.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.pub-mobile {
  display: none; flex-direction: column; padding: 0 24px 20px; gap: 2px;
  background: var(--surface); border-bottom: 1px solid var(--border);
}
@media (max-width: 768px) {
  .pub-mobile-open { display: flex; }
  .pub-links, .pub-login, .pub-cta { display: none; }
  .pub-hamburger { display: flex; }
  .pub-nav-inner { gap: 12px; }
}
.pub-mobile-link {
  padding: 12px 8px; font-size: 15px; font-weight: 500;
  color: var(--text-secondary); text-decoration: none; border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.pub-mobile-link:hover { background: var(--surface-alt); color: var(--text); }
.pub-mobile-divider { height: 1px; background: var(--border); margin: 8px 0; }
.pub-mobile-cta {
  display: block; text-align: center; padding: 12px; border-radius: 8px;
  font-size: 15px; font-weight: 600; background: var(--brand);
  color: #fff; text-decoration: none; transition: opacity 0.15s;
}
.pub-mobile-cta:hover { opacity: 0.88; }

/* Main */
.pub-main { flex: 1; }

/* Footer */
.pub-footer {
  background: var(--surface-alt); border-top: 1px solid var(--border); color: var(--text);
}
.pub-footer-main {
  max-width: 1120px; margin: 0 auto; padding: 64px 24px 48px;
  display: grid; grid-template-columns: 1.4fr 2fr; gap: 64px;
}
.pub-footer-brand-col { display: flex; flex-direction: column; gap: 16px; }
.pub-footer-brand {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--text);
}
.pub-footer-logo { width: 28px; height: 28px; border-radius: 6px; object-fit: contain; }
.pub-footer-name { font-weight: 700; font-size: 16px; letter-spacing: -0.02em; }
.pub-footer-tagline { font-size: 14px; line-height: 1.6; color: var(--text-secondary); max-width: 240px; }
.pub-footer-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.pub-footer-col-title {
  font-size: 13px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--text); margin-bottom: 16px;
}
.pub-footer-col-links {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.pub-footer-col-links a {
  font-size: 14px; color: var(--text-secondary); text-decoration: none; transition: color 0.15s;
}
.pub-footer-col-links a:hover { color: var(--brand); }
.pub-footer-bottom {
  border-top: 1px solid var(--border); padding: 20px 24px;
  max-width: 1120px; margin: 0 auto; font-size: 13px; color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .pub-footer-main { grid-template-columns: 1fr; gap: 40px; padding: 48px 24px 32px; }
  .pub-footer-columns { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .pub-footer-columns { grid-template-columns: 1fr; gap: 28px; }
}
</style>

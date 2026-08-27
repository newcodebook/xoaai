<template>
  <PublicPageLayout>
    <!-- Hero -->
    <section class="pg-hero">
      <div class="pg-container">
        <h1 class="pg-hero-title">{{ t('products.heroTitle') }}</h1>
        <p class="pg-hero-desc">{{ t('products.heroDesc') }}</p>
      </div>
    </section>

    <!-- Model Cards -->
    <section class="pg-section">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('products.modelsTitle') }}</h2>
        <div class="model-grid">
          <div v-for="m in models" :key="m.key" class="model-card">
            <div class="model-badge" :style="{ background: m.color }">{{ m.letter }}</div>
            <div class="model-info">
              <h3 class="model-name">{{ t(`products.${m.key}.name`) }}</h3>
              <span class="model-provider">{{ t(`products.${m.key}.provider`) }}</span>
            </div>
            <p class="model-desc">{{ t(`products.${m.key}.desc`) }}</p>
            <div class="model-models">{{ m.catalogModels || t(`products.${m.key}.models`) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="pg-section pg-section-alt">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('products.featuresTitle') }}</h2>
        <div class="feature-grid">
          <div v-for="f in features" :key="f.key" class="feature-card">
            <div class="feature-icon-wrap"><Icon :name="f.icon" size="lg" /></div>
            <h3 class="feature-name">{{ t(`products.${f.key}.title`) }}</h3>
            <p class="feature-desc">{{ t(`products.${f.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pg-cta">
      <div class="pg-container" style="text-align:center;">
        <h2 class="pg-cta-title">{{ t('pricing.ctaTitle') }}</h2>
        <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="pg-cta-btn">
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
          <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2.5" />
        </router-link>
      </div>
    </section>
  </PublicPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores'
import PublicPageLayout from '@/components/layout/PublicPageLayout.vue'
import Icon from '@/components/icons/Icon.vue'
import modelCatalog from '@/generated/model-catalog.json'

const { t } = useI18n()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')

// Build a lookup from provider key → catalog model list string
const catalogModelsMap: Record<string, string> = {}
for (const p of modelCatalog.providers) {
  catalogModelsMap[p.key] = p.models
}

const models = [
  { key: 'claude', letter: 'C', color: 'linear-gradient(135deg, #d97706, #ea580c)', catalogModels: catalogModelsMap['anthropic'] },
  { key: 'gpt', letter: 'G', color: 'linear-gradient(135deg, #10b981, #059669)', catalogModels: catalogModelsMap['openai'] },
  { key: 'gemini', letter: 'G', color: 'linear-gradient(135deg, #3b82f6, #2563eb)', catalogModels: catalogModelsMap['google'] },
  { key: 'antigravity', letter: 'A', color: 'linear-gradient(135deg, #f43f5e, #db2777)', catalogModels: '' },
]

const features = [
  { key: 'feature1', icon: 'globe' as const },
  { key: 'feature2', icon: 'bolt' as const },
  { key: 'feature3', icon: 'chart' as const },
  { key: 'feature4', icon: 'dollar' as const },
]
</script>

<style scoped>
/* Shared page tokens (inherited from PublicPageLayout) */
.pg-hero {
  padding: 96px 24px 64px;
  text-align: center;
  background: linear-gradient(180deg, var(--surface-alt, #f8fafc) 0%, var(--surface, #fff) 100%);
}
.pg-container { max-width: 1120px; margin: 0 auto; }
.pg-hero-title {
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 20px;
}
.pg-hero-desc {
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
  color: var(--text-secondary, #475569);
  max-width: 600px;
  margin: 0 auto;
}
.pg-section { padding: 80px 24px; }
.pg-section-alt { background: var(--surface-alt, #f8fafc); }
.pg-section-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  margin-bottom: 48px;
}

/* Model cards */
.model-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
@media (max-width: 768px) {
  .model-grid { grid-template-columns: 1fr; }
}
.model-card {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 16px;
  padding: 28px;
  background: var(--surface, #fff);
  transition: box-shadow 0.2s;
}
.model-card:hover {
  box-shadow: 0 8px 32px rgba(56, 117, 246, 0.08);
}
.model-info { display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px; }
.model-badge {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 700; color: #fff;
  margin-bottom: 16px; flex-shrink: 0;
}
.model-name { font-size: 20px; font-weight: 700; }
.model-provider { font-size: 13px; color: var(--text-tertiary, #94a3b8); }
.model-desc {
  font-size: 14px; line-height: 1.6; color: var(--text-secondary, #475569);
  margin-bottom: 16px;
}
.model-models {
  font-size: 13px; font-weight: 500; color: var(--brand, #3875f6);
  padding: 8px 12px; background: rgba(56, 117, 246, 0.06);
  border-radius: 8px; display: inline-block;
}

/* Feature cards */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
@media (max-width: 900px) { .feature-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .feature-grid { grid-template-columns: 1fr; } }
.feature-card { text-align: center; padding: 32px 20px; }
.feature-icon-wrap {
  width: 56px; height: 56px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(56, 117, 246, 0.08); color: var(--brand, #3875f6);
  margin: 0 auto 20px;
}
.feature-name { font-size: 17px; font-weight: 600; margin-bottom: 10px; }
.feature-desc { font-size: 14px; line-height: 1.6; color: var(--text-secondary, #475569); }

/* CTA */
.pg-cta {
  padding: 96px 24px;
  background: linear-gradient(135deg, var(--brand, #3875f6) 0%, var(--brand-dark, #2458d4) 100%);
  color: #fff;
}
.pg-cta-title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; margin-bottom: 32px; }
.pg-cta-btn {
  display: inline-flex; align-items: center; padding: 14px 36px;
  border-radius: 10px; font-size: 16px; font-weight: 600;
  background: #fff; color: var(--brand, #3875f6);
  text-decoration: none; transition: transform 0.15s, box-shadow 0.15s;
}
.pg-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
</style>

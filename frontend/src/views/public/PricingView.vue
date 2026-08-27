<template>
  <PublicPageLayout>
    <!-- Hero -->
    <section class="pg-hero">
      <div class="pg-container">
        <h1 class="pg-hero-title">{{ t('pricing.heroTitle') }}</h1>
        <p class="pg-hero-desc">{{ t('pricing.heroDesc') }}</p>
      </div>
    </section>

    <!-- Exchange Rate -->
    <section class="pg-section">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('pricing.exchangeTitle') }}</h2>
        <div class="exchange-card">
          <div class="exchange-visual">
            <div class="exchange-side">
              <span class="exchange-currency">¥</span>
              <span class="exchange-amount">1</span>
              <span class="exchange-label">RMB</span>
            </div>
            <div class="exchange-arrow">
              <Icon name="arrowRight" size="lg" />
            </div>
            <div class="exchange-side">
              <span class="exchange-currency">$</span>
              <span class="exchange-amount">1</span>
              <span class="exchange-label">USD Token Credit</span>
            </div>
          </div>
          <p class="exchange-desc">{{ t('pricing.exchangeDesc') }}</p>
          <p class="exchange-note">{{ t('pricing.exchangeNote') }}</p>
        </div>
      </div>
    </section>

    <!-- Why Cheaper -->
    <section class="pg-section pg-section-alt">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('pricing.whyCheaperTitle') }}</h2>
        <div class="cheaper-steps">
          <div class="cheaper-step">
            <div class="cheaper-num">1</div>
            <p>{{ t('pricing.whyCheaper1') }}</p>
          </div>
          <div class="cheaper-arrow"><Icon name="arrowRight" size="md" /></div>
          <div class="cheaper-step">
            <div class="cheaper-num">2</div>
            <p>{{ t('pricing.whyCheaper2') }}</p>
          </div>
          <div class="cheaper-arrow"><Icon name="arrowRight" size="md" /></div>
          <div class="cheaper-step">
            <div class="cheaper-num">3</div>
            <p>{{ t('pricing.whyCheaper3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Model Pricing Table -->
    <section class="pg-section">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('pricing.modelPricingTitle') }}</h2>
        <div class="pricing-table-wrap">
          <table class="pricing-table">
            <thead>
              <tr>
                <th>{{ t('pricing.tableModel') }}</th>
                <th class="num-col">{{ t('pricing.tableInput') }}</th>
                <th class="num-col">{{ t('pricing.tableOutput') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pricingRows" :key="row.model">
                <td>
                  <span class="model-dot" :style="{ background: row.color }"></span>
                  {{ row.model }}
                </td>
                <td class="num-col">{{ row.input }}</td>
                <td class="num-col">{{ row.output }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="pricing-note">{{ t('pricing.tableNote') }}</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="pg-cta">
      <div class="pg-container" style="text-align:center;">
        <h2 class="pg-cta-title">{{ t('pricing.ctaTitle') }}</h2>
        <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="pg-cta-btn">
          {{ isAuthenticated ? t('home.goToDashboard') : t('pricing.ctaButton') }}
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

const { t } = useI18n()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')

const pricingRows = [
  { model: 'Claude Opus 4', input: '$15.00', output: '$75.00', color: '#ea580c' },
  { model: 'Claude Sonnet 4', input: '$3.00', output: '$15.00', color: '#ea580c' },
  { model: 'Claude Haiku 3.5', input: '$0.80', output: '$4.00', color: '#ea580c' },
  { model: 'GPT-4o', input: '$2.50', output: '$10.00', color: '#10b981' },
  { model: 'GPT-4.1', input: '$2.00', output: '$8.00', color: '#10b981' },
  { model: 'GPT-4.1 mini', input: '$0.40', output: '$1.60', color: '#10b981' },
  { model: 'o3', input: '$2.00', output: '$8.00', color: '#10b981' },
  { model: 'o4-mini', input: '$1.10', output: '$4.40', color: '#10b981' },
  { model: 'Gemini 2.5 Pro', input: '$1.25', output: '$10.00', color: '#3b82f6' },
  { model: 'Gemini 2.5 Flash', input: '$0.15', output: '$0.60', color: '#3b82f6' },
]
</script>

<style scoped>
.pg-hero {
  padding: 96px 24px 64px; text-align: center;
  background: linear-gradient(180deg, var(--surface-alt, #f8fafc) 0%, var(--surface, #fff) 100%);
}
.pg-container { max-width: 1120px; margin: 0 auto; }
.pg-hero-title {
  font-size: clamp(32px, 4.5vw, 52px); font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 20px;
}
.pg-hero-desc {
  font-size: clamp(16px, 2vw, 20px); line-height: 1.6;
  color: var(--text-secondary, #475569); max-width: 640px; margin: 0 auto;
}
.pg-section { padding: 80px 24px; }
.pg-section-alt { background: var(--surface-alt, #f8fafc); }
.pg-section-title {
  font-size: 28px; font-weight: 700; letter-spacing: -0.02em;
  text-align: center; margin-bottom: 48px;
}

/* Exchange card */
.exchange-card {
  max-width: 640px; margin: 0 auto; text-align: center;
  border: 1px solid var(--border, #e2e8f0); border-radius: 20px;
  padding: 48px 32px; background: var(--surface, #fff);
}
.exchange-visual {
  display: flex; align-items: center; justify-content: center; gap: 32px;
  margin-bottom: 32px; flex-wrap: wrap;
}
.exchange-side { display: flex; align-items: baseline; gap: 4px; }
.exchange-currency {
  font-size: 36px; font-weight: 800;
  background: linear-gradient(135deg, #79f4bd, #39d9e7, #3875f6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.exchange-amount { font-size: 64px; font-weight: 800; line-height: 1; }
.exchange-label {
  font-size: 14px; font-weight: 600; color: var(--text-tertiary, #94a3b8);
  text-transform: uppercase; letter-spacing: 0.05em; margin-left: 4px;
}
.exchange-arrow { color: var(--brand, #3875f6); flex-shrink: 0; }
.exchange-desc {
  font-size: 16px; line-height: 1.65; color: var(--text-secondary, #475569); margin-bottom: 16px;
}
.exchange-note {
  font-size: 13px; color: var(--text-tertiary, #94a3b8); font-style: italic;
}

/* Why cheaper */
.cheaper-steps {
  display: flex; align-items: center; justify-content: center; gap: 24px;
  flex-wrap: wrap; max-width: 800px; margin: 0 auto;
}
.cheaper-step {
  flex: 1; min-width: 180px; text-align: center;
  padding: 28px 20px; border: 1px solid var(--border, #e2e8f0);
  border-radius: 16px; background: var(--surface, #fff);
}
.cheaper-num {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--brand, #3875f6); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 16px; margin: 0 auto 16px;
}
.cheaper-step p { font-size: 15px; line-height: 1.5; color: var(--text-secondary, #475569); margin: 0; }
.cheaper-arrow { color: var(--text-tertiary, #94a3b8); flex-shrink: 0; }
@media (max-width: 768px) {
  .cheaper-arrow { transform: rotate(90deg); }
  .cheaper-steps { flex-direction: column; gap: 16px; }
  .cheaper-step { min-width: auto; width: 100%; }
}

/* Pricing table */
.pricing-table-wrap {
  overflow-x: auto; border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px; background: var(--surface, #fff);
}
.pricing-table {
  width: 100%; border-collapse: collapse; font-size: 14px;
  font-variant-numeric: tabular-nums;
}
.pricing-table th {
  padding: 14px 20px; text-align: left; font-size: 12px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--text-tertiary, #94a3b8); background: var(--surface-alt, #f8fafc);
  border-bottom: 1px solid var(--border, #e2e8f0);
}
.pricing-table td {
  padding: 14px 20px; border-bottom: 1px solid var(--border, #e2e8f0);
}
.pricing-table tr:last-child td { border-bottom: none; }
.num-col { text-align: right; font-weight: 500; }
.model-dot {
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  margin-right: 8px; vertical-align: middle;
}
.pricing-note {
  margin-top: 20px; font-size: 13px; color: var(--text-tertiary, #94a3b8);
  text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;
}

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

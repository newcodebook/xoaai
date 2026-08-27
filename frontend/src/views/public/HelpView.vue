<template>
  <PublicPageLayout>
    <!-- Hero -->
    <section class="pg-hero">
      <div class="pg-container">
        <h1 class="pg-hero-title">{{ t('help.heroTitle') }}</h1>
        <p class="pg-hero-desc">{{ t('help.heroDesc') }}</p>
      </div>
    </section>

    <!-- Prerequisites -->
    <section class="pg-section">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('help.prereqTitle') }}</h2>
        <div class="prereq-steps">
          <div v-for="n in 3" :key="n" class="prereq-step">
            <div class="prereq-num">{{ n }}</div>
            <p>{{ t(`help.prereqStep${n}`) }}</p>
          </div>
        </div>
        <p class="prereq-note">{{ t('help.prereqNote') }}</p>
      </div>
    </section>

    <!-- Endpoints -->
    <section class="pg-section pg-section-alt">
      <div class="pg-container">
        <h2 class="pg-section-title">{{ t('help.endpointTitle') }}</h2>
        <div class="endpoint-grid">
          <div v-for="ep in endpoints" :key="ep.key" class="endpoint-card">
            <h3 class="endpoint-name">{{ t(`help.endpoint${ep.key}`) }}</h3>
            <code class="endpoint-url">{{ t(`help.endpoint${ep.key}Url`) }}</code>
            <p class="endpoint-desc">{{ t(`help.endpoint${ep.key}Desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Guides -->
    <section class="pg-section">
      <div class="pg-container">
        <div class="guide-list">
          <div v-for="client in clients" :key="client.key" :id="client.key" class="guide-card">
            <div class="guide-header">
              <div class="guide-badge" :style="{ background: client.color }">{{ client.letter }}</div>
              <div>
                <h3 class="guide-title">{{ t(`help.${client.key}.title`) }}</h3>
                <p class="guide-subtitle">{{ t(`help.${client.key}.desc`) }}</p>
              </div>
            </div>

            <div class="guide-body">
              <p class="guide-step-label">{{ t(`help.${client.key}.step1`) }}</p>
              <div class="code-block">
                <div class="code-header">
                  <span>{{ client.shell }}</span>
                  <button class="copy-btn" @click="copyText(t(`help.${client.key}.env1`) + '\n' + t(`help.${client.key}.env2`), client.key)">
                    {{ copiedKey === client.key ? t('help.copied') : t('help.copyButton') }}
                  </button>
                </div>
                <pre class="code-content"><code>export {{ t(`help.${client.key}.env1`) }}
export {{ t(`help.${client.key}.env2`) }}</code></pre>
              </div>

              <p class="guide-step-label step2">{{ t(`help.${client.key}.step2`) }}</p>

              <div v-if="client.note" class="guide-note">
                <Icon name="bolt" size="sm" class="note-icon" />
                <span>{{ t(`help.${client.key}.note`) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Need Help -->
    <section class="pg-section pg-section-alt">
      <div class="pg-container" style="text-align:center; max-width:560px;">
        <h2 class="pg-section-title">{{ t('help.needHelp') }}</h2>
        <p class="help-desc">{{ t('help.needHelpDesc') }}</p>
        <router-link to="/key-usage" class="help-link">
          {{ t('home.footer.apiUsage') }}
          <Icon name="arrowRight" size="sm" class="ml-1" />
        </router-link>
      </div>
    </section>
  </PublicPageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PublicPageLayout from '@/components/layout/PublicPageLayout.vue'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()

const copiedKey = ref('')

const endpoints = [
  { key: 'OpenAI' },
  { key: 'Anthropic' },
  { key: 'Antigravity' },
]

const clients = [
  { key: 'claudeCode', letter: 'C', color: 'linear-gradient(135deg, #d97706, #ea580c)', shell: 'bash', note: true },
  { key: 'codex', letter: 'Cx', color: 'linear-gradient(135deg, #10b981, #059669)', shell: 'bash', note: true },
  { key: 'antigravity', letter: 'A', color: 'linear-gradient(135deg, #f43f5e, #db2777)', shell: 'bash', note: false },
  { key: 'opencode', letter: 'O', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', shell: 'bash', note: false },
]

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => { copiedKey.value = '' }, 2000)
  } catch {
    // fallback
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copiedKey.value = key
    setTimeout(() => { copiedKey.value = '' }, 2000)
  }
}
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

/* Prerequisites */
.prereq-steps {
  display: flex; gap: 24px; max-width: 720px; margin: 0 auto 32px;
  flex-wrap: wrap; justify-content: center;
}
.prereq-step {
  flex: 1; min-width: 180px; text-align: center;
  padding: 24px 16px; border: 1px solid var(--border, #e2e8f0);
  border-radius: 16px; background: var(--surface, #fff);
}
.prereq-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--brand, #3875f6); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px; margin: 0 auto 12px;
}
.prereq-step p { font-size: 14px; line-height: 1.5; color: var(--text-secondary, #475569); margin: 0; }
.prereq-note {
  text-align: center; font-size: 13px; color: var(--text-tertiary, #94a3b8);
  max-width: 560px; margin: 0 auto;
}

/* Endpoints */
.endpoint-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
@media (max-width: 768px) { .endpoint-grid { grid-template-columns: 1fr; } }
.endpoint-card {
  border: 1px solid var(--border, #e2e8f0); border-radius: 14px;
  padding: 24px; background: var(--surface, #fff);
}
.endpoint-name { font-size: 16px; font-weight: 600; margin-bottom: 10px; }
.endpoint-url {
  display: block; font-size: 13px; font-family: ui-monospace, monospace;
  color: var(--brand, #3875f6); background: rgba(56,117,246,0.06);
  padding: 8px 12px; border-radius: 8px; margin-bottom: 12px;
  word-break: break-all;
}
.endpoint-desc { font-size: 13px; color: var(--text-secondary, #475569); line-height: 1.5; margin: 0; }

/* Guide cards */
.guide-list { display: flex; flex-direction: column; gap: 32px; }
.guide-card {
  border: 1px solid var(--border, #e2e8f0); border-radius: 16px;
  overflow: hidden; background: var(--surface, #fff);
}
.guide-header {
  display: flex; align-items: center; gap: 16px;
  padding: 24px 28px; border-bottom: 1px solid var(--border, #e2e8f0);
}
.guide-badge {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.guide-title { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
.guide-subtitle { font-size: 13px; color: var(--text-secondary, #475569); margin: 0; }
.guide-body { padding: 24px 28px; }
.guide-step-label { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
.guide-step-label.step2 { margin-top: 20px; color: var(--text-secondary, #475569); }

/* Code block */
.code-block {
  border: 1px solid var(--border, #e2e8f0); border-radius: 10px; overflow: hidden;
}
.code-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 16px; background: var(--surface-alt, #f8fafc);
  border-bottom: 1px solid var(--border, #e2e8f0);
  font-size: 12px; color: var(--text-tertiary, #94a3b8);
}
.copy-btn {
  font-size: 12px; font-weight: 500; padding: 4px 12px;
  border-radius: 6px; border: 1px solid var(--border, #e2e8f0);
  background: var(--surface, #fff); color: var(--text-secondary, #475569);
  cursor: pointer; transition: border-color 0.15s;
}
.copy-btn:hover { border-color: var(--brand, #3875f6); color: var(--brand, #3875f6); }
.code-content {
  padding: 16px; margin: 0; overflow-x: auto;
  font-family: ui-monospace, 'Fira Code', monospace;
  font-size: 13px; line-height: 1.7;
  background: #0f172a; color: #e2e8f0;
}
.code-content code { color: inherit; }

/* Guide note */
.guide-note {
  display: flex; align-items: flex-start; gap: 8px;
  margin-top: 16px; padding: 12px 16px;
  border-radius: 8px; background: rgba(56,117,246,0.06);
  font-size: 13px; color: var(--text-secondary, #475569); line-height: 1.5;
}
.note-icon { flex-shrink: 0; color: var(--brand, #3875f6); margin-top: 2px; }

/* Need help */
.help-desc { font-size: 15px; color: var(--text-secondary, #475569); line-height: 1.6; margin-bottom: 24px; }
.help-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 15px; font-weight: 600; color: var(--brand, #3875f6);
  text-decoration: none; transition: opacity 0.15s;
}
.help-link:hover { opacity: 0.8; }
</style>

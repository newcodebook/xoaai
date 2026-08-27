<template>
  <PublicPageLayout>
    <!-- Page header — minimal, just context -->
    <div class="page-bar">
      <div class="help-container bar-inner">
        <h1 class="bar-title">{{ t('help.title') }}</h1>
        <p class="bar-note">{{ t('help.prereqNote') }}</p>
      </div>
    </div>

    <!-- Client Guides -->
    <section class="help-section">
      <div class="help-container guide-container">
        <div v-for="client in clients" :key="client.key" :id="client.key" class="guide-card">
          <!-- Card header -->
          <div class="guide-head">
            <div class="guide-icon" :style="{ background: client.color }">{{ client.letter }}</div>
            <div class="guide-meta">
              <h3 class="guide-name">{{ t(`help.${client.key}.title`) }}</h3>
              <p class="guide-desc">{{ t(`help.${client.key}.desc`) }}</p>
            </div>
          </div>

          <!-- Tabs -->
          <div class="tab-bar">
            <button
              v-for="tab in client.tabs"
              :key="tab.id"
              class="tab-btn"
              :class="{ active: activeTab[client.key] === tab.id }"
              @click="activeTab[client.key] = tab.id"
            >
              <svg v-if="tab.id === 'config'" class="tab-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 1v8h8V4H4z"/></svg>
              <svg v-else class="tab-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"/><path d="M1.5 3A1.5 1.5 0 013 1.5h10A1.5 1.5 0 0114.5 3v10a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 13V3zm1.5 0v10h10V3H3z"/></svg>
              {{ t(`help.tab${tab.labelKey}`) }}
            </button>
          </div>

          <!-- Config file panel -->
          <div class="tab-panel" v-if="activeTab[client.key] === 'config'">
            <p class="step-label">{{ t(`help.${client.key}.configStep`) }}</p>
            <div class="file-path">
              <svg class="fp-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3.5A1.5 1.5 0 013.5 2h2.879a1.5 1.5 0 011.06.44l1.122 1.12A1.5 1.5 0 009.62 4H12.5A1.5 1.5 0 0114 5.5v7a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 12.5v-9z"/></svg>
              <code>{{ client.configPath }}</code>
            </div>
            <div class="code-block">
              <div class="code-bar">
                <span class="code-lang">{{ client.configLang }}</span>
                <button class="copy-btn" @click="copyText(client.configContent, client.key + '-config')">
                  <svg class="copy-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/></svg>
                  {{ copiedKey === client.key + '-config' ? t('help.copied') : t('help.copyButton') }}
                </button>
              </div>
              <pre class="code-body"><code>{{ client.configContent }}</code></pre>
            </div>
            <p class="step-final">{{ t(`help.${client.key}.step2`) }}</p>
          </div>

          <!-- Env var panel -->
          <div class="tab-panel" v-else>
            <p class="step-label">{{ t(`help.${client.key}.step1`) }}</p>
            <div class="code-block">
              <div class="code-bar">
                <span class="code-lang">bash</span>
                <button class="copy-btn" @click="copyText(client.envLines.join('\n'), client.key + '-env')">
                  <svg class="copy-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/></svg>
                  {{ copiedKey === client.key + '-env' ? t('help.copied') : t('help.copyButton') }}
                </button>
              </div>
              <pre class="code-body"><code>{{ client.envLines.join('\n') }}</code></pre>
            </div>
            <div class="env-tip">
              <svg class="tip-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"/></svg>
              <span>{{ t('help.envNote') }}</span>
            </div>
            <p class="step-final">{{ t(`help.${client.key}.step2`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="help-cta">
      <div class="help-container cta-inner">
        <h2 class="cta-title">{{ t('help.needHelp') }}</h2>
        <p class="cta-desc">{{ t('help.needHelpDesc') }}</p>
        <router-link to="/key-usage" class="cta-link">
          {{ t('home.footer.apiUsage') }}
          <svg class="cta-arrow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/></svg>
        </router-link>
      </div>
    </section>
  </PublicPageLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import PublicPageLayout from '@/components/layout/PublicPageLayout.vue'

const { t } = useI18n()

const copiedKey = ref('')

const CONFIG_SNIPPETS = {
  claudeCode: {
    path: '~/.claude/settings.json',
    lang: 'json',
    content: `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.xoaai.com",
    "ANTHROPIC_AUTH_TOKEN": "{api_key}",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}`,
  },
  codex: {
    path: '~/.codex/config.toml + ~/.codex/auth.json',
    lang: 'toml + json',
    content: `# ~/.codex/config.toml
disable_response_storage = true

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://www.xoaai.com/v1"
wire_api = "responses"

# ~/.codex/auth.json
{
  "OPENAI_API_KEY": "{api_key}"
}`,
  },
  antigravity: {
    path: '~/.claude/settings.json',
    lang: 'json',
    content: `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.xoaai.com/antigravity",
    "ANTHROPIC_AUTH_TOKEN": "{api_key}",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}`,
  },
  opencode: {
    path: 'opencode.json',
    lang: 'json',
    content: `{
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://www.xoaai.com/v1",
        "apiKey": "{api_key}"
      }
    }
  }
}`,
  },
} as const

type ClientKey = keyof typeof CONFIG_SNIPPETS

const tabs = [
  { id: 'config', labelKey: 'Config' },
  { id: 'env', labelKey: 'Env' },
]

const activeTab = reactive<Record<string, string>>({
  claudeCode: 'config',
  codex: 'config',
  antigravity: 'config',
  opencode: 'config',
})

const ENV_LINES = {
  claudeCode: [
    'export ANTHROPIC_BASE_URL="https://www.xoaai.com"',
    'export ANTHROPIC_AUTH_TOKEN="{api_key}"',
    'export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1',
    'export CLAUDE_CODE_ATTRIBUTION_HEADER=0',
  ],
  codex: [
    'export OPENAI_BASE_URL="https://www.xoaai.com/v1"',
    'export OPENAI_API_KEY="{api_key}"',
  ],
  antigravity: [
    'export ANTHROPIC_BASE_URL="https://www.xoaai.com/antigravity"',
    'export ANTHROPIC_AUTH_TOKEN="{api_key}"',
    'export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1',
    'export CLAUDE_CODE_ATTRIBUTION_HEADER=0',
  ],
  opencode: [
    'export OPENAI_BASE_URL="https://www.xoaai.com/v1"',
    'export OPENAI_API_KEY="{api_key}"',
  ],
}

const clients = [
  { key: 'claudeCode' as ClientKey, letter: 'C', color: 'linear-gradient(135deg, #d97706, #ea580c)', tabs, configPath: CONFIG_SNIPPETS.claudeCode.path, configLang: CONFIG_SNIPPETS.claudeCode.lang, configContent: CONFIG_SNIPPETS.claudeCode.content, envLines: ENV_LINES.claudeCode },
  { key: 'codex' as ClientKey, letter: 'Cx', color: 'linear-gradient(135deg, #10b981, #059669)', tabs, configPath: CONFIG_SNIPPETS.codex.path, configLang: CONFIG_SNIPPETS.codex.lang, configContent: CONFIG_SNIPPETS.codex.content, envLines: ENV_LINES.codex },
  { key: 'antigravity' as ClientKey, letter: 'A', color: 'linear-gradient(135deg, #f43f5e, #db2777)', tabs, configPath: CONFIG_SNIPPETS.antigravity.path, configLang: CONFIG_SNIPPETS.antigravity.lang, configContent: CONFIG_SNIPPETS.antigravity.content, envLines: ENV_LINES.antigravity },
  { key: 'opencode' as ClientKey, letter: 'O', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', tabs, configPath: CONFIG_SNIPPETS.opencode.path, configLang: CONFIG_SNIPPETS.opencode.lang, configContent: CONFIG_SNIPPETS.opencode.content, envLines: ENV_LINES.opencode },
]

async function copyText(text: string, key: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => { copiedKey.value = '' }, 2000)
  } catch {
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
/*
 * Color approach: use var(--name, <light-fallback>) throughout.
 * The project's global theme layer provides --surface, --text-secondary, etc.
 * We use those where available, with explicit fallbacks for this page.
 */

/* ── Layout ── */
.help-container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

/* ── Page bar ── */
.page-bar {
  padding: 52px 24px 20px;
  border-bottom: 1px solid var(--border, #e2e8f0);
}
.bar-inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.bar-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.bar-note {
  font-size: 13px;
  color: var(--text-tertiary, #94a3b8);
  margin: 0;
}

/* ── Sections ── */
.help-section { padding: 32px 0; }

/* ── Guide cards ── */
.guide-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
@media (max-width: 860px) { .guide-container { grid-template-columns: 1fr; } }

.guide-card {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 14px;
  background: var(--surface, #fff);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.guide-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 20px 0;
}
.guide-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}
.guide-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
}
.guide-desc {
  font-size: 12px;
  color: var(--text-tertiary, #94a3b8);
  margin: 0;
  line-height: 1.4;
}

/* ── Tabs ── */
.tab-bar {
  display: flex;
  gap: 2px;
  margin: 16px 20px 0;
  background: var(--surface-alt, #f1f5f9);
  border-radius: 8px;
  padding: 3px;
}
.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: var(--text-tertiary, #94a3b8);
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}
.tab-btn.active {
  background: var(--surface, #fff);
  color: var(--brand, #3875f6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.tab-btn:hover:not(.active) { color: var(--text-secondary, #475569); }
.tab-icon { width: 14px; height: 14px; flex-shrink: 0; }

/* ── Tab panel ── */
.tab-panel {
  padding: 16px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.step-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary, #475569);
  margin-bottom: 10px;
}

/* File path chip */
.file-path {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 6px;
  background: rgba(56, 117, 246, 0.06);
  font-size: 12px;
  max-width: 100%;
}
.file-path code {
  font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
  color: var(--brand, #3875f6);
  font-weight: 500;
  word-break: break-all;
}
.fp-icon { width: 14px; height: 14px; color: var(--brand, #3875f6); flex-shrink: 0; }

/* ── Code block ── */
.code-block {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.code-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background: #282a3a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.code-lang {
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.copy-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
}
.copy-icon { width: 12px; height: 12px; }
.code-body {
  padding: 14px 16px;
  margin: 0;
  overflow-x: auto;
  font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  line-height: 1.7;
  background: #1e2030;
  color: #e2e8f0;
  tab-size: 2;
}
.code-body code { color: inherit; }

/* ── Env tip ── */
.env-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  font-size: 11px;
  color: #1e40af;
  line-height: 1.5;
}
.tip-icon { width: 14px; height: 14px; flex-shrink: 0; margin-top: 1px; }

/* Step final */
.step-final {
  margin-top: auto;
  padding-top: 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-tertiary, #94a3b8);
  border-top: 1px solid var(--border, #e2e8f0);
  margin-bottom: 0;
}

/* ── CTA ── */
.help-cta {
  padding: 80px 24px;
  background: linear-gradient(135deg, #3875f6 0%, #2458d4 100%);
  text-align: center;
}
.cta-inner { max-width: 520px; }
.cta-title {
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
}
.cta-desc {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 28px;
}
.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  background: #fff;
  color: #3875f6;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
}
.cta-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.cta-arrow { width: 18px; height: 18px; }
</style>

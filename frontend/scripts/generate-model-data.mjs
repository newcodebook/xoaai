#!/usr/bin/env node
/**
 * generate-model-data.mjs
 *
 * Reads the LiteLLM-sourced model pricing JSON that the backend maintains
 * (synced from Wei-Shaw/model-price-repo) and emits a compact catalog for the
 * frontend marketing pages (Products + Pricing).
 *
 * Run:  node scripts/generate-model-data.mjs
 * Hook: automatically invoked by "prebuild" in package.json
 *
 * Output: src/generated/model-catalog.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PRICING_FILE = resolve(ROOT, '..', 'backend', 'resources', 'model-pricing', 'model_prices_and_context_window.json')
const OUT_DIR = resolve(ROOT, 'src', 'generated')
const OUT_FILE = resolve(OUT_DIR, 'model-catalog.json')

// ---------------------------------------------------------------------------
// Which models to surface on the marketing pages.
//
// Keys = canonical model ID in the pricing JSON.
// displayName = human-friendly name for the UI.
// provider     = brand grouping (anthropic / openai / google).
//
// Order within each provider determines display order.
// ---------------------------------------------------------------------------
const FEATURED_MODELS = [
  // Anthropic  –  latest family first
  { id: 'claude-opus-5',           displayName: 'Claude Opus 5',     provider: 'anthropic' },
  { id: 'claude-sonnet-4-6',       displayName: 'Claude Sonnet 4.6', provider: 'anthropic' },
  { id: 'claude-opus-4-8',         displayName: 'Claude Opus 4.8',   provider: 'anthropic' },
  { id: 'claude-haiku-4-5',        displayName: 'Claude Haiku 4.5',  provider: 'anthropic' },

  // OpenAI  –  latest family first
  { id: 'gpt-5.6-terra',           displayName: 'GPT-5.6 Terra',    provider: 'openai' },
  { id: 'gpt-5.6-luna',            displayName: 'GPT-5.6 Luna',     provider: 'openai' },
  { id: 'gpt-5.5',                 displayName: 'GPT-5.5',          provider: 'openai' },
  { id: 'gpt-5.4',                 displayName: 'GPT-5.4',          provider: 'openai' },
  { id: 'gpt-5.4-mini',            displayName: 'GPT-5.4 mini',     provider: 'openai' },
  { id: 'o3',                      displayName: 'o3',               provider: 'openai' },
  { id: 'o4-mini',                 displayName: 'o4-mini',          provider: 'openai' },

  // Google  –  latest family first
  { id: 'gemini-3.1-flash-live-preview', displayName: 'Gemini 3.1 Flash', provider: 'google' },
  { id: 'gemini-pro-latest',       displayName: 'Gemini 2.5 Pro',   provider: 'google' },
  { id: 'gemini-flash-latest',     displayName: 'Gemini 2.5 Flash', provider: 'google' },
]

// Provider metadata for the Products page cards.
const PROVIDERS = {
  anthropic: {
    brand: 'Claude',
    company: 'Anthropic',
    color: '#ea580c',
  },
  openai: {
    brand: 'ChatGPT',
    company: 'OpenAI',
    color: '#10b981',
  },
  google: {
    brand: 'Gemini',
    company: 'Google',
    color: '#3b82f6',
  },
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const raw = JSON.parse(readFileSync(PRICING_FILE, 'utf-8'))

/** Round to 2 decimal places; format as "$X.XX". */
function usdPer1M(costPerToken) {
  if (costPerToken == null || costPerToken === 0) return null
  const perMillion = costPerToken * 1_000_000
  return `$${perMillion.toFixed(2)}`
}

const pricingRows = []
const providerModels = {} // provider -> displayName[]

for (const entry of FEATURED_MODELS) {
  const info = raw[entry.id]
  if (!info) {
    console.warn(`⚠  Model "${entry.id}" not found in pricing data — skipping`)
    continue
  }

  const input = usdPer1M(info.input_cost_per_token)
  const output = usdPer1M(info.output_cost_per_token)
  const provMeta = PROVIDERS[entry.provider]

  pricingRows.push({
    model: entry.displayName,
    provider: entry.provider,
    input: input ?? '—',
    output: output ?? '—',
    color: provMeta.color,
  })

  if (!providerModels[entry.provider]) providerModels[entry.provider] = []
  providerModels[entry.provider].push(entry.displayName)
}

// Build provider summary for Products page.
const providers = Object.entries(PROVIDERS).map(([key, meta]) => ({
  key,
  brand: meta.brand,
  company: meta.company,
  color: meta.color,
  models: (providerModels[key] || []).join(' · '),
}))

const catalog = {
  _generated: new Date().toISOString(),
  _source: 'backend/resources/model-pricing/model_prices_and_context_window.json',
  providers,
  pricingRows,
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(catalog, null, 2) + '\n')

console.log(`✓ Generated ${OUT_FILE}`)
console.log(`  ${pricingRows.length} models across ${providers.length} providers`)

#!/usr/bin/env node
/**
 * generate-model-data.mjs
 *
 * Fetches the model catalog from PAIArtCom/model-specs and generates a compact
 * JSON for the frontend marketing pages (Products + Pricing).
 *
 * Data source: https://github.com/PAIArtCom/model-specs
 *   - dist/catalog.json: merged model data (pricing, capabilities, client support)
 *   - clients section: which models each AI client (Claude Code, Codex, Antigravity) supports
 *
 * Only models actively supported by at least one client are shown — no legacy models.
 *
 * Run:  node scripts/generate-model-data.mjs
 * Hook: automatically invoked before build/dev in package.json
 *
 * Output: src/generated/model-catalog.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'src', 'generated')
const OUT_FILE = resolve(OUT_DIR, 'model-catalog.json')
const CACHE_FILE = resolve(OUT_DIR, '.catalog-cache.json')

const CATALOG_URL = 'https://raw.githubusercontent.com/PAIArtCom/model-specs/main/dist/catalog.json'

// ---------------------------------------------------------------------------
// Platform metadata for the Products page cards.
// ---------------------------------------------------------------------------
const PLATFORMS = {
  anthropic: { brand: 'Claude',   company: 'Anthropic',   color: '#ea580c', outputKey: 'anthropic' },
  openai:    { brand: 'ChatGPT',  company: 'OpenAI',      color: '#10b981', outputKey: 'openai' },
  google:    { brand: 'Gemini',   company: 'Google',       color: '#3b82f6', outputKey: 'google' },
  gemini:    { brand: 'Gemini',   company: 'Google',       color: '#3b82f6', outputKey: 'google' },  // alias
}

// Clients we consider as the primary sales channels.
// Models supported by any of these clients are featured on the marketing pages.
const SALES_CLIENTS = ['claude-code', 'codex', 'antigravity']

// Client metadata for the Products page client cards.
const CLIENT_META = {
  'claude-code':  { key: 'claudeCode',  displayName: 'Claude Code',  platform: 'anthropic' },
  'codex':        { key: 'codex',       displayName: 'ChatGPT Codex', platform: 'openai' },
  'antigravity':  { key: 'antigravity', displayName: 'Antigravity',   platform: 'mixed' },
}

// ---------------------------------------------------------------------------
// Fetch catalog
// ---------------------------------------------------------------------------
async function fetchCatalog() {
  try {
    console.log(`  Fetching ${CATALOG_URL} ...`)
    const res = await fetch(CATALOG_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    // Cache locally for offline builds
    mkdirSync(OUT_DIR, { recursive: true })
    writeFileSync(CACHE_FILE, text)
    return JSON.parse(text)
  } catch (err) {
    console.warn(`⚠  Failed to fetch catalog: ${err.message}`)
    if (existsSync(CACHE_FILE)) {
      console.log('  Using cached catalog')
      return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'))
    }
    throw new Error('No catalog available — fetch failed and no cache exists')
  }
}

// ---------------------------------------------------------------------------
// Model display name: convert model IDs to human-friendly names.
// ---------------------------------------------------------------------------

/** Strip date suffixes like -20250514, -20251001 from model IDs. */
function stripDate(id) {
  return id.replace(/-\d{8}$/, '')
}

/**
 * Canonical key for deduplication: models like claude-opus-4-5-20251101
 * and claude-opus-4-5 are the same model (dated version vs alias).
 */
function canonicalKey(id) {
  return stripDate(id)
}

function displayName(id) {
  const clean = stripDate(id)

  // Claude models: claude-opus-4-6 -> Claude Opus 4.6, claude-fable-5 -> Claude Fable 5
  const claude = clean.match(/^claude-(\w+)-(\d+)(?:-(\d+))?$/)
  if (claude) {
    const [, tier, major, minor] = claude
    const name = tier.charAt(0).toUpperCase() + tier.slice(1)
    return minor ? `Claude ${name} ${major}.${minor}` : `Claude ${name} ${major}`
  }

  // GPT with dot version: gpt-5.6-terra -> GPT-5.6 Terra
  const gptDot = clean.match(/^gpt-(\d+\.\d+)(?:-(.+))?$/)
  if (gptDot) {
    const [, ver, suffix] = gptDot
    if (suffix) {
      // Capitalize each word: codex-spark -> Codex Spark
      const label = suffix.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      return `GPT-${ver} ${label}`
    }
    return `GPT-${ver}`
  }

  // GPT base: gpt-5 -> GPT-5, gpt-5-mini -> GPT-5 Mini
  const gptBase = clean.match(/^gpt-(\d+)(?:-(.+))?$/)
  if (gptBase) {
    const [, ver, suffix] = gptBase
    if (suffix) {
      const label = suffix.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      return `GPT-${ver} ${label}`
    }
    return `GPT-${ver}`
  }

  // Open-weight: gpt-oss-120b -> GPT-OSS 120B (skip these in featured)
  if (/^gpt-oss/i.test(clean)) return null

  // o-series: o3 -> o3, o4-mini -> o4-mini
  if (/^o\d/.test(clean)) return clean

  // Gemini: gemini-3.5-flash -> Gemini 3.5 Flash
  const gemini = clean.match(/^gemini-(.+)$/)
  if (gemini) {
    const rest = gemini[1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      // Remove trailing preview/latest/live suffixes for cleaner display
      .replace(/\s+(Preview|Latest|Live\s*Preview?)$/i, '')
    return `Gemini ${rest}`
  }

  // Fallback: title-case
  return clean.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Format cost per token as "$/1M tokens". */
function usdPer1M(costPerToken) {
  if (costPerToken == null || costPerToken === 0) return null
  const perMillion = costPerToken * 1_000_000
  return `$${perMillion.toFixed(2)}`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const catalog = await fetchCatalog()
  const { models, clients } = catalog

  // 1. Collect all model IDs supported by our sales clients.
  const supportedIds = new Set()
  for (const clientName of SALES_CLIENTS) {
    const client = clients[clientName]
    if (!client) {
      console.warn(`⚠  Client "${clientName}" not found in catalog`)
      continue
    }
    for (const id of client.models) supportedIds.add(id)
  }

  console.log(`  ${supportedIds.size} models supported across ${SALES_CLIENTS.length} clients`)

  // 2. Build per-platform model lists and pricing rows.
  //    - Deduplicate dated versions (claude-opus-4-5-20251101 vs claude-opus-4-5)
  //    - Skip models with null displayName (e.g. open-weight gpt-oss-*)
  //    - Only include models with known pricing
  const platformModels = {} // platform -> [{id, name, input, output}]
  const seen = new Set()    // canonical keys already added

  for (const id of supportedIds) {
    const model = models[id]
    if (!model) {
      console.warn(`⚠  Model "${id}" referenced by client but not in catalog — skipping`)
      continue
    }

    const rawPlatform = model.platform || 'unknown'
    const platformMeta = PLATFORMS[rawPlatform]
    if (!platformMeta) continue // skip platforms we don't feature
    const platform = platformMeta.outputKey // normalize gemini -> google

    const name = displayName(id)
    if (!name) continue // skip models displayName returned null for (e.g. gpt-oss-*)

    // Deduplicate: keep only one entry per canonical model
    const key = canonicalKey(id)
    if (seen.has(key)) continue
    seen.add(key)

    const input = usdPer1M(model.input_cost_per_token)
    const output = usdPer1M(model.output_cost_per_token)

    if (!platformModels[platform]) platformModels[platform] = []
    platformModels[platform].push({ id, name, input, output })
  }

  // Sort within each platform: by input cost descending (most capable first).
  for (const list of Object.values(platformModels)) {
    list.sort((a, b) => {
      const aPrice = parseFloat((a.input || '$0').slice(1))
      const bPrice = parseFloat((b.input || '$0').slice(1))
      return bPrice - aPrice
    })
  }

  // 3. Build output structures (skip alias entries like 'gemini').
  const OUTPUT_PLATFORMS = ['anthropic', 'openai', 'google']
  const providers = OUTPUT_PLATFORMS.map(key => {
    const meta = PLATFORMS[key]
    return {
      key,
      brand: meta.brand,
      company: meta.company,
      color: meta.color,
      models: (platformModels[key] || []).map(m => m.name).join(' · '),
    }
  })

  const pricingRows = []
  // Emit pricing rows in platform order.
  for (const platform of OUTPUT_PLATFORMS) {
    const meta = PLATFORMS[platform]
    for (const m of (platformModels[platform] || [])) {
      // Only show models with known pricing
      if (!m.input && !m.output) continue
      pricingRows.push({
        model: m.name,
        provider: platform,
        input: m.input ?? '—',
        output: m.output ?? '—',
        color: meta.color,
      })
    }
  }

  // 4. Build client info for Products page.
  const clientInfo = []
  for (const clientName of SALES_CLIENTS) {
    const client = clients[clientName]
    if (!client) continue
    const meta = CLIENT_META[clientName]
    // Deduplicate and filter client model names
    const clientSeen = new Set()
    const modelNames = client.models
      .map(id => {
        const key = canonicalKey(id)
        if (clientSeen.has(key)) return null
        clientSeen.add(key)
        return displayName(id)
      })
      .filter(Boolean)
      .join(' · ')
    clientInfo.push({
      key: meta.key,
      displayName: meta.displayName,
      platform: meta.platform,
      models: modelNames,
      homepage: client.homepage,
    })
  }

  const output = {
    _generated: new Date().toISOString(),
    _source: 'https://github.com/PAIArtCom/model-specs',
    _version: catalog.version || null,
    providers,
    pricingRows,
    clients: clientInfo,
  }

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_FILE, JSON.stringify(output, null, 2) + '\n')

  console.log(`✓ Generated ${OUT_FILE}`)
  console.log(`  ${pricingRows.length} pricing rows, ${providers.length} providers, ${clientInfo.length} clients`)
}

main().catch(err => {
  console.error(`✖ ${err.message}`)
  process.exit(1)
})

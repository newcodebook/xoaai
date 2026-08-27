export default {
  batchImageGuide: {
    title: 'Batch Image Generation',
    description: 'Submit multiple prompts in one job and download the generated images when complete'
  },
  // Home Page
  home: {
    viewDocs: 'View Documentation',
    docs: 'Docs',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    dashboard: 'Dashboard',
    login: 'Login',
    getStarted: 'Get Started',
    goToDashboard: 'Go to Dashboard',
    // User-focused value proposition
    heroSubtitle: 'All Your AI Services, One Account',
    heroDescription: 'Stop juggling multiple AI subscriptions. Access Claude, ChatGPT, Gemini and more from a single platform',
    tags: {
      subscriptionToApi: 'Unified Access',
      stickySession: 'Always Available',
      realtimeBilling: 'Pay As You Go'
    },
    // Chat preview in hero
    chatPreview: {
      msg1: 'Help me draft a quarterly report summary',
      reply1: 'Based on the data you provided, here is a concise summary of Q3 results...',
      msg2: 'Now translate it to English',
      reply2: 'Here is the English translation of the quarterly summary...',
    },
    // Pain points section
    painPoints: {
      title: 'Sound Familiar?',
      items: {
        expensive: {
          title: 'Too Many AI Bills',
          desc: 'Paying separately for each AI service adds up fast'
        },
        complex: {
          title: 'Too Many Accounts',
          desc: 'Keeping track of logins and passwords across AI platforms'
        },
        unstable: {
          title: 'Unreliable Service',
          desc: 'Interruptions and slowdowns when you need AI the most'
        },
        noControl: {
          title: 'No Spending Visibility',
          desc: "No way to see where the money goes or set limits for your team"
        }
      }
    },
    // Solutions section
    solutions: {
      title: 'We Make It Simple',
      subtitle: 'Three simple steps to stress-free AI access'
    },
    features: {
      unifiedGateway: 'One Place for Everything',
      unifiedGatewayDesc: 'Access all major AI services with a single account. No more switching between platforms.',
      multiAccount: 'Always Reliable',
      multiAccountDesc: 'Smart infrastructure keeps your AI services running smoothly, even during peak hours.',
      balanceQuota: 'Clear, Fair Pricing',
      balanceQuotaDesc: 'Pay only for what you use. Set budgets for team members and see exactly where every dollar goes.'
    },
    // Comparison section
    comparison: {
      title: 'Why Choose XOAAI?',
      headers: {
        feature: '',
        official: 'Official API',
        us: 'XOAAI'
      },
      items: {
        pricing: {
          feature: 'API Pricing',
          official: 'Full price per token',
          us: '60–90% lower than official API rates'
        },
        models: {
          feature: 'AI Access',
          official: 'Separate API key per provider',
          us: 'All providers through one API key'
        },
        management: {
          feature: 'Management',
          official: 'Separate billing and dashboards per provider',
          us: 'One account, one dashboard, one bill'
        },
        stability: {
          feature: 'Reliability',
          official: 'Rate limits on a single API key',
          us: 'Smart routing across multiple keys'
        },
        control: {
          feature: 'Team Control',
          official: 'No per-user budgets or analytics',
          us: 'Per-member budgets and usage reports'
        }
      }
    },
    providers: {
      title: 'AI Services Available',
      description: 'One Platform, Multiple Choices',
      supported: 'Available',
      soon: 'Soon',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: 'More'
    },
    // Nav
    nav: {
      products: 'Products',
      pricing: 'Pricing',
      docs: 'Docs',
      menu: 'Menu',
      help: 'Help',
    },
    // CTA section
    cta: {
      title: 'Ready to Get Started?',
      description: 'Sign up now and get free trial credits to experience all your AI services in one place',
      button: 'Start Free'
    },
    footer: {
      product: 'Product',
      aiServices: 'AI Services',
      pricing: 'Pricing',
      apiStatus: 'API Status',
      support: 'Support',
      documentation: 'Documentation',
      apiUsage: 'API Usage Query',
      contactUs: 'Contact Us',
      legal: 'Legal',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      allRightsReserved: 'All rights reserved.',
      tagline: 'All AI services, one platform.',
      quickStart: 'Quick Start',
    }
  },

  // Products Page
  products: {
    title: 'AI Services',
    subtitle: 'Access all major AI models through one unified platform',
    heroTitle: 'Enterprise-Grade AI Services',
    heroDesc: 'One API key to access Claude, GPT, Gemini, and more. No individual subscriptions needed.',
    modelsTitle: 'Supported Models',
    claude: {
      name: 'Claude',
      provider: 'Anthropic',
      desc: 'Advanced reasoning, coding, and analysis. Latest Claude 4 and Claude 3.5 models.',
      models: 'Claude Opus · Sonnet · Haiku',
    },
    gpt: {
      name: 'ChatGPT',
      provider: 'OpenAI',
      desc: 'Industry-leading conversational AI. GPT-4o, o1, o3, and more.',
      models: 'GPT-4o · o1 · o3 · GPT-4.1',
    },
    gemini: {
      name: 'Gemini',
      provider: 'Google',
      desc: 'Google\'s multimodal AI. Powerful reasoning with Gemini 2.5 Pro.',
      models: 'Gemini 2.5 Pro · Flash',
    },
    antigravity: {
      name: 'Antigravity',
      provider: 'Antigravity',
      desc: 'Access Claude and Gemini models through Antigravity\'s infrastructure.',
      models: 'Claude · Gemini via Antigravity',
    },
    featuresTitle: 'Why Use XOAAI?',
    feature1: {
      title: 'Unified API',
      desc: 'One API format, one key, all providers. OpenAI-compatible and Anthropic-compatible endpoints.',
    },
    feature2: {
      title: 'Smart Routing',
      desc: 'Automatic load balancing across multiple accounts. No more rate limits or downtime.',
    },
    feature3: {
      title: 'Usage Control',
      desc: 'Set budgets per team member. Real-time usage tracking and spending reports.',
    },
    feature4: {
      title: 'Cost Savings',
      desc: '60–90% lower than official API pricing. Pay in RMB, use at USD token rates.',
    },
  },

  // Pricing Page
  pricing: {
    title: 'Pricing',
    subtitle: 'Simple, transparent pricing. Pay in RMB, use at USD rates.',
    heroTitle: 'Simple, Transparent Pricing',
    heroDesc: 'Top up ¥1 RMB and get $1 USD worth of API tokens. Model pricing matches official rates.',
    exchangeTitle: 'How It Works',
    exchangeRate: '¥1 RMB = $1 USD Token Credit',
    exchangeDesc: 'Top up in RMB. Token consumption is billed at the same USD per-token rate as official APIs — but your money goes 7× further.',
    exchangeNote: 'Based on current exchange rate of approximately ¥7.2 = $1 USD',
    modelPricingTitle: 'Model Pricing (per 1M tokens)',
    tableModel: 'Model',
    tableInput: 'Input',
    tableOutput: 'Output',
    tableNote: 'Prices shown in USD per 1M tokens, matching official API rates. Your RMB balance is consumed at these rates.',
    whyCheaperTitle: 'Why Is It Cheaper?',
    whyCheaper1: 'You pay ¥1 RMB for $1 USD of tokens',
    whyCheaper2: 'Real exchange rate is ~¥7.2 per $1 USD',
    whyCheaper3: 'Effectively 60–90% savings vs paying in USD',
    ctaTitle: 'Start Using AI Services Now',
    ctaButton: 'Get Started',
  },

  // Help Page
  help: {
    title: 'Quick Start Guide',
    subtitle: 'Configure your favorite AI tools to use XOAAI in minutes',
    heroTitle: 'Connect Your AI Tools',
    heroDesc: 'XOAAI provides OpenAI-compatible and Anthropic-compatible API endpoints. Configure your existing tools to use XOAAI with just two environment variables.',
    prereqTitle: 'Before You Start',
    prereqStep1: 'Sign up for a XOAAI account',
    prereqStep2: 'Top up your balance (¥1 = $1 token credit)',
    prereqStep3: 'Create an API Key in your dashboard',
    prereqNote: 'Replace {base_url} with your XOAAI instance URL, and {api_key} with your API key.',
    endpointTitle: 'API Endpoints',
    endpointOpenAI: 'OpenAI Compatible',
    endpointOpenAIUrl: '{base_url}/v1',
    endpointOpenAIDesc: 'For GPT models and OpenAI-format clients',
    endpointAnthropic: 'Anthropic Compatible',
    endpointAnthropicUrl: '{base_url}/v1',
    endpointAnthropicDesc: 'For Claude models via Anthropic format',
    endpointAntigravity: 'Antigravity',
    endpointAntigravityUrl: '{base_url}/antigravity',
    endpointAntigravityDesc: 'For Claude/Gemini via Antigravity',
    claudeCode: {
      title: 'Claude Code',
      desc: 'Anthropic\'s official coding assistant CLI',
      step1: 'Set environment variables:',
      env1: 'ANTHROPIC_BASE_URL={base_url}/antigravity',
      env2: 'ANTHROPIC_AUTH_TOKEN={api_key}',
      step2: 'Run Claude Code as normal',
      note: 'Add to your shell profile (~/.zshrc or ~/.bashrc) for persistence.',
    },
    codex: {
      title: 'ChatGPT Codex',
      desc: 'OpenAI\'s coding agent CLI',
      step1: 'Set environment variables:',
      env1: 'OPENAI_BASE_URL={base_url}/v1',
      env2: 'OPENAI_API_KEY={api_key}',
      step2: 'Run Codex as normal',
      note: 'If using Nginx, ensure underscores_in_headers is enabled for sticky sessions.',
    },
    antigravity: {
      title: 'Antigravity',
      desc: 'Access Claude and Gemini via Antigravity routing',
      step1: 'Set environment variables:',
      env1: 'ANTHROPIC_BASE_URL={base_url}/antigravity',
      env2: 'ANTHROPIC_AUTH_TOKEN={api_key}',
      step2: 'Use with any Anthropic-compatible client',
    },
    opencode: {
      title: 'OpenCode',
      desc: 'Terminal-based AI coding assistant',
      step1: 'Set environment variables:',
      env1: 'OPENAI_BASE_URL={base_url}/v1',
      env2: 'OPENAI_API_KEY={api_key}',
      step2: 'Launch OpenCode as normal',
    },
    copyButton: 'Copy',
    copied: 'Copied!',
    needHelp: 'Need Help?',
    needHelpDesc: 'Check the API Usage page to monitor your spending, or contact support.',
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key Usage',
    subtitle: 'Enter your API Key to view real-time spending and usage status',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: 'Query',
    querying: 'Querying...',
    privacyNote: 'Your Key is processed locally in the browser and will not be stored',
    dateRange: 'Date Range:',
    dateRangeToday: 'Today',
    dateRange7d: '7 Days',
    dateRange30d: '30 Days',
    dateRange90d: '90 Days',
    dateRangeCustom: 'Custom',
    apply: 'Apply',
    used: 'Used',
    detailInfo: 'Detail Information',
    tokenStats: 'Token Statistics',
    dailyDetail: 'Daily Detail',
    modelStats: 'Model Usage Statistics',
    // Table headers
    date: 'Date',
    model: 'Model',
    requests: 'Requests',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    cacheCreationTokens: 'Cache Creation',
    cacheReadTokens: 'Cache Read',
    cacheWriteTokens: 'Cache Write',
    totalTokens: 'Total Tokens',
    cost: 'Cost',
    // Status
    quotaMode: 'Key Quota Mode',
    walletBalance: 'Wallet Balance',
    // Ring card titles
    totalQuota: 'Total Quota',
    limit5h: '5-Hour Limit',
    limitDaily: 'Daily Limit',
    limit7d: '7-Day Limit',
    limitWeekly: 'Weekly Limit',
    limitMonthly: 'Monthly Limit',
    // Detail rows
    remainingQuota: 'Remaining Quota',
    expiresAt: 'Expires At',
    todayExpires: '(expires today)',
    daysLeft: '({days} days)',
    usedQuota: 'Used Quota',
    resetNow: 'Resetting soon',
    subscriptionType: 'Subscription Type',
    subscriptionExpires: 'Subscription Expires',
    // Usage stat cells
    todayRequests: 'Today Requests',
    todayInputTokens: 'Today Input',
    todayOutputTokens: 'Today Output',
    todayTokens: 'Today Tokens',
    todayCacheCreation: 'Today Cache Creation',
    todayCacheRead: 'Today Cache Read',
    todayCost: 'Today Cost',
    rpmTpm: 'RPM / TPM',
    totalRequests: 'Total Requests',
    totalInputTokens: 'Total Input',
    totalOutputTokens: 'Total Output',
    totalTokensLabel: 'Total Tokens',
    totalCacheCreation: 'Total Cache Creation',
    totalCacheRead: 'Total Cache Read',
    totalCost: 'Total Cost',
    avgDuration: 'Avg Duration',
    // Messages
    enterApiKey: 'Please enter an API Key',
    querySuccess: 'Query successful',
    queryFailed: 'Query failed',
    queryFailedRetry: 'Query failed, please try again later',
    noDailyUsage: 'No daily usage data',
  },

  // Setup Wizard
  setup: {
    title: 'XOAAI Setup',
    description: 'Configure your XOAAI instance',
    database: {
      title: 'Database Configuration',
      description: 'Connect to your PostgreSQL database',
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      databaseName: 'Database Name',
      sslMode: 'SSL Mode',
      passwordPlaceholder: 'Password',
      ssl: {
        disable: 'Disable',
        require: 'Require',
        verifyCa: 'Verify CA',
        verifyFull: 'Verify Full'
      }
    },
    redis: {
      title: 'Redis Configuration',
      description: 'Connect to your Redis server',
      host: 'Host',
      port: 'Port',
      username: 'Username (optional)',
      password: 'Password (optional)',
      database: 'Database',
      usernamePlaceholder: 'Leave empty for default user',
      passwordPlaceholder: 'Password',
      enableTls: 'Enable TLS',
      enableTlsHint: 'Use TLS when connecting to Redis (public CA certs)'
    },
    admin: {
      title: 'Admin Account',
      description: 'Create your administrator account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      passwordPlaceholder: 'Min 8 characters',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordMismatch: 'Passwords do not match'
    },
    ready: {
      title: 'Ready to Install',
      description: 'Review your configuration and complete setup',
      database: 'Database',
      redis: 'Redis',
      adminEmail: 'Admin Email'
    },
    status: {
      testing: 'Testing...',
      success: 'Connection Successful',
      testConnection: 'Test Connection',
      installing: 'Installing...',
      completeInstallation: 'Complete Installation',
      completed: 'Installation completed!',
      redirecting: 'Redirecting to login page...',
      restarting: 'Service is restarting, please wait...',
      timeout: 'Service restart is taking longer than expected. Please refresh the page manually.'
    }
  },

  // Common
}

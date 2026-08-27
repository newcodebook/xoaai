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
    }
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

export default {
  batchImageGuide: {
    title: '图片批量生成',
    description: '一次提交多条提示词，任务完成后可统一下载图片结果'
  },
  // Home Page
  home: {
    viewDocs: '查看文档',
    docs: '文档',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    dashboard: '控制台',
    login: '登录',
    getStarted: '立即开始',
    goToDashboard: '进入控制台',
    // 面向用户的价值主张
    heroSubtitle: '所有 AI 服务，一个账号搞定',
    heroDescription: '不再为每个 AI 工具单独付费和管理账号，一站式使用 Claude、ChatGPT、Gemini 等主流 AI 服务',
    tags: {
      subscriptionToApi: '统一使用',
      stickySession: '稳定可靠',
      realtimeBilling: '按量付费'
    },
    // Hero 区域对话预览
    chatPreview: {
      msg1: '帮我写一份季度报告摘要',
      reply1: '根据您提供的数据，以下是第三季度业绩摘要...',
      msg2: '翻译成英文',
      reply2: '以下是季度摘要的英文翻译...',
    },
    // 用户痛点区块
    painPoints: {
      title: '这些问题你是否也遇到过？',
      items: {
        expensive: {
          title: 'AI 账单太多',
          desc: '每个 AI 工具都要单独付费，费用加起来越来越多'
        },
        complex: {
          title: '账号太多太乱',
          desc: '不同 AI 平台的账号密码散落各处，管理起来很头疼'
        },
        unstable: {
          title: '服务时好时坏',
          desc: '正需要用 AI 的时候偏偏卡顿或者用不了'
        },
        noControl: {
          title: '花了多少看不清',
          desc: '不知道团队在 AI 上花了多少钱，也没法设限额'
        }
      }
    },
    // 解决方案区块
    solutions: {
      title: '我们让一切变简单',
      subtitle: '简单三步，轻松使用 AI'
    },
    features: {
      unifiedGateway: '一站式使用',
      unifiedGatewayDesc: '一个账号即可使用所有主流 AI 服务，无需在不同平台之间来回切换。',
      multiAccount: '稳定可靠',
      multiAccountDesc: '智能调度确保服务始终流畅运行，即使在高峰时段也不受影响。',
      balanceQuota: '费用清晰透明',
      balanceQuotaDesc: '用多少付多少，支持为团队成员设置预算，每一笔消费一目了然。'
    },
    // 优势对比
    comparison: {
      title: '为什么选择 XOAAI？',
      headers: {
        feature: '',
        official: '官方 API',
        us: 'XOAAI'
      },
      items: {
        pricing: {
          feature: 'API 价格',
          official: '按 Token 原价计费',
          us: '比官方 API 价格低 60–90%'
        },
        models: {
          feature: 'AI 接入',
          official: '每家供应商单独申请 API Key',
          us: '一个 API Key 接入所有供应商'
        },
        management: {
          feature: '管理',
          official: '每家供应商分别管理账单和后台',
          us: '一个账号、一个后台、一张账单'
        },
        stability: {
          feature: '稳定性',
          official: '单 API Key 容易被限速',
          us: '智能路由分流，多 Key 负载均衡'
        },
        control: {
          feature: '团队管控',
          official: '无法按人设预算或看报表',
          us: '按成员设预算，用量报表一目了然'
        }
      }
    },
    providers: {
      title: '可用的 AI 服务',
      description: '一个平台，多种选择',
      supported: '已支持',
      soon: '即将推出',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: '更多'
    },
    // 导航
    nav: {
      products: '产品',
      pricing: '价格',
      docs: '文档',
      menu: '菜单',
    },
    // CTA 区块
    cta: {
      title: '准备好开始了吗？',
      description: '注册即可获得免费体验额度，一站式使用所有 AI 服务',
      button: '免费开始'
    },
    footer: {
      product: '产品',
      aiServices: 'AI 服务',
      pricing: '价格方案',
      apiStatus: 'API 状态',
      support: '支持',
      documentation: '帮助文档',
      apiUsage: 'API 用量查询',
      contactUs: '联系我们',
      legal: '法律',
      termsOfService: '服务条款',
      privacyPolicy: '隐私政策',
      allRightsReserved: '保留所有权利。',
      tagline: '所有 AI 服务，一个平台。',
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key 用量查询',
    subtitle: '输入您的 API Key 以查看实时消费金额与使用状态',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: '查询',
    querying: '查询中...',
    privacyNote: '您的 Key 仅在浏览器本地处理，不会被存储',
    dateRange: '统计范围:',
    dateRangeToday: '今日',
    dateRange7d: '7 天',
    dateRange30d: '30 天',
    dateRange90d: '90 天',
    dateRangeCustom: '自定义',
    apply: '应用',
    used: '已使用',
    detailInfo: '详细信息',
    tokenStats: 'Token 统计',
    dailyDetail: '按日明细',
    modelStats: '模型用量统计',
    // Table headers
    date: '日期',
    model: '模型',
    requests: '请求数',
    inputTokens: '输入 Tokens',
    outputTokens: '输出 Tokens',
    cacheCreationTokens: '缓存创建',
    cacheReadTokens: '缓存读取',
    cacheWriteTokens: '缓存写入',
    totalTokens: '总 Tokens',
    cost: '费用',
    // Status
    quotaMode: 'Key 限额模式',
    walletBalance: '钱包余额',
    // Ring card titles
    totalQuota: '总额度',
    limit5h: '5 小时限额',
    limitDaily: '日限额',
    limit7d: '7 天限额',
    limitWeekly: '周限额',
    limitMonthly: '月限额',
    // Detail rows
    remainingQuota: '剩余额度',
    expiresAt: '过期时间',
    todayExpires: '(今日到期)',
    daysLeft: '({days} 天)',
    usedQuota: '已用额度',
    resetNow: '即将重置',
    subscriptionType: '订阅类型',
    subscriptionExpires: '订阅到期',
    // Usage stat cells
    todayRequests: '今日请求',
    todayInputTokens: '今日输入',
    todayOutputTokens: '今日输出',
    todayTokens: '今日 Tokens',
    todayCacheCreation: '今日缓存创建',
    todayCacheRead: '今日缓存读取',
    todayCost: '今日费用',
    rpmTpm: 'RPM / TPM',
    totalRequests: '累计请求',
    totalInputTokens: '累计输入',
    totalOutputTokens: '累计输出',
    totalTokensLabel: '累计 Tokens',
    totalCacheCreation: '累计缓存创建',
    totalCacheRead: '累计缓存读取',
    totalCost: '累计费用',
    avgDuration: '平均耗时',
    // Messages
    enterApiKey: '请输入 API Key',
    querySuccess: '查询成功',
    queryFailed: '查询失败',
    queryFailedRetry: '查询失败，请稍后重试',
    noDailyUsage: '暂无按日用量数据',
  },

  // Setup Wizard
  setup: {
    title: 'XOAAI 安装向导',
    description: '配置您的 XOAAI 实例',
    database: {
      title: '数据库配置',
      description: '连接到您的 PostgreSQL 数据库',
      host: '主机',
      port: '端口',
      username: '用户名',
      password: '密码',
      databaseName: '数据库名称',
      sslMode: 'SSL 模式',
      passwordPlaceholder: '密码',
      ssl: {
        disable: '禁用',
        require: '要求',
        verifyCa: '验证 CA',
        verifyFull: '完全验证'
      }
    },
    redis: {
      title: 'Redis 配置',
      description: '连接到您的 Redis 服务器',
      host: '主机',
      port: '端口',
      username: '用户名（可选）',
      password: '密码（可选）',
      database: '数据库',
      usernamePlaceholder: '默认用户留空',
      passwordPlaceholder: '密码',
      enableTls: '启用 TLS',
      enableTlsHint: '连接 Redis 时使用 TLS（公共 CA 证书）'
    },
    admin: {
      title: '管理员账户',
      description: '创建您的管理员账户',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '至少 8 个字符',
      confirmPasswordPlaceholder: '确认密码',
      passwordMismatch: '密码不匹配'
    },
    ready: {
      title: '准备安装',
      description: '检查您的配置并完成安装',
      database: '数据库',
      redis: 'Redis',
      adminEmail: '管理员邮箱'
    },
    status: {
      testing: '测试中...',
      success: '连接成功',
      testConnection: '测试连接',
      installing: '安装中...',
      completeInstallation: '完成安装',
      completed: '安装完成！',
      redirecting: '正在跳转到登录页面...',
      restarting: '服务正在重启，请稍候...',
      timeout: '服务重启时间超出预期，请手动刷新页面。'
    }
  },

  // Common
}

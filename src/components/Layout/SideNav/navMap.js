// First level navigation(top) for admin, isv and developer
export const getNavs = {
  global_admin: [
    {
      link: '/dashboard',
      iconName: 'dashboard',
      active: 'dashboard',
      title: 'My dashboard'
    },
    {
      link: '/dashboard/apps',
      iconName: 'components',
      active: 'app',
      title: 'App Store'
    },
    {
      link: '/dashboard/providers',
      iconName: 'shield',
      active: 'provider',
      title: 'App service provider'
    },
    {
      link: '#',
      iconName: 'ticket',
      active: '',
      title: 'Work list'
    },
    {
      link: '#',
      iconName: 'wallet',
      active: '',
      title: 'Financial Center'
    },
    {
      link: '#',
      iconName: 'linechart',
      active: '',
      title: 'Message and monitoring'
    },
    {
      link: '/dashboard/users',
      iconName: 'group',
      active: 'user',
      title: 'Users'
    },
    {
      link: '#',
      iconName: 'cogwheel',
      active: '',
      title: 'Settings'
    }
  ],
  isv: [
    {
      link: '/dashboard/apps',
      iconName: 'appcenter',
      active: 'app',
      title: 'App Manage'
    },
    {
      link: '#',
      iconName: 'wrench',
      active: 'develop',
      title: 'App Develop'
    },
    {
      link: '#',
      iconName: 'ticket',
      active: '',
      title: 'Work list'
    },
    {
      link: '#',
      iconName: 'linechart',
      active: '',
      title: 'Operation Center'
    },
    {
      link: '#',
      iconName: 'wallet',
      active: '',
      title: 'Financial Center'
    },
    {
      link: '#',
      iconName: 'group',
      active: 'user',
      title: 'Team Members'
    },
    {
      link: '#',
      iconName: 'shield',
      active: '',
      title: '服务商详情'
    }
  ],
  developer: [
    {
      link: '/dashboard/app/create',
      iconName: 'plus-square',
      active: 'create',
      title: 'Create app'
    },
    {
      link: '/dashboard/my/apps',
      iconName: 'more',
      active: 'app',
      title: 'View all'
    }
  ]
};

// First level navigation(bottom) for all roles
export const getBottomNavs = [
  /* {
    link: '#',
    iconName: 'magnifier',
    active: '',
    title: 'Global search'
  },
  {
    link: '#',
    iconName: 'bell',
    active: '',
    title: 'Alarms'
  }, */
  {
    link: '#',
    iconName: 'mail',
    active: '',
    title: 'My news'
  },
  {
    link: '/profile',
    iconName: 'human',
    active: 'profile',
    title: 'My account'
  }
];

// Secondary navigation for admin and isv
export const subNavMap = {
  global_admin: {
    dashboard: {
      title: 'Dashboard',
      links: [{ name: 'Overview', link: '/dashboard', active: 'dashboard' }]
    },
    app: {
      title: 'App Store',
      links: [
        { name: 'All Apps', link: '/dashboard/apps', active: '/apps' },
        {
          name: 'App Reviews',
          link: '/dashboard/app-reviews',
          active: 'review'
        },
        {
          name: 'Categroies',
          link: '/dashboard/categories',
          active: 'categor'
        },
        {
          name: 'Appearance',
          link: '#',
          active: 'appearance',
          isDisabled: true
        }
      ]
    },
    provider: {
      title: 'App service provider',
      links: [
        {
          name: '全部服务商',
          link: '/dashboard/providers',
          active: 'provider'
        },
        {
          name: '入驻申请',
          link: '/dashboard/applications',
          active: 'applications'
        },
        {
          name: '合约',
          link: '#',
          active: '#',
          isDisabled: true
        },
        {
          name: '保证金',
          link: '#',
          active: '#',
          isDisabled: true
        }
      ]
    },
    user: {
      title: 'Users and Permission',
      links: [
        { name: 'All Users', link: '/dashboard/users', active: 'user' },
        { name: 'Roles', link: '#', active: 'role' },
        { name: 'Permission and Policy', link: '#', active: 'policy' }
      ]
    }
  },
  isv: {
    app: {
      title: 'App Manage',
      links: [
        { name: 'All Apps', link: '/dashboard/apps', active: '/apps' },
        {
          name: 'App Reviews',
          link: '/dashboard/app-reviews',
          active: 'review'
        }
      ]
    }
  }
};

// Secondary navigation for developer
export const getDevSubNavs = appId => [
  {
    title: 'Development',
    items: [
      {
        name: 'Version',
        link: `/dashboard/app/${appId}/versions`
      },
      { name: 'App information', link: `/dashboard/app/${appId}/info` },
      { name: 'Record', link: `/dashboard/app/${appId}/audits` }
    ]
  },
  {
    title: 'Operation and maintenance',
    items: [
      { name: 'Monitor', link: '#' },
      { name: 'Event', link: '#' },
      { name: 'App information', link: '#' }
    ]
  },
  {
    title: 'Customer',
    items: [
      { name: 'Instance', link: `/dashboard/app/${appId}/customer-instances` },
      { name: 'Work list', link: '#' },
      { name: 'News', link: '#' }
    ]
  },
  {
    title: 'Sandbox',
    items: [
      { name: 'Instance', link: `/dashboard/app/${appId}/sandbox-instances` },
      { name: 'Environment', link: '#' }
    ]
  }
];

// User menus layer for all roles
export const userMenus = [
  {
    name: 'Account Info',
    link: '/dashboard/account',
    iconName: 'folder'
  },
  {
    name: 'Change Password',
    link: '/dashboard/account?type=Change Password',
    iconName: 'lock'
  },
  {
    name: 'Notice settings',
    link: '#',
    iconName: 'loudspeaker'
  },
  {
    name: 'Payment',
    link: '#',
    iconName: 'creditcard',
    divider: true // show divide line
  },
  {
    name: 'Testing env',
    link: '/:dash/testing-runtime',
    iconName: 'image',
    only: ['global_admin', 'developer']
  },
  {
    name: 'SSH Keys',
    link: '/dashboard/account?type=SSH Keys',
    iconName: 'ssh',
    divider: true
  }
];

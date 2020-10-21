/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const providerRouter = {
  path: '/provider',
  component: Layout,
  meta: {
    icon: 'money'
  },
  children: [
    {
      path: 'provider',
      name: 'ProviderSummary',
      component: () => import('@/views/provider/index'),
      meta: { title: 'ProviderSummary' }
    }
  ]
}

export default providerRouter
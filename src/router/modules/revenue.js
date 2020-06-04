/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const revenueRouter = {
  path: '/revenue',
  component: Layout,
  meta: {
    icon: 'money'
  },
  children: [
    {
      path: 'revenue',
      name: 'Revenue',
      component: () => import('@/views/revenue/index'),
      meta: { title: 'Revenue' }
    }
  ]
}

export default revenueRouter
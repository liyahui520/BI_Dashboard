/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const biRouter = {
  path: '/bi',
  component: Layout,
  redirect: '/bi/drugs',
  name: 'bi',
  meta: {
    title: 'bi',
    icon: 'nested'
  },
  children: [
    {
      path: 'test',
      name: 'test',
      component: () => import('@/views/biboard/test'),
      meta: { title: 'test' }
    }
  ]
}

export default biRouter

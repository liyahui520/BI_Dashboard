/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const caseRouter = {
  path: '/case',
  component: Layout,
  meta: {
    icon: 'clipboard'
  },
  children: [
    {
      path: 'case',
      name: 'Case',
      component: () => import('@/views/case/index'),
      meta: { title: 'Case' }
    }
  ]
}

export default caseRouter
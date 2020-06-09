/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const echartRouter = {
  path: '/testeachart',
  component: Layout,
  meta: {
    icon: 'money'
  },
  children: [
    {
      path: 'testeachart',
      name: 'Testeachart',
      component: () => import('@/views/testeachart/index'),
      meta: { title: 'Testeachart' }
    }
  ]
}

export default echartRouter
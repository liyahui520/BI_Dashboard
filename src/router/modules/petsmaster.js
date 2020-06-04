/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const petsMasterRouter = {
  path: '/petsmaster',
  component: Layout,
  meta: {
    icon: 'user'
  },
  children: [
    {
      path: 'petsmaster',
      // name: 'Petsmaster',
      component: () => import('@/views/petsmaster/index'),
      meta: { title: 'Petsmaster' }
    }
  ]
}

export default petsMasterRouter

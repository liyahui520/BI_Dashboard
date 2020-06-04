/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const petsRouter = {
  path: '/pets',
  component: Layout,
  // redirect: '/pets',
  meta: {
    icon: 'nested'
  },
  children: [
    {
      path: 'pets',
      name: 'Pets',
      component: () => import('@/views/pets/index'),
      meta: { title: 'Pets' }
    }
  ]
}

export default petsRouter

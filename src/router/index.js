import Vue from 'vue'
import Router from 'vue-router'
import Fund from '@/page/fund'
import NF from '@/page/nf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nf',
      component: NF
    },
    {
      path: '/solomonwu',
      name: 'Fund',
      component: Fund
    }
  ]
})

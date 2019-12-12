import Vue from 'vue'
import Router from 'vue-router'
import Fund from '@/page/fund'
import NF from '@/page/nf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/nf',
      name: 'nf',
      component: NF
    },
    {
      path: '/',
      name: 'Fund',
      component: Fund
    }
  ]
})

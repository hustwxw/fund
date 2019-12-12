import Vue from 'vue'
import Router from 'vue-router'
import Fund from '@/page/fund'
import NF from '@/page/nf'

Vue.use(Router)

const r = {
  routes: [
    {
      path: '/',
      name: 'nf',
      component: NF
    }
  ]
}

if (window.ISLOCALHOST) {
  r.routes.push({
    path: '/fund',
    name: 'Fund',
    component: Fund
  })
}

export default new Router(r)

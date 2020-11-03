import Vue from 'vue'
import Router from 'vue-router'
import json from './src/pages.json'

const pagesJSON = require('./src/pages.json')

Vue.use(Router)

console.log('json', pagesJSON, json)

export function createRouter() {
  return new Router({
    routes: [
      {
        path: '/top',
        component: () => import('./src/pages/index/index.vue')
      },
      { path: '/', redirect: '/top' }
    ]
  })
}

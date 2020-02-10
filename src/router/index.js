import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld2 from '@/components/HelloWorld2'
import Login from '@/components/Login'
import Main from '@/components/Main'
import portrait from '@/components/portrait'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
		{
		  path: '/HelloWorld2/:id',
		  name: 'HelloWorld2',
		  component: HelloWorld2
		},
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/Touxiang',
      name: 'Touxiang',
      component: resolve => require(['../pages/touxiang.vue'], resolve),
    },
    {
      path: '/portrait',
      name: 'portrait',
      component: portrait
    }
  ]
})

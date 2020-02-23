import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld2 from '@/components/HelloWorld2'
import Login from '@/components/Login'
import Main from '@/components/Main'
import portrait from '@/components/portrait'
import hainan from '@/components/hainan'
import HeadNav from '@/components/HeadNav'

import bloglist from '@/components/bloglist'
import touxiang from '@/components/touxiang'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
		{
		  path: '/HelloWorld2',
		  name: 'HelloWorld2',
		  component: HelloWorld2
		},
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/Touxiang',
      name: 'Touxiang',
      component: touxiang
    },
    {
      path: '/portrait',
      name: 'portrait',
      component: portrait
    },
    {
      path: '/',
      name: 'Blog',
      component: resolve => require(['../pages/Blog.vue'], resolve),
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Hainan',
      name: 'Hainan',
      component: resolve => require(['../pages/Hainan.vue'], resolve),
    },
    {
      path: '/BlogEditor',
      name: 'BlogEditor',
      component: resolve => require(['../pages/BlogEditor.vue'], resolve),
    },
    {
      path: '/DetailedBlog',
      name: 'DetailedBlog',
      component: resolve => require(['../pages/DetailedBlog.vue'], resolve),
    }
  ]
})

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/starred',
    name: 'Starred',
    component: () => import(/* webpackChunkName: "starred" */ '../views/Starred.vue')
  },
  {
    path: '/word/:word',
    name: 'Word',
    component: () => import(/* webpackChunkName: "starred" */ '../views/Word.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import MenuList from '../views/MenuList.vue'
import MenuForm from '../views/MenuForm.vue'
import Orders from '../views/Orders.vue'
import NewOrder from '../views/NewOrder.vue'
import OrderDetails from '../views/OrderDetails.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/menu', name: 'menu', component: MenuList },
  { path: '/menu/new', name: 'menu-new', component: MenuForm },
  { path: '/menu/:id/edit', name: 'menu-edit', component: MenuForm },
  { path: '/orders', name: 'orders', component: Orders },
  { path: '/orders/new', name: 'order-new', component: NewOrder },
  { path: '/orders/:id', name: 'order-details', component: OrderDetails },
]
export default createRouter({ history: createWebHistory(), routes })

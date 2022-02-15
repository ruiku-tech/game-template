import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    
  ]
})
router.afterEach((to,from)=>{
  router.fromRouter = from
})
router.replaceBack=function(){
  if(!router.fromRouter) return
  router.replace(router.fromRouter)
}
export default router
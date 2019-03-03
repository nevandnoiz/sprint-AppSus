import myRoutes from './routes.js';

const myRouter = new VueRouter({routes: myRoutes})

export const eventBus = new Vue() 

Vue.config.debug = true; Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    router: myRouter,
    data: {
    }
})

// import booksHeader from './cmps/books-header-cmp.js';

import myRoutes from './routes.js';
import navBar from './cmps/nav-bar.js';

const myRouter = new VueRouter({routes: myRoutes})

export const eventBus = new Vue() 

Vue.config.debug = true; Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    components: {
        navBar
    },
    router: myRouter,
    data: {
    }
})
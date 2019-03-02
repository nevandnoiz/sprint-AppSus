
// import booksHeader from './cmps/books-header-cmp.js';

import myRoutes from './routes.js';

const myRouter = new VueRouter({routes: myRoutes})
Vue.config.debug = true; Vue.config.devtools = true;
var app = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        
    },
    data: {
    }
})
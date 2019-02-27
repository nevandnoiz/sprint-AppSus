
// import booksHeader from './cmps/books-header-cmp.js';

import myRoutes from './routes.js';

const myRouter = new VueRouter({routes: myRoutes})

var app = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        
    },
    data: {
    }
})
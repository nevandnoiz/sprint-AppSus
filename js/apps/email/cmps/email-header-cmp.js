export default {
    props: [''],
    template: `
      <header>
            <div class="title">
                <router-link to="/" exact>
                    <h1>Ms. Books</h1>
                </router-link>
            </div>
            <router-link class="header-logo" to="/" exact><img src="./img/logo.png" alt=""></router-link>
        </header>
    `,
    data() {
        return {
    
        }
    },
    methods: {
 
    },
    created() {

    },
    computed: {

    }
}
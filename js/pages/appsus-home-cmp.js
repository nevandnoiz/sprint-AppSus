import navBar from '../cmps/nav-bar.js';

export default {
    template: `   
    <div class="home-page" ref=home>
        
        <nav-bar></nav-bar>

        <button class="change-background" @click="changeBcg">change background</button>
    </div>
`,
    data() {
        return {
            nextImg: 2
        }
    },
    methods: {
        changeBcg(){
            const home =this.$refs.home
            home.style.backgroundImage = `url('/img/${this.nextImg}.jpg')`
            if (this.nextImg === 9)  this.nextImg = 0
            this.nextImg++
        }
    
    },
    components: {
        navBar
    },
    computed: {

    },
    created() {

    }
}
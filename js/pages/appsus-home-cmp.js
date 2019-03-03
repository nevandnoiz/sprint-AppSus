import navBar from '../cmps/nav-bar.js';
import homeService from '../services/home-service.js';

export default {
    template: `   
    <div class="home-page" ref=home>
        
        <nav-bar></nav-bar>
    <div class="change-background">
        <button class="change-background-btn" @click="switchBackground('left')"><i class="fas fa-arrow-left"></i></button>
        <button class="change-background-btn" @click="switchBackground('right')"><i class="fas fa-arrow-right"></i></button>
    </div>
        
    </div>
`,
    data() {
        return {
            currBackground: null
        }
    },
    methods: {
        switchBackground(direction) {
            if (direction === 'right') {
                this.currBackground++
                if (this.currBackground === 9) this.currBackground = 1
            }
            else if (direction === 'left') {
                this.currBackground--
                if (this.currBackground === 0) this.currBackground = 9
            }
            this.setBackground()
            this.saveCurrBackground();
        },
        setBackground() {
            const home = this.$refs.home
            home.style.backgroundImage = `url('./img/${this.currBackground}.jpg')`
        },
        saveCurrBackground() {
            homeService.setBackground(this.currBackground)
        }
    },
    components: {
        navBar
    },
    computed: {

    },
    created() {
        homeService.getBackground()
            .then(background => this.currBackground = background)
            .then(() => this.setBackground())
    },
}
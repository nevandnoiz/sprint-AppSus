export default {
    name: 'nav-bar',
    template: `
        <div class="nav-bar">
            <ul>
                <router-link exact to="/">HOME</router-link>
            </ul>
            <ul>
                <router-link exact to="/notes">NOTES</router-link>
            </ul>
            <ul>
                <router-link exact to="/email">EMAIL</router-link>
            </ul>
        </div>

        `,
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {
    },
    beforeDestroy() {
    }

}
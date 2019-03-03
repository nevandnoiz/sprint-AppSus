export default {
    props: [],
    template: `   
        <div class="search">
            <input type="text" v-model:value="searchInput" placeholder="search">
        </div>
        `
    ,
    data() {
        return {
            searchInput: ''
        }
    },
    methods: {
    },
    computed: {
    },
    watch: {
        searchInput: function (val) {
            this.$emit('search', val)
        }
    }
}

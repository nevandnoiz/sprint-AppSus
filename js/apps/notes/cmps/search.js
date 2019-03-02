export default {
    props: [],
    template: `   
        <div class="search">
            <input type="text" v-model:value="searchInput" placeholder="search">
            <!-- <select>
                <option value="">Title</option>
                <option value="">Body</option>
            </select> -->
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
            this.$emit('test', val)
        }
    }
}

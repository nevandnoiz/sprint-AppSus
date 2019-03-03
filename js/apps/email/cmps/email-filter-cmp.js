export default {
    props: [''],
    template: `
    <div class="email-filter">
    <i class="fas fa-search"></i>
    <input type="" placeholder="Search mail" @keyup.enter="$emit('filtered',{...filterBy})" v-model="filterBy.byName"/> 
        <select @change="$emit('filtered',{...filterBy})" v-model="filterBy.selectedFilter" name="" id="">
            <option value="All">All</option>
            <option value="Read">Read</option>
            <option value="Unread">Unread</option>
        </select>
    </div>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                selectedFilter : 'All',
            },
        }
    },
    methods: {

    },
    created() {

    },
    computed: {

    },
}
export default {
    props: [''],
    template: `
    <div class="email-filter">
      <div v-if="!isMobileFilterClicked" class="mobile-filter-btn"><i @click="isMobileFilterClicked=!isMobileFilterClicked" 
      class="fas fa-search"></i></div>   
      <div class="filter-controls desktop">
            <i class="fas fa-search"></i>
            <input type="" placeholder="Search mail" @keyup.enter="$emit('filtered',{...filterBy})" 
            v-model="filterBy.byName"/> 
            <select @change="$emit('filtered',{...filterBy})" v-model="filterBy.selectedFilter" name="" id="">
                <option value="All">All</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
            </select>
        </div>
        <div v-if="isMobileFilterClicked" class="filter-controls mobile">
                <i @click="isMobileFilterClicked=!isMobileFilterClicked" class="fas fa-search"></i>
            <input type="" placeholder="Search mail" @keyup.enter="$emit('filtered',{...filterBy})" 
            v-model="filterBy.byName"/> 
                <select @change="$emit('filtered',{...filterBy})" v-model="filterBy.selectedFilter" name="" id="">
                    <option value="All">All</option>
                    <option value="Read">Read</option>
                    <option value="Unread">Unread</option>
                </select>
        </div>
    </div>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                selectedFilter : 'All',
            },
            isMobileFilterClicked:false
        }
    },
    methods: {

    },
    created() {

    },
    computed: {

    },
}
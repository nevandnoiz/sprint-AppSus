import { eventBus } from '../../../main.js ';
import emailFilter from '../cmps/email-filter-cmp.js';

export default {
    props: ['email', 'currList'],
    components: {
        emailFilter
    },
    template: `
    <div class="email-nav">
        <div class="desktop-nav">
            <div class="nav-routes">
            <router-link exact to="/">HOME</router-link>
            <router-link exact to="/notes">NOTES</router-link>
            </div>
            <email-filter @filtered="emitFilter"></email-filter>
        </div>
        <div class="mobile-nav">
            <email-filter @filtered="emitFilter"></email-filter>
            <button>&#9776;</button>
        </div>
    </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        goBack() {
            this.$router.push(`/email/${this.currList}`)
        },
        emitFilter(filterBy) {
            this.$emit('filtered', filterBy)
        },
        emitReply() {
            eventBus.$emit('reply', this.email)
        },
        emitToggleSidebar() {
            eventBus.$emit('toggleSidebar')
        },
    },

    created() {

    },
    computed: {
        isInbox() {
            if (this.currList === 'inbox') return true
        },
        isSent() {
            if (this.currList === 'sent') return true
        },
        isDeleted() {
            if (this.currList === 'deleted') return true
        },
        isDetails() {
            return this.$router.currentRoute.path.includes(this.email.id)
        }
    }
}
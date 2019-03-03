
export default {
    props: ['unreadEmails', 'totalEmails'],
    template: `
    <div class="email-lists-section">
        <div class="side-bar-link">
            <i class="fas fa-inbox"></i> 
            <router-link @click.native="$emit('changeList','inbox')" :to="'/email/inbox'">
            Inbox <span v-if="unreadStatus">({{unreadEmails}})</span>
            </router-link>
        </div>
        <div class="side-bar-link">
            <i class="fas fa-share-square"></i> 
            <router-link @click.native="$emit('changeList','sent')" :to="'/email/sent'"">
            Sent
            </router-link>
        </div>
        <div class="side-bar-link">
            <i class="fas fa-trash-alt"></i>
            <router-link @click.native="$emit('changeList','deleted')" :to="'/email/deleted'">
            Deleted
            </router-link>
        </div>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {
    },
    computed: {
        unreadStatus() {
            if (this.unreadEmails > 0) return true
            else return false
        }
    },
    created() {

    }
}
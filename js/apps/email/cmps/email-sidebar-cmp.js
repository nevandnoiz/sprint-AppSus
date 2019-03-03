
export default {
    props: ['unreadEmails', 'totalEmails'],
    template: `
    <div class="email-lists-section">
    <router-link @click.native="$emit('changeList','inbox')" :to="'/email/inbox'">
         <i class="fas fa-inbox"></i> 
         Inbox <span v-if="unreadStatus">({{unreadEmails}})</span>
        </router-link>
        <router-link @click.native="$emit('changeList','sent')" :to="'/email/sent'"">
        <i class="fas fa-share-square"></i> 
          Sent
        </router-link>
        <router-link @click.native="$emit('changeList','deleted')" :to="'/email/deleted'">
        <i class="fas fa-trash-alt"></i> Deleted
        </router-link>
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
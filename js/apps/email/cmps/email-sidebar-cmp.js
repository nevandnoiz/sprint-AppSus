
export default {
    props: ['unreadEmails', 'totalEmails'],
    template: `
    <div class="email-list-section">
    <router-link @click.native="$emit('changeList','inbox')" :to="'/email/inbox'">
         Inbox <span v-if="unreadStatus">({{unreadEmails}})</span>
        </router-link>
        <router-link @click.native="$emit('changeList','sent')" :to="'/email/sent'"">
          Sent
        </router-link>
        <router-link :to="'/email/inbox'">
        Deleted
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
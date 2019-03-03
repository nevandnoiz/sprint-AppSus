import { eventBus } from '../../../main.js ';

export default {
    props: ['email', 'currList'],
    template: `
        <div class="preview-controls-email">
            <i v-if="isDetails" title="Return" @click="goBack" class="fas fa-arrow-left"></i>
            <i v-if="email.isRead && !isSent && !isDeleted" title="Unread" @click="$emit('toggleRead',email.id)" 
            class="fas fa-envelope-open-text"></i>
            <i v-else-if="!email.isRead && !isSent" title="Read" @click="$emit('toggleRead',email.id)" 
            class="fas fa-envelope-open"></i>
            <i v-if="!isDeleted" @click="$emit('delete',email.id)" title="Delete" class="fas fa-trash"></i>
            <i v-if="isInbox && isDetails" @click="emitReply" 
            title="Reply" class="fas fa-reply reply"></i>
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
        emitReply() {
            eventBus.$emit('reply', this.email)
        }
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
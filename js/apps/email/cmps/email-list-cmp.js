import emailPreview from '../cmps/email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails', 'currList'],
    template: `
        <div class="email-list" :class="{'list-no-emails': isListEmpty}" v-if="isListEmpty">
                <span>No {{currList}} messages</span>    
        </div>
        <div v-else class="email-list">
            <email-preview v-for="email in emails" @delete="emitDelete" @toggleRead="emitToggleRead" :email="email"
           :currList="currList" @click.native="goToDetails(email,email.id)"></email-preview>
           <button @click="$emit('mobileCompose')" class="mobile-compose"><i class="fas fa-pencil-alt"></i></button>
        </div>
    `,
    data() {
        return {
            isDeleteClicked: false,
        }
    },
    methods: {
        emitDelete(emailId) {
            this.isDeleteClicked = true
            this.$emit('delete', emailId)
            setTimeout(() => { this.isDeleteClicked = false }, 300)
        },
        emitToggleRead(emailId) {
            this.isDeleteClicked = true
            this.$emit('toggleRead', emailId)
            setTimeout(() => { this.isDeleteClicked = false }, 300)
        },
        goToDetails(email, emailId) {
            if (this.isDeleteClicked) return
            if (!email.isRead) this.$emit('emailRead', emailId)
            this.$router.push(`/email/${this.currList}/${emailId}`)
        },
    },
    computed: {
        isListEmpty() {
            if (this.emails.length > 0) return false
            else return true
        }
    },
    created() {

    }
}
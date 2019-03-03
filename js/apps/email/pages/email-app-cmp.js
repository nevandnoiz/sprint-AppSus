import emailService from '../services/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';
import emailCompose from '../cmps/email-compose-cmp.js';
import emailSidebar from '../cmps/email-sidebar-cmp.js';
import { eventBus } from '../../../main.js';

export default {
    components: {
        emailFilter,
        emailStatus,
        emailSidebar,
        emailCompose
    },
    template: `   
    <div class="email-app" v-if="inboxEmails">
        <email-filter @filtered="setFilter"></email-filter>
        <div class="mobile-nav">
            <button @click="openSidebar=!openSidebar">&#9776;</button>
        </div>
        <div class="app-side-bar" :class="{'open-side-bar': openSidebar}">
            <button @click="isComposing=!isComposing"><i class="fas fa-plus"></i> Compose</button>
            <email-sidebar :totalEmails="numOfEmails" @changeList="changeList" 
           :unreadEmails="unreadEmails"></email-sidebar>
            <email-status :totalEmails="numOfEmails" :unreadEmails="unreadEmails"></email-status>
        </div>
            <email-compose v-if="isComposing" @sent="addEmail" @closeCompose="closeCompose"></email-compose>
        <router-view @emailRead="setEmailRead" @delete="deleteEmail" @toggleRead="toggleIsRead" @mobileCompose="isComposing=!isComposing" :emails="emailsToShow" :currList="emailsList"></router-view>
    </div>
`,
    data() {
        return {
            inboxEmails: null,
            sentEmails: null,
            deletedEmails: null,
            emailsList: null,
            filterBy: null,
            isComposing: false,
            openSidebar: false
        }
    },
    methods: {
        changeList() {
            this.findCurrentListByRoute();
            if (this.openSidebar) this.openSidebar=false;
        },
        findCurrentListByRoute() {
            if (this.$router.currentRoute.path.includes('inbox')) return this.emailsList = 'inbox'
            else if (this.$router.currentRoute.path.includes('sent')) return this.emailsList = 'sent'
            else if (this.$router.currentRoute.path.includes('deleted')) return this.emailsList = 'deleted'
        },
        setFilter(filter) {
            this.filterBy = filter;
        },
        setEmailRead(emailId) {
            setTimeout(emailService.toggleEmailIsRead, 1500, emailId);
        },
        toggleIsRead(emailId) {
            emailService.toggleEmailIsRead(emailId)
        },
        addEmail(email) {
            this.closeCompose()
            setTimeout(emailService.sendEmail, 2000, email);
        },
        closeCompose() {
            this.isComposing = false
        },
        deleteEmail(emailId) {
            setTimeout(emailService.deleteEmail, 400, emailId, this.emailsList);
        },
        replyEmail(email) {
            this.isComposing = true;
            setTimeout(() => { eventBus.$emit('composeReply', email) }, 0)
        },
        countUnreadEmails() {
            var count = 0;
            this.inboxEmails.forEach(email => {
                if (!email.isRead) count++
            })
            return count;
        },
        test(notes){
            console.log('dsfsdf')
            // console.log(notes)
        }
    },
    computed: {
        emailsToShow() {
            if (this.emailsList === 'inbox') var filteredEmails = this.inboxEmails;
            else if (this.emailsList === 'sent') var filteredEmails = this.sentEmails;
            else if (this.emailsList === 'deleted') var filteredEmails = this.deletedEmails;

            if (this.filterBy.byName !== '') {
                filteredEmails = filteredEmails.filter(email => {
                    return email.subject.toLowerCase().includes(this.filterBy.byName.toLowerCase()) ||
                        email.body.toLowerCase().includes(this.filterBy.byName.toLowerCase()) ||
                        email.sentBy.toLowerCase().includes(this.filterBy.byName.toLowerCase())
                })
            }
            if (this.filterBy.selectedFilter === 'Read') {
                filteredEmails = filteredEmails.filter(email => email.isRead)
            } else if (this.filterBy.selectedFilter === 'Unread') {
                filteredEmails = filteredEmails.filter(email => !email.isRead)
            }
            return filteredEmails;
        },
        numOfEmails() {
            return this.inboxEmails.length
        },
        unreadEmails() {
            return this.countUnreadEmails();
        },
    },
    created() {
        emailService.getInboxEmails()
            .then(emails => this.inboxEmails = emails)
        emailService.getSentEmails()
            .then(emails => this.sentEmails = emails)
        emailService.getDeletedEmails()
            .then(emails => this.deletedEmails = emails)
        this.filterBy = {
            byName: '',
            selectedFilter: 'All'
        },
            eventBus.$on('reply', this.replyEmail)
    },
    mounted() {
        this.findCurrentListByRoute()
    }
}
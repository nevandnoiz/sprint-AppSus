import emailService from '../services/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';
import emailCompose from '../cmps/email-compose-cmp.js';
import emailSidebar from '../cmps/email-sidebar-cmp.js';

export default {
    components: {
        emailFilter,
        emailStatus,
        emailSidebar,
        emailCompose
    },
    template: `   
    <div class="email-app" v-if="inboxEmails && sentEmails">
        <email-filter @filtered="setFilter"></email-filter>
        <div class="app-side-bar">
            <button @click="isComposing=!isComposing">Compose</button>
            <email-sidebar @changeList="updateCurrEmailsList" :totalEmails="numOfEmails" 
            :unreadEmails="unreadEmails"></email-sidebar>
            <email-status :totalEmails="numOfEmails" :unreadEmails="unreadEmails"></email-status>
        </div>
        <email-compose @sent="addEmail" v-if="isComposing"></email-compose>
        <router-view class="email-in-app" @read="setIsRead" :emails="emailsToShow" :currList="currEmailsList"></router-view>
    </div>
`,
    data() {
        return {
            inboxEmails: null,
            sentEmails: null,
            currEmailsList: 'inbox',
            filterBy: null,
            isComposing: false
        }
    },
    methods: {
        updateCurrEmailsList(list) {
            console.log(list)
            this.currEmailsList = list;
        },
        setFilter(filter) {
            this.filterBy = filter;
        },
        setIsRead(emailId) {
            if (this.currEmailsList === 'sent') return;
            setTimeout(emailService.setEmailIsRead, 2000, emailId);
        },
        addEmail(email) {
            this.isComposing = false
            setTimeout(emailService.sendEmail, 2000, email);
        },
        countUnreadEmails() {
            var count = 0;
            this.inboxEmails.forEach(email => {
                if (!email.isRead) count++
            })
            return count;
        }
    },
    computed: {
        emailsToShow() {
            if (this.currEmailsList === 'inbox') var filteredEmails = this.inboxEmails;
            else if (this.currEmailsList === 'sent') var filteredEmails = this.sentEmails;
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
        this.filterBy = {
            byName: '',
            selectedFilter: 'All'
        }
    }
}
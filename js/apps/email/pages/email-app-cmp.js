import emailService from '../services/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
// import emailList from '../cmps/email-list-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';
import emailCompose from '../cmps/email-compose-cmp.js';
import emailSidebar from '../cmps/email-sidebar-cmp.js';

export default {
    components: {
        emailFilter,
        // emailList,
        emailStatus,
        emailSidebar,
        emailCompose
    },
    template: `   
    <div class="email-app" v-if="emails">
        <email-filter @filtered="setFilter"></email-filter>
        <!-- <email-list ></email-list> -->
        <div class="app-side-bar">
            <button @click="isComposing=!isComposing">Compose</button>
            <email-sidebar></email-sidebar>
            <email-status :emails="emailsToShow"></email-status>
        </div>
        <email-compose @sent="addEmail" v-if="isComposing"></email-compose>
        <router-view class="email-in-app" @read="setIsRead" :emails="emailsToShow"></router-view>
    </div>
`,
    data() {
        return {
            emails: null,
            filterBy: null,
            isComposing: false
        }
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        },
        setIsRead(emailId) {
            setTimeout(emailService.setEmailIsRead, 2000, emailId);
        },
        addEmail(email) {
            this.isComposing = false
            setTimeout(emailService.addEmail, 2000, email);
        }
    },
    computed: {
        emailsToShow() {
            var filteredEmails = this.emails;
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
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails)
        this.filterBy = {
            byName: '',
            selectedFilter: 'All'
        }
    }
}
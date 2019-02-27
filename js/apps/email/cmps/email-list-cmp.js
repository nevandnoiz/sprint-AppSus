import emailPreview from '../cmps/email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: `
    <div class="email-list">
        <router-link v-for="email in emails" :to="'/email/'+ email.id">
        <email-preview :email="email"></email-preview>
        </router-link>        
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    created() {

    }
}
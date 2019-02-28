
import appSusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-cmp.js';
import emailDetails from './apps/email/pages/email-detalis-cmp.js';
import emailInbox from './apps/email/cmps/email-inbox-cmp.js';
import emailSent from './apps/email/cmps/email-sent-cmp.js';


import notesApp from './apps/notes/pages/notes-app-cmp.js';


const routes = [
    { path: '/', component: appSusHome },
    { path: '/email', component: emailApp, children:[
        { path: '', component: emailInbox },
        { path: 'inbox', component: emailInbox },
        { path: 'sent', component: emailSent },
        // { path: 'details', component: emailList },
        { path: ':emailId', component: emailDetails},
    ]  },

    
    { path: '/notes', component: notesApp },
]

export default routes;
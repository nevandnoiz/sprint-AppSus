
import appSusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-cmp.js';
import emailDetails from './apps/email/pages/email-details-cmp.js';
import emailList from './apps/email/cmps/email-list-cmp.js';
// import emailSent from './apps/email/cmps/email-sent-cmp.js';
// import emailDeleted from './apps/email/cmps/email-deleted-cmp.js';


import notesApp from './apps/notes/pages/notes-app-cmp.js';


const routes = [
    { path: '/', component: appSusHome },
    {
        path: '/email', redirect: '/email/inbox', component: emailApp, children: [
            { path: 'inbox', component: emailList },
            { path: 'inbox/:emailId', component: emailDetails },
            { path: 'sent', component: emailList },
            { path: 'sent/:emailId', component: emailDetails },
            { path: 'deleted', component: emailList },
            { path: 'deleted/:emailId', component: emailDetails },
        ]
    },


    { path: '/notes', component: notesApp },
]

export default routes;
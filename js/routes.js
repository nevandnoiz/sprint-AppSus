
import appSusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-cmp.js';
import emailDetails from './apps/email/pages/email-detalis-cmp.js';
import emailList from './apps/email/cmps/email-list-cmp.js';


import notesApp from './apps/notes/pages/notes-app-cmp.js';


const routes = [
    { path: '/', component: appSusHome },
    { path: '/email', component: emailApp, children:[
        { path: '', component: emailList },
        { path: ':emailId', component: emailDetails},
    ]  },

    
    { path: '/notes', component: notesApp },
]

export default routes;
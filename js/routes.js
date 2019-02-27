
import appSusHome from './pages/appsus-home-cmp.js';
import emailApp from './apps/email/pages/email-app-cmp.js';
import emailDetails from './apps/email/pages/email-detalis-cmp.js';


import notesApp from './apps/notes/pages/notes-app-cmp.js';


const routes = [
    { path: '/', component: appSusHome },
    { path: '/email', component: emailApp },
    { path: '/email/:emailId', component: emailDetails },
    
    { path: '/notes', component: notesApp },
]

export default routes;
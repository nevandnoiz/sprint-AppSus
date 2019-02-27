
import { getFromStorage, saveToStorage, makeId } from '../../../services/util-service.js'

export default {
    getEmails
}

var gEmails = [
    { id: makeId(), sentBy: 'Shuki', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: 1551133930594 },
    { id: makeId(), sentBy: 'Puki', subject: 'Wassap with React?', body: 'Must not', isRead: false, sentAt: 1551133930596 },
    { id: makeId(), sentBy: 'Muki', subject: 'Wassap with Angular?', body: 'I should', isRead: true, sentAt: 1551133930598 },
];

function getEmails() {
    return Promise.resolve(gEmails);
}


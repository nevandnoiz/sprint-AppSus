
import { getFromStorage, saveToStorage, makeId } from '../../../services/util-service.js'

export default {
    getEmails,
    getEmailById
}

var gEmails = createEmails();

function createEmails() {
    if (getFromStorage('emails')) return getFromStorage('emails');
    else {
        var emails = [
            { id: makeId(), sentBy: 'Shuki', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: 1751133930594 },
            { id: makeId(), sentBy: 'Puki', subject: 'Wassap with React?', body: 'Must not', isRead: false, sentAt: 2251133930596 },
            { id: makeId(), sentBy: 'Muki', subject: 'Wassap with Angular?', body: 'I should', isRead: true, sentAt: 1951133930598 },
        ];
        saveToStorage('emails', emails)
        return emails;
    }
}

function getEmails() {
    return Promise.resolve(gEmails);
}

function getEmailById(emailId) {
    var email = gEmails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}


import { getFromStorage, saveToStorage, makeId, getCurrentTime } from '../../../services/util-service.js'

export default {
    getEmails,
    getEmailById,
    setEmailIsRead,
    addEmail
}

var gEmails = createEmails();

function createEmails() {
    if (getFromStorage('emails')) return getFromStorage('emails');
    else {
        var emails = [
            {
                id: makeId(), sentBy: 'Shuki', subject: 'Wassap with Vue?', body: 'I should', isRead: false,
                sentAt: 1548161906123
            },
            {
                id: makeId(), sentBy: 'Puki', subject: 'Wassap with React?', body: 'May I', isRead: false,
                sentAt: Date.now() - 6 * 60 * 60 * 1000
            },
            {
                id: makeId(), sentBy: 'Suzuki', subject: 'Wassap with jQuery?', body: 'Really?', isRead: false,
                sentAt: Date.now() - 14 * 60 * 60 * 1000
            },
            {
                id: makeId(), sentBy: 'Kuki', subject: 'Wassap with VanillaJS?', body: 'Maybe', isRead: true,
                sentAt: 1550140306432
            },
            {
                id: makeId(), sentBy: 'Muki', subject: 'Wassap with Angular?', body: 'Must not', isRead: true,
                sentAt: 1321819862000
            },
        ];
        saveToStorage('emails', emails)
        return emails;
    }
}

function getEmails() {
    sortEmails()
    return Promise.resolve(gEmails);
}

function getEmailById(emailId) {
    var email = gEmails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}

function setEmailIsRead(emailId) {
    var idx = gEmails.findIndex(function (email) {
        return emailId === email.id
    })
    gEmails[idx].isRead = true;
    saveToStorage('emails', gEmails)
    return Promise.resolve()
}

function addEmail(email) {
    var newEmail = email;
    newEmail.sentAt = Date.now();
    newEmail.id = makeId()
    gEmails.push(newEmail);
    saveToStorage('emails', gEmails)
    sortEmails()
    return Promise.resolve()
}

function sortEmails() {
    gEmails.sort((a, b) => { return a.sentAt < b.sentAt })
}

import { getFromStorage, saveToStorage, makeId, getCurrentTime } from '../../../services/util-service.js'

export default {
    getInboxEmails,
    getSentEmails,
    getDeletedEmails,
    getEmailById,
    toggleEmailIsRead,
    sendEmail,
    deleteEmail,
}

var gInboxEmails = _createInboxEmails()
var gSentEmails = _createSentEmails();
var gIncomingEmails = _createIncomingEmails()
var gDeletedEmails = _createDeletedEmails()

function _createInboxEmails() {
    if (getFromStorage('inbox-emails')) return getFromStorage('inbox-emails');
    else {
        var emails = [
            {
                id: makeId(), sentBy: 'Shuki', subject: 'Wassap with Vue?', body: 'I should', isRead: true,
                sentAt: 1548161906123
            },
            {
                id: makeId(), sentBy: 'Puki', subject: 'Wassap with React?', body: 'May I', isRead: false,
                sentAt: Date.now() - 6 * 60 * 60 * 1000
            },
            {
                id: makeId(), sentBy: 'Zuki', subject: 'Wassap with jQuery?', body: 'Really?', isRead: true,
                sentAt: Date.now() - 14 * 60 * 60 * 1000
            },
            {
                id: makeId(), sentBy: 'Kuki', subject: 'Wassap with VanillaJS?', body: 'Maybe', isRead: true,
                sentAt: 1550140306432
            },
            {
                id: makeId(), sentBy: 'Muki', subject: 'Wassap with Angular?', body: 'Must not', isRead: false,
                sentAt: 1321819862000
            },
        ]
        saveToStorage('inbox-emails', emails)
        return emails;
    }
}

function _createSentEmails() {
    if (getFromStorage('sent-emails')) return getFromStorage('sent-emails');
    else {
        var emails = [
            {
                id: makeId(), sentBy: 'Me', subject: 'Hi', body: 'Hey myself', isRead: true,
                sentAt: Date.now()
            },
        ];
        saveToStorage('sent-emails', emails)
        return emails;
    }
}

function _createDeletedEmails() {
    if (getFromStorage('deleted-emails')) return getFromStorage('deleted-emails');
    else {
        var emails = [

        ]
        saveToStorage('deleted-emails', emails)
        return emails;
    }
}

var incomingEmailIntrvl = setInterval(() => {
    var email = gIncomingEmails.shift()
    saveToStorage('incoming-emails', gIncomingEmails)
    email.sentAt = Date.now()
    gInboxEmails.push(email);
    _sortEmails()
    saveToStorage('inbox-emails', gInboxEmails)
}, 120 * 1000)


function getInboxEmails() {
    _sortEmails()
    return Promise.resolve(gInboxEmails);
}

function getSentEmails() {
    _sortEmails()
    return Promise.resolve(gSentEmails);
}

function getDeletedEmails() {
    _sortEmails()
    return Promise.resolve(gDeletedEmails);
}

function getEmailById(emailId, currList) {
    if (currList === 'inbox') {
        var email = gInboxEmails.find(function (email) {
            return emailId === email.id
        })
    } else if (currList === 'sent') {
        var email = gSentEmails.find(function (email) {
            return emailId === email.id
        })
    } else if (currList === 'deleted') {
        var email = gDeletedEmails.find(function (email) {
            return emailId === email.id
        })
    }
    return Promise.resolve(email)
}

function toggleEmailIsRead(emailId) {
    var idx = gInboxEmails.findIndex(function (email) {
        return emailId === email.id
    })
    gInboxEmails[idx].isRead = !gInboxEmails[idx].isRead;
    saveToStorage('inbox-emails', gInboxEmails)
    return Promise.resolve()
}

function sendEmail(email) {
    var newEmail = email;
    newEmail.sentAt = Date.now();
    newEmail.id = makeId()
    gSentEmails.push(newEmail);
    _sortEmails()
    saveToStorage('sent-emails', gSentEmails)
    return Promise.resolve()
}

function deleteEmail(emailId, currList) {
    if (currList === 'inbox') {
        var idx = gInboxEmails.findIndex(function (email) {
            return emailId === email.id
        })
        var removed = gInboxEmails.splice(idx, 1)[0]
        removed.isRead = true;
        gDeletedEmails.push(removed)
        _sortEmails()
        saveToStorage('inbox-emails', gInboxEmails)
    } else if (currList === 'sent') {
        var idx = gSentEmails.findIndex(function (email) {
            return emailId === email.id
        })
        var removed = gSentEmails.splice(idx, 1)[0]
        gDeletedEmails.push(removed)
        _sortEmails()
        saveToStorage('sent-emails', gSentEmails)
    }
    saveToStorage('deleted-emails', gDeletedEmails)
    return Promise.resolve()
}

function _sortEmails() {
    gInboxEmails.sort((a, b) => { return a.sentAt < b.sentAt })
    gSentEmails.sort((a, b) => { return a.sentAt < b.sentAt })
}




function _createIncomingEmails() {
    if (getFromStorage('incoming-emails')) return getFromStorage('incoming-emails');
    else {
        var emails = [
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Theresita",
                "subject": "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
                "body": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Lew",
                "subject": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
                "body": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Portie",
                "subject": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                "body": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Dunstan",
                "subject": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
                "body": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Gram",
                "subject": "Nulla mollis molestie lorem.",
                "body": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Jenifer",
                "subject": "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                "body": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Molly",
                "subject": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.",
                "body": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Kandace",
                "subject": "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
                "body": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Rafael",
                "subject": "Aenean sit amet justo.",
                "body": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Dorry",
                "subject": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                "body": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Abigael",
                "subject": "Suspendisse accumsan tortor quis turpis.",
                "body": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Margarita",
                "subject": "Integer a nibh. In quis justo.",
                "body": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Donella",
                "subject": "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
                "body": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Carlin",
                "subject": "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                "body": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Menard",
                "subject": "Nulla mollis molestie lorem.",
                "body": "Fusce consequat. Nulla nisl. Nunc nisl."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Chaddy",
                "subject": "Nulla tellus.",
                "body": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Kate",
                "subject": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
                "body": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Thurston",
                "subject": "Mauris ullamcorper purus sit amet nulla.",
                "body": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Lesya",
                "subject": "Morbi vel lectus in quam fringilla rhoncus.",
                "body": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Percival",
                "subject": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.",
                "body": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Atlanta",
                "subject": "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.",
                "body": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Burnard",
                "subject": "Aenean sit amet justo.",
                "body": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Riane",
                "subject": "Aliquam erat volutpat. In congue.",
                "body": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Daffy",
                "subject": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
                "body": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Sophi",
                "subject": "Nulla justo.",
                "body": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Logan",
                "subject": "Nam dui.",
                "body": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Marline",
                "subject": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
                "body": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Artemis",
                "subject": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
                "body": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Artie",
                "subject": "Phasellus in felis.",
                "body": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
            },
            {
                "id": makeId(),
                "isRead": false,
                "sentBy": "Nikolia",
                "subject": "Fusce consequat. Nulla nisl.",
                "body": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."
            }
        ]
        saveToStorage('incoming-emails', emails)
        return emails;
    }
}

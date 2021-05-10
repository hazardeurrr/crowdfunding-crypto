import {db, storage} from './index'

export function getAll(collection, callback) {
    let docRef = db.collection(collection);

    docRef.get()
    .then(callback)
    .catch((error) => {
        console.log("Error getting document:", error);
    });
}

export function getOne(collection, address, callback) {
    db.collection(collection).doc(address)
    .get()
    .then(callback)
    .catch((error) => {
        console.log("Error getting document:", error);
    });
}

export function postDoc(id, collection, doc, callback) {
    db.collection(collection).doc(id).set(doc).then(callback)
}

export function updateDoc(id, collection, doc, callback) {
    db.collection(collection).doc(id).update(doc).then(callback)
}

export function postImage(folder, image, progress) {
    let uploadTask = storage.ref(folder + `/${image.name}`).put(image)
    uploadTask.on('state_changed', progress, console.error, () => {
        storage.ref(folder)
        .child(image.name)
        .getDownloadURL()
        .then(url => { return url })
    })
}

export function postHTMLPage(folder, doc, id) {
    let uploadTask = storage.ref(folder + `/${id}`).put(doc)
    uploadTask.on('state_changed', console.log, console.error, () => {
        storage.ref(folder)
        .child(id)
        .getDownloadURL()
        .then(url => { return url })
    })
}
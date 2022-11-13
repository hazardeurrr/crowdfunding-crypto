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

export function postImage(folder, image, name) {
    let uploadTask = storage.ref(folder + `/${name}`).putString(image, 'data_url')
    
    return uploadTask;
}

export function postHTMLPage(blob, id) {
    let uploadTask = storage.ref('campaignsBNBTest/'+id).put(blob);

    // 'file' comes from the Blob or File API
    
    return uploadTask
}
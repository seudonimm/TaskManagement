import firestore, {  serverTimestamp } from '@react-native-firebase/firestore'


class FirestoreHelper{
    constructor(){}

    accountCreationSet = async(collectionName:string, name:string, leader:boolean, email:string) => {
        try {
            firestore()
            .collection(collectionName)
            .doc(email)
            .set({
                name:name,
                email:email,
                leader:leader
            })
        } catch (e) {
            console.log(e);
        }
    };

    getFirestoreData = async(collectionName:string, email:string) => {
        try {
            return firestore().collection(collectionName).doc(email).get();
        } catch (e) {
            console.log(e);   
        }
    }

    getFirestoreDataRealTime = (callback:CallableFunction, collectionName:string) => {
        
        return firestore().collection(collectionName).orderBy("timeStamp", "asc").onSnapshot(docSnapshot=>{
            let messages:Array<Object> = [];
            docSnapshot.docs.forEach(element => {
                messages.push({...element.data(), id:element.id});

            });
            callback(messages);
        });


    };

    addToCollection = async(email:string, message:string, collectionName:string) => {
        try {
            firestore().collection(collectionName).add({
                email: email,
                message: message,
                timeStamp: serverTimestamp()
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FirestoreHelper;
import { firebase } from '@react-native-firebase/auth';
import firestore, {  collection, Filter, serverTimestamp, Timestamp } from '@react-native-firebase/firestore'


class FirestoreHelper{
    constructor(){}

    accountCreationSet = async(collectionName:string, name:string, leader:boolean, email:string) => {
        try {
            if(leader){
                await firestore()
                .collection(collectionName)
                .doc(email)
                .set({
                    name:name,
                    email:email,
                    leader:leader,
                    teams:{}
                })
            } else {
                await firestore()
                .collection(collectionName)
                .doc(email)
                .set({
                    name:name,
                    email:email,
                    leader:leader
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    getFirestoreData = async(collectionName:string, email:string) => {
        try {
            return await firestore().collection(collectionName).doc(email).get();
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
            await firestore().collection(collectionName).add({
                email: email,
                message: message,
                timeStamp: serverTimestamp()
            })
        } catch (e) {
            console.log(e);
        }
    }

    //for leader to create team; collectionname: Users, docName: email of current leader user
    createTeam = async(collectionName:string, docName:string, teamName:string) => {
        try {
            await firestore().collection(collectionName).doc(docName).update({
                [`teams.${teamName}`]: {
                    name: teamName,
                    members: []
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    addMemberToTeam = async(collectionName:string, docName:string, teamName:string, memberName:string, memberId:string) => {
        try {
            await firestore().collection(collectionName).doc(docName).update({
                [`teams.${teamName}.members.${memberName}`]: memberId
            });
            await firestore().collection(collectionName).doc(memberId).update({
                teams: firestore.FieldValue.arrayUnion(teamName)
            })
        } catch (e) {
            console.log(e);
        }
    }

    getMemberUsers = async(collectionName:string, teamName:string) => {
        try {
            //let res = firestore().collection(collectionName).where(Filter.and(Filter('leader', '==', false), Filter('teams', 'array-contains', teamName))).get();
            let res = firestore().collection(collectionName).where('leader', '==', false).get();
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    createTask = async(collectionName:string, docName:string, assignedTo:string, task:string, dateAssigned:Timestamp, dateDue:Timestamp) => {
        try {
            let res = await firestore().collection(collectionName).doc(docName).set({
                assignedTo:assignedTo,
                task:task,
                dateAssigned:dateAssigned,
                dateDue:dateDue,
            });
            await res.doc(docName).collection('Comments').set({
                name:'testName',
                id:'testId',
                message:'testMessage',
                timeSent:new Timestamp(4, 3)
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FirestoreHelper;
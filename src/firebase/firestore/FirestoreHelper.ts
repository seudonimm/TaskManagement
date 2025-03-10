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
                //[`teams.${teamName}.members.${memberName}`]: memberId
                [`teams.${teamName}.members`]: firestore.FieldValue.arrayUnion({name:memberName, id:memberId})
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
    
    createComment = async(taskName:string, name:string, id:string, message:string) => {
        try {
            let res = await firestore().collection('Tasks').doc(taskName).update({
                [`comments`]: firestore.FieldValue.arrayUnion({
                    name:name,
                    id:id,
                    message:message,
                    timeSent:Timestamp.now()
                })
            });
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    createTask = async(collectionName:string, docName:string, teamName:string, assignedTo:string, task:string, dateAssigned:Timestamp, dateDue:Timestamp) => {
        try {
            let res = await firestore().collection(collectionName).doc(docName).set({
                taskName:docName,
                teamName:teamName,
                assignedTo:assignedTo,
                task:task,
                dateAssigned:dateAssigned,
                dateDue:dateDue,
                comments:[{
                    name:'testName',
                    id:'testId',
                    message:'testMessage',
                    timeSent:new Timestamp(4, 3)
                }]
            });
            // await res.doc(docName).collection('Comments').set({
            //     name:'testName',
            //     id:'testId',
            //     message:'testMessage',
            //     timeSent:new Timestamp(4, 3)
            // });
        } catch (e) {
            console.log(e);
        }
    }
    copyDocument = async(oldCollectionName:string, newCollectionName:string, docName:string) => {
        try {
            let res = (await firestore().collection(oldCollectionName).doc(docName).get()).data()
            
            await firestore().collection(newCollectionName).doc(docName).set({...res});
        } catch (e) {
            console.log(e);
        }
    }

    getTasks = async(collectionName:string, memberId:string) => {
        try {
            console.log("helper: " + memberId);
            //let res = await firestore().collection(collectionName).where('assignedTo', '==', `${memberId}`).orderBy('dateDue', 'asc').get();
            let res = await firestore().collection(collectionName).where(Filter('assignedTo', '==', `${memberId}`)).orderBy('dateDue', 'asc').get();

            return res.docs;
        } catch (e) {
            console.log(e)
        }
    }    
    getAllTasks = async(collectionName:string) => {
        try {
            //let res = await firestore().collection(collectionName).where('assignedTo', '==', `${memberId}`).orderBy('dateDue', 'asc').get();
            let res = await firestore().collection('Tasks').get();

            return res.docs;
        } catch (e) {
            console.log(e)
        }
    }    
    
    getFinishedTasks = async(collectionName:string) => {
        try {
            //console.log("helper: " + memberId);
            //let res = await firestore().collection(collectionName).where('assignedTo', '==', `${memberId}`).orderBy('dateDue', 'asc').get();
            let res = await firestore().collection('FinishedTasks').get();

            return res.docs;
        } catch (e) {
            console.log(e)
        }
    }

    deleteDocument = async(collectionName:string, docName:string) => {
        try {
            let res = await firestore().collection(collectionName).doc(docName).delete();

            return res;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FirestoreHelper;
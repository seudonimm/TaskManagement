import React, { useEffect, useState, useRef } from "react";
import { Modal, SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { PURPLE, LIGHT_BLUE, BLUE } from "../res/colors";
import {store} from "../store/Store";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import TaskListItem from "../components/TaskListItem";
import Subtext from "../components/Subtext";
import HeaderSmall from "../components/HeaderSmall";
import WatermelonHelper from "../model/watermelonHelper/WatermelonHelper";
import CommentListItem from "../components/CommentListItem";
import CustomInputField from "../components/CustomInputField";

const LeaderTaskView:React.FC = () => {
    const tasks:any = useSelector((state:RootState) => state.tasks);
    const login = useSelector((state:RootState) => state.login);

    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);
    const [taskArray, setTaskArray] = useState<Array<object>>([]);
   
    const [comment, setComment] = useState<string>('');

    const commentListRef = useRef();
    const onTaskItemPress = (index:number):void => {
        setTaskModalVisible(true);
        setSelectedTask(index);
    }
    const onGetTasksPress = ():void => {
        console.log("todo: " + login.data._data.email);
        store.dispatch({type:'GET_ALL_TASKS', payload:{collectionName:'Tasks', memberId:login.data._data.email}})

    }
    const onAddCommentPress = (taskName:string, name:string, id:string, message:string) => {
        store.dispatch({type:'CREATE_COMMENT', payload:{taskName, name, id, message, index:selectedTask}})
    }
    const toRenderFlatListItem = ({item, index}:{item:object, index:number}):React.JSX.Element => {
        return(
            <TaskListItem
                title={item._data.taskName}
                dateDue={item._data.dateDue.toDate().toLocaleDateString() + " " + item._data.dateDue.toDate().toLocaleTimeString()}
                onPress={() => onTaskItemPress(index)}
            />
        )
    }
    const toRenderFlatListComments = ({item, index}:{item:object, index:number}):React.JSX.Element => {
        return(
            <CommentListItem
                name={item.name}
                message={item.message}
                timeStamp={item.timeSent}
            />
        )
    }

    const onFinishTaskPress = (oldCollectionName:string, newCollectionName:string, docName:string, index:number) => {
        store.dispatch({type:'FINISH_TASK', payload:{oldCollectionName, newCollectionName, docName, index}})
        setTaskModalVisible(false);
        //setTaskArray(tasks.data._docs);

    }

    const sync = async() => {
        await WatermelonHelper.syncFirestoreAndWatermelonDB('Tasks', login.data._data.email);
    }
      
    useEffect(
        () => {console.log(tasks);
                onGetTasksPress();
                sync();
        },[]
    )
    useEffect(
        () => {
            console.log('runing')
            if(tasks.data[selectedTask]){
                setLoading(false);
                console.log(tasks.data);
                console.log(taskArray);
            }
            if(!loading){
                //setTaskArray(tasks.data._docs);
                console.log('task array assign')

            }
            // for(let e of tasks.data){
            //     CalendarHelper.addEventToCalendar(e._data.taskName, e._data.task, e._data.task, e._data.dateAssigned.toDate(), e._data.dateDue.toDate());
            // }
        },[tasks.data, tasks]
    )
    //const [date, setDate] = useState<Date>(new Date)
    return(
        <SafeAreaView style={styles.container}>
            {/* <View style={{flex:1, zIndex:1}}>
                <CalendarProvider style={{borderRadius: 10}}
                    date={new Date().toDateString()}
                >
                    <ExpandableCalendar 
                    />
                </CalendarProvider>
            </View> */}
            <View style={{flex:3.7}}>
            <Subtext
                text={"Tasks"}
            />
            <FlatList
                data={tasks.data}
                // data={dBData}
                renderItem={toRenderFlatListItem}
            />
            </View>
            <View  style={styles.centeredView}>
                <Modal
                    visible={taskModalVisible}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <HeaderSmall style={{marginBottom: '1%', fontSize: 20}}
                            text={'Task'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext 
                                text={!loading?tasks.data[selectedTask]._data.taskName:'loading'}
                            />
                        </View>
                        <HeaderSmall style={{marginBottom: '1%', fontSize: 20}}
                            text={'Description'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.data[selectedTask]._data.task:'loading'}
                            />
                        </View>
                        <HeaderSmall style={{marginBottom: '1%', fontSize: 20}}
                            text={'Date Assigned'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext style={{margin: '1%'}}
                                text={!loading?
                                    (tasks.data[selectedTask]._data.dateAssigned.toDate().toLocaleDateString() + " " + tasks.data[selectedTask]._data.dateAssigned.toDate().toLocaleTimeString()):
                                    'loading'}
                            />
                        </View>
                        <HeaderSmall style={{marginBottom: '1%', fontSize: 20}}
                            text={'Date Due'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?
                                    (tasks.data[selectedTask]._data.dateDue.toDate().toLocaleDateString() + " " + tasks.data[selectedTask]._data.dateDue.toDate().toLocaleTimeString()):
                                    'loading'}
                            />
                        </View>
                        <View style={styles.modalButtonsStyle}>
                            <CustomButton style={{backgroundColor: 'black'}}
                                text="Do"
                                onPress={()=>onFinishTaskPress('Tasks', 'FinishedTasks', tasks.data[selectedTask]._data.taskName, selectedTask)}
                            />
                            <CustomButton style={{backgroundColor: 'black'}}
                                text="Cancel"
                                onPress={():void => setTaskModalVisible(false)}
                            />
                        </View>
                        <View style={styles.modelTaskItemContainer}>
                            <FlatList style={{height: '30%'}}
                                data={!loading?tasks.data[selectedTask]._data.comments:[]}
                                renderItem={toRenderFlatListComments}
                                keyExtractor={(item) => item.id + item.timeSent}
                                extraData={tasks.comments}
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <CustomInputField style={{flex: 1, width: '85%'}}
                                text="Enter Comment..."
                                onChangeText={t => setComment(t)}
                            />
                            <CustomButton style={{backgroundColor: 'black', width: '20%', flex: 0, justifyContent: 'center', alignItems: 'center'}}
                                text="Send"
                                onPress={()=>onAddCommentPress(
                                    tasks.data[selectedTask]._data.taskName,
                                    login.data._data.name,
                                    login.data._data.email,
                                    comment,
                                )}
                            />
                        </View>
                    </View>
                    
                </Modal>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT_BLUE

    },
    centeredView: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '80%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: PURPLE,
        //alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        verticalAlign: 'middle',
        backgroundColor: BLUE,
        marginTop: '30%',
        padding: '5%',
        shadowColor: 'black',
        shadowRadius:20,
        shadowOpacity: .50,
        elevation: 2,
        shadowOffset: {
            width: 25,
            height: 25
        },
    },
    flatlistViewContainer: {
        flex: 10,
        height: '80%',
        width: '90%',
        borderWidth: 1,
        borderColor: PURPLE,
        alignSelf: 'center',
        borderRadius: 10,
        margin: '1%',
        paddingVertical: '5%'
    },
    modalButtonsStyle: {
        flex:1,
        flexDirection: 'row',
        //justifyContent: 'flex-end'
    },
    modelTaskItemContainer: {
        backgroundColor: LIGHT_BLUE,
        borderRadius: 10,
        shadowColor: 'black',
        shadowRadius:20,
        shadowOpacity: .50,
        elevation: 2,
        shadowOffset: {
            width: 25,
            height: 25
        },
        margin: '1%'

    }

})
export default LeaderTaskView;
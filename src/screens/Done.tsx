import React, { useEffect, useState } from "react";
import {View, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PURPLE, BLACK, LIGHT_BLUE, BLUE } from "../res/colors";
import CustomButton from "../components/CustomButton";
import Subtext from "../components/Subtext";
import {store} from "../store/Store";
import TaskListItem from "../components/TaskListItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import HeaderSmall from "../components/HeaderSmall";

const Done:React.FC = () => {
    const tasks:any = useSelector((state:RootState) => state.tasks);
    const login = useSelector((state:RootState) => state.login);

    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);
    //const [taskArray, setTaskArray] = useState<Array<object>>([]);

    const onTaskItemPress = (index:number):void => {
        setTaskModalVisible(true);
        setSelectedTask(index);
        //onDisplayNotification();
    }
    const onGetTasksPress = ():void => {
        console.log("todo: " + login.data._data.email);
        store.dispatch({type:'GET_TASKS', payload:{collectionName:'FinishedTasks'}})

    }
    const toRenderFlatListItem = ({item, index}:{item:object, index:number}):React.JSX.Element => {
        //createNotification(item._data.dateDue.toDate(), item._data.taskName, item.data.task);
        return(
            <TaskListItem
                title={item._data.taskName}
                dateDue={item._data.dateDue.toDate().toString()}
                onPress={() => onTaskItemPress(index)}
            />
        )
    }

    useEffect(
        () => {console.log(tasks);
                //onGetTasksPress();
                //createNotificationChannel('tasks', 'Tasks Due');

                //onDisplayNotification();
        },[]
    )
    useEffect(
        () => {
            console.log('runing')
            setLoading(true);
            // if(tasks.finishedData[selectedTask]){
            //     setLoading(false);
            //     console.log(tasks.finishedData);
            //     //console.log(taskArray);

            // }
            if(!loading){
                //setTaskArray(tasks.data._docs);
                console.log('task array assign')

            }
        },[tasks.finishedData, tasks]
    )

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:3.7}}>
            <Subtext
                text={"Finished Tasks"}
            />
            <FlatList
                data={tasks.finishedData}
                renderItem={toRenderFlatListItem}
                // keyExtractor={item=>item._data.taskName}
                // extraData={tasks.data._docs}
            />
            {/* <CustomButton
                text="Get Task"
                onPress={() => onGetTasksPress}
            /> */}
            </View>
            (<View  style={styles.centeredView}>
                <Modal
                    visible={taskModalVisible}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <HeaderSmall
                            text={'Task'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext 
                                text={!loading?tasks.finishedData[selectedTask]._data.taskName:'loading'}
                            />
                        </View>
                        <HeaderSmall
                            text={'Description'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.finishedData[selectedTask]._data.task:'loading'}
                            />
                        </View>
                        <HeaderSmall
                            text={'Date Assigned'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.finishedData[selectedTask]._data.dateAssigned.toDate().toString():'loading'}
                            />
                        </View>
                        <HeaderSmall
                            text={'Date Due'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.finishedData[selectedTask]._data.dateDue.toDate().toString():'loading'}
                            />
                        </View>
                        <View style={styles.modalButtonsStyle}>
                            {/* <CustomButton style={{backgroundColor: 'black'}}
                                text="Do"
                                onPress={()=>onFinishTaskPress('Tasks', 'FinishedTasks', tasks.data[selectedTask]._data.taskName, selectedTask)}
                            /> */}
                            <CustomButton style={{backgroundColor: 'black'}}
                                text="Cancel"
                                onPress={():void => setTaskModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>)

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
        width: '80%',
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
        marginTop: '20%',
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

    }

})

export default Done;
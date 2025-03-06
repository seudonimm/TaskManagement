import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PURPLE, BLACK, LIGHT_BLUE, BLUE } from "../res/colors";
import LogoutButton from "../components/LogoutButton";
import store from "../store/Store";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { FlatList } from "react-native-gesture-handler";
import TaskListItem from "../components/TaskListItem";
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import Subtext from "../components/Subtext";
import HeaderSmall from "../components/HeaderSmall";

const ToDo:React.FC = () => {
    const tasks:any = useSelector((state:RootState) => state.tasks);
    const login = useSelector((state:RootState) => state.login);

    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);
    const [taskArray, setTaskArray] = useState<Array<object>>([]);

    const onTaskItemPress = (index:number):void => {
        setTaskModalVisible(true);
        setSelectedTask(index);
    }
    const onGetTasksPress = ():void => {
        console.log("todo: " + login.data._data.email);
        store.dispatch({type:'GET_TASKS', payload:{collectionName:'Tasks', memberId:login.data._data.email}})

    }
    const toRenderFlatListItem = ({item, index}:{item:object, index:number}):React.JSX.Element => {
        return(
            <TaskListItem
                title={item._data.taskName}
                dateDue={item._data.dateDue.toDate().toString()}
                onPress={() => onTaskItemPress(index)}
            />
        )
    }

    const onFinishTaskPress = (oldCollectionName:string, newCollectionName:string, docName:string, index:number) => {
        store.dispatch({type:'FINISH_TASK', payload:{oldCollectionName, newCollectionName, docName, index}})
        setTaskModalVisible(false);
        setTaskArray(tasks.data._docs);

    }
    useEffect(
        () => {console.log(tasks);
                onGetTasksPress();
        },[]
    )
    useEffect(
        () => {
            console.log('runing')
            if(tasks.data._docs){
                setLoading(false);
                console.log(tasks.data);
                console.log(taskArray);

            }
            if(!loading){
                setTaskArray(tasks.data._docs);
                console.log('task array assign')

            }
        },[tasks.data._docs, tasks]
    )
    const [date, setDate] = useState<Date>(new Date)
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, zIndex:1}}>
                <CalendarProvider style={{borderRadius: 10}}
                    date={date.toDateString()}
                >
                    <ExpandableCalendar />
                </CalendarProvider>
            </View>
            <View style={{flex:3.7}}>
            <Subtext
                text={"Tasks"}
            />
            <FlatList
                data={taskArray}
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
                                text={!loading?tasks.data._docs[selectedTask]._data.taskName:'loading'}
                            />
                        </View>
                        <HeaderSmall
                            text={'Description'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.data._docs[selectedTask]._data.task:'loading'}
                            />
                        </View>
                        <HeaderSmall
                            text={'Date Assigned'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.data._docs[selectedTask]._data.dateAssigned.toDate().toString():'loading'}
                            />
                        </View>
                        <HeaderSmall
                            text={'Date Due'}
                        />
                        <View style={styles.modelTaskItemContainer}>
                            <Subtext
                                text={!loading?tasks.data._docs[selectedTask]._data.dateDue.toDate().toString():'loading'}
                            />
                        </View>
                        <View style={styles.modalButtonsStyle}>
                            <CustomButton style={{backgroundColor: 'black'}}
                                text="Do"
                                onPress={()=>onFinishTaskPress('Tasks', 'FinishedTasks', tasks.data._docs[selectedTask]._data.taskName, selectedTask)}
                            />
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
export default ToDo;
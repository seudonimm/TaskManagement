import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import LogoutButton from "../components/LogoutButton";
import { BLACK, BLUE, LIGHT_BLUE, PURPLE } from "../res/colors";
import Header from "../components/Header";
import HeaderSmall from "../components/HeaderSmall";
import Subtext from "../components/Subtext";
import CustomInputField from "../components/CustomInputField";
import DatePicker from "react-native-date-picker";
import CustomButton from "../components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import {store, RootState } from "../store/Store";
import { Timestamp } from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";

interface teamArrayType{
    name:string,
    members:object
}
const CreateTasks = () => {
    const login = useSelector((state:RootState) => state.login);
    const teams = useSelector((state:RootState) => state.teams);

    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('')

    const [date, setDate] = useState<Date>(new Date());
    const [openDate, setOpenDate] = useState<boolean>(false);
    const [openTime, setOpenTime] = useState<boolean>(false);

    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedMember, setSelectedMember] = useState<string>('');

    const [teamArray, setTeamArray] = useState<any>([]);

    const onCreateTaskPress = (collectionName:string, docName:string, teamName:string, assignedTo:string, task:string, dateAssigned:Timestamp, dateDue:Timestamp) => {
        store.dispatch({type:"CREATE_TASK", payload:{collectionName, docName, teamName, assignedTo, task, dateAssigned, dateDue}})
    };

    const toArrayTeams = () => {
        let objKeys = Object.keys(teams.teams);
        let teamArray = []
        for (let i = 0; i < objKeys.length; i++){
            teamArray.push(teams.teams[objKeys[i]]);
        }
        console.log(teamArray);
        setTeamArray(teamArray);
        //return teamArray;
    }
    //const teamArray = toArrayTeams();
    const getTeamMembers = (teamName:string) => {
        store.dispatch({type:'GET_MEMBER_USERS', payload:{collectionName:'Users', teamName}})
        console.log("sdfsdfa");
    }

    useEffect(
        () => {
            //store.dispatch({type:'GET_TEAMS_DATA', payload:{email:login.data._data.email}});
            toArrayTeams();
            console.log("namesss: " + teamArray)
            //setSelectedTeam(teamArray[0].name);
        },[]
    )
    useEffect(
        () => {
            if(selectedTeam){
                getTeamMembers(selectedTeam);
                console.log("namesss: " + teamArray)
                console.log("selected team: " + (selectedMember))
            }
        },[selectedTeam]
    )

    return(
        // <SafeAreaView style={{flex: 1, backgroundColor}}>
            <SafeAreaView style={styles.container}>
            <View style={styles.headerViewStyle}>
                <Header
                    text={"Create Task"}
                />
            </View>
            <View style={styles.subContainer}>
                <Dropdown style={styles.dropdown}
                    data={teamArray}
                    search
                    labelField='name'
                    valueField='name'
                    onChange={(item) => {setSelectedTeam(item)}}
                />
                (selectedTeam)?<Dropdown style={styles.dropdown}
                    data={selectedTeam.members}
                    search
                    labelField='name'
                    valueField='name'
                    onChange={(item) => {setSelectedMember(item.id)}}
                />
                <Subtext
                    text={"Task Name"}
                />
                <CustomInputField style={styles.inputFieldStyle}
                    text="Task Name..."
                    onChangeText={(t:string):void => setTaskName(t)}
                    textWhite={true}
                />
                <Subtext
                    text={"Description"}
                />
                <CustomInputField style={{...styles.inputFieldStyle,}}
                    text="Task Description..."
                    onChangeText={(t:string):void => setTaskDescription(t)}
                    textWhite={true}
                />
                <Subtext style={{margin: '1%'}}
                    text={"Due Date"}
                />
                <View style={{flex:1}}>
                <View style={styles.datePickerButtonContainer}>
                    <CustomButton style={styles.dateButtonStyle}
                        text={date.toLocaleDateString()}
                        onPress={() => setOpenDate(true)}
                    />
                    <CustomButton style={styles.dateButtonStyle}
                        text={date.toLocaleTimeString()}
                        onPress={() => setOpenTime(true)}
                    />
                </View>
                </View>
                <DatePicker 
                    modal
                    mode={'date'}
                    open={openDate}
                    date={date}
                    onConfirm={(date) => {
                        setDate(date)
                        setOpenDate(false)
                    }}
                    onCancel={() => setOpenDate(false)}
                />
                    <DatePicker
                    modal
                    mode={'time'}
                    open={openTime}
                    date={date}
                    onConfirm={(date) => {
                        setDate(date)
                        setOpenTime(false)
                    }}
                    onCancel={() => setOpenTime(false)}
                />
                <CustomButton style={{flex:0, height: '10%', backgroundColor: 'black'}}
                    text="Create Task"
                    onPress={() => onCreateTaskPress('Tasks', taskName, selectedTeam.name, selectedMember, taskDescription, firebase.firestore.Timestamp.fromDate(new Date), firebase.firestore.Timestamp.fromDate(date))}
                />

            </View>
        {/* </SafeAreaView> */}
            {/* <View style={styles.createTaskButtonView}>
                    <CustomButton
                        text="Create Task"
                        onPress={() => onCreateTaskPress('Tasks', taskName, selectedTeam.name, selectedMember, taskDescription, firebase.firestore.Timestamp.fromDate(new Date), firebase.firestore.Timestamp.fromDate(date))}
                    />
                    </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLUE
    },
    subContainer: {
        flex: 8,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: '5%',
        backgroundColor:LIGHT_BLUE
    },
    datePickerStyle: {
        color: 'white'
    },
    datePickerView: {
        //backgroundColor: PURPLE,
        // borderRadius: 30, 
        // width: '80%',
        // alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: 'white'
        flex: 1

    },
    dateButtonStyle: {
        borderWidth: .5,
        borderColor: 'white',
        backgroundColor: BLUE,
        padding: '5%',
        borderEndColor: 'white'
    },
    datePickerButtonContainer: {
        flexDirection: 'row'
    },
    createTaskButtonView: {
        flex: 1
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    headerViewStyle: {
        flex: 1.5,
        backgroundColor: BLUE,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10
    },
    inputFieldStyle: {
        backgroundColor: BLUE,
    }
      
      
})

export default CreateTasks;
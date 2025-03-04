import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import LogoutButton from "../components/LogoutButton";
import { BLACK, PURPLE } from "../res/colors";
import Header from "../components/Header";
import HeaderSmall from "../components/HeaderSmall";
import Subtext from "../components/Subtext";
import CustomInputField from "../components/CustomInputField";
import DatePicker from "react-native-date-picker";
import CustomButton from "../components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import store, { RootState } from "../store/Store";
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
        <LinearGradient style={{flex:1}}
            colors={[PURPLE, BLACK, BLACK]}
            locations={[0, .1, 1]}
            start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
        >
            <SafeAreaView style={styles.container}>
            <HeaderSmall
                text={"Create Task"}
            />
                <LinearGradient style={{flex:1, borderRadius: 30}}
                    colors={[PURPLE, BLACK, BLACK]}
                    locations={[0, .1, 1]}
                    start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
                >

                <View style={styles.subContainer}>
                    <Dropdown style={styles.dropdown}
                        data={teamArray}
                        search
                        labelField='name'
                        valueField='name'
                        onChange={(item) => {setSelectedTeam(item)}}
                    />
                    {(selectedTeam)?<Dropdown style={styles.dropdown}
                        data={selectedTeam.members}
                        search
                        labelField='name'
                        valueField='name'
                        onChange={(item) => {setSelectedMember(item.id)}}
                    />:<ActivityIndicator/>}
                    <Subtext
                        text={"Task Name"}
                    />
                    <CustomInputField
                        text="Task Name..."
                        onChangeText={(t:string):void => setTaskName(t)}
                    />
                    <Subtext
                        text={"Description"}
                    />
                    <CustomInputField style={{height: '70%'}}
                        text="Task Description..."
                        onChangeText={(t:string):void => setTaskDescription(t)}
                    />
                    <Subtext
                        text={"Due Date"}
                    />
                    <View style={styles.datePickerButtonContainer}>
                        <CustomButton style={styles.dateButtonStyle}
                            text={date.toDateString()}
                            onPress={() => setOpenDate(true)}
                        />
                        <CustomButton style={styles.dateButtonStyle}
                            text={date.toTimeString()}
                            onPress={() => setOpenTime(true)}
                        />
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

                </View>
                </LinearGradient>
            </SafeAreaView>
            <View style={styles.createTaskButtonView}>
                    <CustomButton
                        text="Create Task"
                        onPress={() => onCreateTaskPress('Tasks', taskName, selectedTeam.name, selectedMember, taskDescription, firebase.firestore.Timestamp.fromDate(new Date), firebase.firestore.Timestamp.fromDate(date))}
                    />
                    </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 7
    },
    subContainer: {
        flex: 1,
        borderWidth: .5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopColor: 'white',
        padding: '5%',
        borderEndColor: 'white'
        
    },
    datePickerStyle: {
        color: 'white'
    },
    datePickerView: {
        //backgroundColor: PURPLE,
        borderRadius: 30, 
        width: '80%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white'

    },
    dateButtonStyle: {
        borderWidth: .5,
        borderColor: 'white',
        backgroundColor: BLACK,
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
})

export default CreateTasks;
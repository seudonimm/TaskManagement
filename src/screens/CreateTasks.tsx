import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import LogoutButton from "../components/LogoutButton";
import { BLACK, PURPLE } from "../res/colors";
import Header from "../components/Header";
import HeaderSmall from "../components/HeaderSmall";
import Subtext from "../components/Subtext";
import CustomInputField from "../components/CustomInputField";
import DatePicker from "react-native-date-picker";
import CustomButton from "../components/CustomButton";

const CreateTasks = () => {
    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('')

    const [date, setDate] = useState<Date>(new Date());
    const [openDate, setOpenDate] = useState<boolean>(false);
    const [openTime, setOpenTime] = useState<boolean>(false);

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
                        onChangeText={(t:string):void => setTaskName(t)}
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
                        onPress={() => {}}
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
    }
})

export default CreateTasks;
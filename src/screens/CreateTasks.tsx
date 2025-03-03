import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import LogoutButton from "../components/LogoutButton";
import { BLACK, PURPLE } from "../res/colors";
import Header from "../components/Header";
import HeaderSmall from "../components/HeaderSmall";
import Subtext from "../components/Subtext";
import CustomInputField from "../components/CustomInputField";


const CreateTasks = () => {
    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('')

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
                    <CustomInputField
                        text="Task Description..."
                        onChangeText={(t:string):void => setTaskName(t)}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        borderWidth: .5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopColor: 'white',
        padding: '5%',
        borderEndColor: 'white'
        
    }
})

export default CreateTasks;
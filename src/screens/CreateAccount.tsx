import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import store, {RootState} from "../store/Store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import FirestoreHelper from "../firebase/firestore/FirestoreHelper";
import CustomPressable from "../components/CustomPressable";
import Subtext from "../components/Subtext";

const CreateAccount:React.FC = () => {
    const login = useSelector((state:RootState) => state.login);

    const navigation:NavigationProp<ParamListBase> = useNavigation();

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [leader, setLeader] = useState<boolean>(false);

    const onRegisterPress = (name:string, email:string, password:string, leader:boolean):void => {
        //console.log("logged in");
        store.dispatch({type:'CREATE_ACCOUNT', payload:{name, email, password, leader}});
        console.log("stuff "+name, email, leader);
        setAuth(name, email, leader);
        check();
    }
    
    const setAuth = async(name:string, email:string, leader:boolean):Promise<void> => {
        setLeader(leader);
        store.dispatch({type:'SET_AUTH', payload:{collectionName:'Users', name:name, email:email, leader:leader}})
        //await FirestoreHelper.accountCreationSet('Users', name, leader, email)
        //navigation.navigate('')
    }
    const check = () => {
        console.log("stuff "+name, email, leader);

    }
    const onToLoginPress = ():void => {
        navigation.navigate('Login');
    }

    // useEffect(
    //     () => {

    //         if(login.loggedIn){
    //             setAuth(name, email, leader);
    //             console.log("stuffd "+name, email, leader);

    //         }
    //         // console.log("stuff "+name, email, leader);
    //         // return () => {setAuth(name, email, leader)}
    //     },[login.loggedIn]
    // )
    return(
        <SafeAreaView style={styles.container}>
            <CustomInputField
                text="Name"
                onChangeText={(t:string) => setName(t)}
            />  
            <CustomInputField
                text="Email"
                onChangeText={(t:string) => setEmail(t)}
            />            
            <CustomInputField
                text="Password"
                onChangeText={(t:string) => setPassword(t)}
            />
            <Subtext
                text={"Sign up as Team Leader or Member?"}
            />
            <CustomButton
                text="Leader"
                onPress={():void => onRegisterPress(name, email, password, true)}
            />
            <CustomButton
                text="Member"
                onPress={():void => onRegisterPress(name, email, password, false)}
            />
            <CustomPressable
                text="To Login"
                onPress={():void => onToLoginPress()}
            />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default CreateAccount;
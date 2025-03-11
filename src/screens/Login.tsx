import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import {store, RootState} from "../store/Store";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import CustomPressable from "../components/CustomPressable";
import Header from "../components/Header";
import { BLUE } from "../res/colors";
import { Platform } from "react-native";

const Login:React.FC = () => {
    const login = useSelector((state:RootState) => state.login);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation:NavigationProp<ParamListBase> = useNavigation();

    const onLoginPress = (email:string, password:string):void => {
        //console.log("logged in");
        store.dispatch({type:'LOG_IN', payload:{email, password}});
    }
    const onCreateAccountPress = ():void => {
        navigation.navigate('CreateAccount');
    }
    
    return(

            <SafeAreaView style={styles.container}>
                <Image style={styles.imageStyle} 
                    source={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/front.png')}
                />
                <Header style={{marginBottom: '2%'}}
                    text={"Task\nManagement"}
                />
                <CustomInputField
                    text="Email"
                    onChangeText={(t:string):void => setEmail(t)}
                />            
                <CustomInputField
                    text="Password"
                    onChangeText={(t:string):void => setPassword(t)}
                    textWhite={false}
                    secureTextEntry={true}
                />
                <CustomPressable
                    text="Create Account"
                    onPress={():void => onCreateAccountPress()}
                />
                <CustomButton style={{backgroundColor: 'black', flex:0, height: '10%', marginTop: '10%'}}
                    text="Login"
                    onPress={():void => onLoginPress(email, password)}
                />

            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLUE
    },
    imageStyle: {
        height: Platform.OS === 'ios'? '38%': '35%',
        width: Platform.OS === 'ios'? '90%': '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%'
    }
})
export default Login;
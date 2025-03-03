import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import store, {RootState} from "../store/Store";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import CustomPressable from "../components/CustomPressable";
import Header from "../components/Header";
import { BLACK, PURPLE } from "../res/colors";
import LinearGradient from "react-native-linear-gradient";


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
        <LinearGradient style={{flex:1}}
            colors={[PURPLE, BLACK, BLACK]}
            locations={[0, .1, 1]}
            start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
        >
            <SafeAreaView style={styles.container}>
                <Image style={styles.imageStyle} 
                    source={require('/Users/jusman/Documents/Training/Projects/TaskManagement/assets/front.png')}
                />
                <Header
                    text={"Task\nManagement"}
                />
                <CustomInputField
                    text="Email"
                    onChangeText={(t:string):void => setEmail(t)}
                />            
                <CustomInputField
                    text="Password"
                    onChangeText={(t:string):void => setPassword(t)}
                />
                <CustomButton
                    text="Login"
                    onPress={():void => onLoginPress(email, password)}
                />
                <CustomPressable
                    text="Create Account"
                    onPress={():void => onCreateAccountPress()}
                />
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: BLACK
    },
    imageStyle: {
        height: '50%',
        width: '100%'


    }
})
export default Login;
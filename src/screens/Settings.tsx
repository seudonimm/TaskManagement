import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PURPLE, BLACK } from "../res/colors";
import LogoutButton from "../components/LogoutButton";
import store from "../store/Store";

const Settings:React.FC = () => {

    useEffect(
        () => {
            store.dispatch({type:'LOGOUT'})

        },[]
    )
    return(
        <LinearGradient style={{flex:1}}
            colors={[PURPLE, BLACK, BLACK]}
            locations={[0, .1, 1]}
            start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
        >

        <SafeAreaView>
            <LogoutButton/>
        </SafeAreaView>
        </LinearGradient>
    );
};

export default Settings;
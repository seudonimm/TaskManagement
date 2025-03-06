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

        <SafeAreaView>
            <LogoutButton/>
        </SafeAreaView>
    );
};

export default Settings;
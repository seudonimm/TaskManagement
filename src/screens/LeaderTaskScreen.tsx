import React from "react";
import { SafeAreaView, Text } from "react-native";
import store from "../store/Store";
import CustomButton from "../components/CustomButton";


const LeaderTaskScreen:React.FC = () => {

    const onLogoutPress = ():void => {
        store.dispatch({type:'LOGOUT'})
    }
    return(
        <SafeAreaView>
            <Text>
                Member
            </Text>
            <CustomButton
                text={"Logout"}
                onPress={():void => onLogoutPress()}
            />
        </SafeAreaView>
    );
};

export default LeaderTaskScreen;
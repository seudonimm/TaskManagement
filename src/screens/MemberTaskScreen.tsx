import React from "react";
import { SafeAreaView, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import store from "../store/Store";


const MemberTaskScreen:React.FC = () => {

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

export default MemberTaskScreen;
import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import store, { RootState } from "../store/Store";
import { useSelector } from "react-redux";


const MemberTaskScreen:React.FC = () => {
    const task = useSelector((state:RootState) => state.tasks);

    const onLogoutPress = ():void => {
        store.dispatch({type:'LOGOUT'})
    }
    useEffect(
        () => {
            store.dispatch({type:'GET_TASKS', payload:{collectionName:'Tasks'}})
        },[]
    )
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
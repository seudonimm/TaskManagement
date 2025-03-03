import React, { memo } from "react";
import { 
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import store from "../store/Store";

interface Props{

}

const CustomButton:React.FC<Props> = props => {

    const onLogoutPress = ():void => {
        store.dispatch({type:'LOGOUT'})
    }
    return(
        <TouchableOpacity style={styles.buttonStyle}
            onPress={():void => onLogoutPress()}
        >
            <Text style={styles.textStyle}>
                {"Logout"}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        //flex:1,
        height: '10%',
        width: '75%',
        backgroundColor: 'black',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: '5%'
    },
    textStyle: {
        zIndex:1,
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
});

export default memo(CustomButton);